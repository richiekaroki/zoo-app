<template>
  <div class="admin-dashboard container py-4">
    <div class="dashboard-header mb-4">
      <h2 class="text-center mb-4">Admin Dashboard</h2>
      <div class="row justify-content-between align-items-center mb-4">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-search"></i>
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Search by name or email"
              v-model="searchQuery"
              @input="filterSubmissions"
            />
          </div>
        </div>
        <div class="col-md-4 text-end">
          <div class="d-flex align-items-center justify-content-end">
            <label class="me-2">Items per page:</label>
            <select
              class="form-select form-select-sm"
              v-model="itemsPerPage"
              @change="fetchSubmissions"
              style="width: 70px"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover" v-if="filteredSubmissions.length > 0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="submission in paginatedSubmissions" :key="submission.id">
            <td>{{ submission.name }}</td>
            <td>{{ submission.email }}</td>
            <td class="text-truncate" style="max-width: 200px">
              {{ submission.message }}
            </td>
            <td>{{ formatDate(submission.submittedAt) }}</td>
            <td>
              <button
                class="btn btn-sm btn-outline-primary me-2"
                @click="viewDetails(submission)"
              >
                <i class="fas fa-eye"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="confirmDelete(submission.id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="alert alert-info">
        No submissions found matching your search criteria.
      </div>
    </div>

    <div class="pagination-controls mt-4">
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: !hasPreviousPage }">
            <button
              class="page-link"
              @click="getPreviousPage"
              :disabled="!hasPreviousPage"
            >
              Previous
            </button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page">
            <button
              class="page-link"
              :class="{ active: currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </li>
          <li class="page-item" :class="{ disabled: !hasNextPage }">
            <button
              class="page-link"
              @click="getNextPage"
              :disabled="!hasNextPage"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- View Modal -->
    <div class="modal fade" id="viewModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Submission Details</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body" v-if="selectedSubmission">
            <p><strong>Name:</strong> {{ selectedSubmission.name }}</p>
            <p><strong>Email:</strong> {{ selectedSubmission.email }}</p>
            <p>
              <strong>Date:</strong>
              {{ formatDate(selectedSubmission.submittedAt) }}
            </p>
            <p><strong>Message:</strong></p>
            <div class="message-content p-3 bg-light rounded">
              {{ selectedSubmission.message }}
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Confirm Deletion</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this submission?</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteSubmission"
              :disabled="deleting"
            >
              <span v-if="deleting">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                ></span>
                Deleting...
              </span>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import {
  collection,
  deleteDoc,
  doc,
  endBefore,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default {
  data() {
    return {
      submissions: [],
      filteredSubmissions: [],
      searchQuery: "",
      lastVisible: null,
      firstVisible: null,
      paginatedSubmissions: [],
      itemsPerPage: 5,
      currentPage: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      selectedSubmission: null,
      submissionToDelete: null,
      deleting: false,
      viewModal: null,
      deleteModal: null,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredSubmissions.length / this.itemsPerPage);
    },
  },
  async created() {
    await this.fetchSubmissions();
  },
  mounted() {
    this.viewModal = new Modal(document.getElementById("viewModal"));
    this.deleteModal = new Modal(document.getElementById("deleteModal"));
  },
  methods: {
    async fetchSubmissions() {
      try {
        const q = query(
          collection(db, "contacts"),
          orderBy("submittedAt", "desc"),
          limit(this.itemsPerPage)
        );
        const querySnapshot = await getDocs(q);

        this.submissions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        this.filteredSubmissions = [...this.submissions];
        this.updatePagination();

        // Store the first and last visible documents for pagination
        this.firstVisible = querySnapshot.docs[0];
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        // Check if there are more documents
        if (querySnapshot.docs.length === this.itemsPerPage) {
          this.hasNextPage = true;
        } else {
          this.hasNextPage = false;
        }

        this.hasPreviousPage = false;
        this.currentPage = 1;
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    },

    async getNextPage() {
      if (!this.hasNextPage) return;

      try {
        const nextQuery = query(
          collection(db, "contacts"),
          orderBy("submittedAt", "desc"),
          startAfter(this.lastVisible),
          limit(this.itemsPerPage)
        );

        const querySnapshot = await getDocs(nextQuery);
        this.submissions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        this.filteredSubmissions = [...this.submissions];
        this.updatePagination();

        this.firstVisible = querySnapshot.docs[0];
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        this.hasPreviousPage = true;
        this.hasNextPage = querySnapshot.docs.length === this.itemsPerPage;
        this.currentPage++;
      } catch (error) {
        console.error("Error fetching next page:", error);
      }
    },

    async getPreviousPage() {
      if (!this.hasPreviousPage) return;

      try {
        const prevQuery = query(
          collection(db, "contacts"),
          orderBy("submittedAt", "desc"),
          endBefore(this.firstVisible),
          limit(this.itemsPerPage)
        );

        const querySnapshot = await getDocs(prevQuery);
        this.submissions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        this.filteredSubmissions = [...this.submissions];
        this.updatePagination();

        this.firstVisible = querySnapshot.docs[0];
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        this.hasNextPage = true;
        this.hasPreviousPage = querySnapshot.docs.length === this.itemsPerPage;
        this.currentPage--;
      } catch (error) {
        console.error("Error fetching previous page:", error);
      }
    },

    goToPage(page) {
      // For simple pagination of filtered results
      this.currentPage = page;
      this.updatePagination();
    },

    updatePagination() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedSubmissions = this.filteredSubmissions.slice(start, end);
    },

    filterSubmissions() {
      if (this.searchQuery.trim() === "") {
        this.filteredSubmissions = [...this.submissions];
      } else {
        this.filteredSubmissions = this.submissions.filter(
          (submission) =>
            submission.name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            submission.email
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        );
      }
      this.currentPage = 1;
      this.updatePagination();
    },

    formatDate(timestamp) {
      if (!timestamp) return "";
      const date = timestamp.toDate();
      return date.toLocaleString();
    },

    viewDetails(submission) {
      this.selectedSubmission = submission;
      this.viewModal.show();
    },

    confirmDelete(id) {
      this.submissionToDelete = id;
      this.deleteModal.show();
    },

    async deleteSubmission() {
      if (!this.submissionToDelete) return;

      this.deleting = true;
      try {
        await deleteDoc(doc(db, "contacts", this.submissionToDelete));
        // Refresh the list after deletion
        await this.fetchSubmissions();
        this.deleteModal.hide();
      } catch (error) {
        console.error("Error deleting submission:", error);
      } finally {
        this.deleting = false;
      }
    },
  },
  watch: {
    itemsPerPage() {
      this.fetchSubmissions();
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.message-content {
  white-space: pre-wrap;
  max-height: 300px;
  overflow-y: auto;
}

.page-item.active .page-link {
  background-color: #37a000;
  border-color: #37a000;
}

.page-link {
  color: #37a000;
}

.page-link:hover {
  color: #2d8600;
}

.btn-outline-primary {
  color: #37a000;
  border-color: #37a000;
}

.btn-outline-primary:hover {
  background-color: #37a000;
  border-color: #37a000;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>

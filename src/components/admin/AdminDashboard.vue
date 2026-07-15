<template>
  <div class="admin-page">
    <div class="page-header">
      <div class="container">
        <span class="section-eyebrow" data-aos="fade-up">Administration</span>
        <h1 class="page-title" data-aos="fade-up" data-aos-delay="100">Dashboard</h1>
      </div>
    </div>

    <div class="container py-5">
      <!-- Controls -->
      <div class="admin-controls" data-aos="fade-up">
        <div class="controls-row">
          <div class="search-bar">
            <i class="fas fa-search search-icon"></i>
            <input
              type="text"
              class="search-input"
              placeholder="Search by name or email..."
              v-model="searchQuery"
              @input="filterSubmissions"
            />
          </div>
          <div class="controls-meta">
            <label class="controls-label">Show</label>
            <select
              class="form-select form-select-sm"
              v-model="itemsPerPage"
              @change="fetchSubmissions"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
            </select>
            <label class="controls-label">per page</label>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="admin-table-wrapper" data-aos="fade-up" data-aos-delay="100">
        <div class="table-responsive" v-if="filteredSubmissions.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="submission in paginatedSubmissions" :key="submission.id">
                <td class="fw-semibold">{{ submission.name }}</td>
                <td>{{ submission.email }}</td>
                <td class="text-truncate message-td">{{ submission.message }}</td>
                <td>{{ formatDate(submission.submittedAt) }}</td>
                <td class="text-end">
                  <button class="btn btn-sm btn-outline-primary me-1" @click="viewDetails(submission)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" @click="confirmDelete(submission.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="empty-state">
          <div class="empty-icon">
            <i class="fas fa-inbox"></i>
          </div>
          <p>No submissions found.</p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination-wrapper" v-if="totalPages > 1">
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: !hasPreviousPage }">
              <button class="page-link" @click="getPreviousPage" :disabled="!hasPreviousPage">
                <i class="fas fa-chevron-left"></i>
              </button>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page">
              <button
                class="page-link"
                :class="{ active: currentPage === page }"
                @click="goToPage(page)"
              >{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: !hasNextPage }">
              <button class="page-link" @click="getNextPage" :disabled="!hasNextPage">
                <i class="fas fa-chevron-right"></i>
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
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" v-if="selectedSubmission">
              <p><strong>Name:</strong> {{ selectedSubmission.name }}</p>
              <p><strong>Email:</strong> {{ selectedSubmission.email }}</p>
              <p><strong>Date:</strong> {{ formatDate(selectedSubmission.submittedAt) }}</p>
              <p class="mb-1"><strong>Message:</strong></p>
              <div class="message-content">{{ selectedSubmission.message }}</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Modal -->
      <div class="modal fade" id="deleteModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirm Deletion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this submission? This action cannot be undone.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteSubmission"
                :disabled="deleting"
              >
                <span v-if="deleting">
                  <span class="spinner-border spinner-border-sm me-1"></span>Deleting...
                </span>
                <span v-else>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import {
  collection, deleteDoc, doc, endBefore, getDocs, limit, orderBy, query, startAfter,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

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
        const q = query(collection(db, "contacts"), orderBy("submittedAt", "desc"), limit(this.itemsPerPage));
        const snapshot = await getDocs(q);
        this.submissions = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        this.filteredSubmissions = [...this.submissions];
        this.updatePagination();
        this.firstVisible = snapshot.docs[0];
        this.lastVisible = snapshot.docs[snapshot.docs.length - 1];
        this.hasNextPage = snapshot.docs.length === this.itemsPerPage;
        this.hasPreviousPage = false;
        this.currentPage = 1;
      } catch (e) {
        console.error("Error fetching submissions:", e);
      }
    },
    async getNextPage() {
      if (!this.hasNextPage) return;
      try {
        const q = query(collection(db, "contacts"), orderBy("submittedAt", "desc"), startAfter(this.lastVisible), limit(this.itemsPerPage));
        const snapshot = await getDocs(q);
        this.submissions = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        this.filteredSubmissions = [...this.submissions];
        this.updatePagination();
        this.firstVisible = snapshot.docs[0];
        this.lastVisible = snapshot.docs[snapshot.docs.length - 1];
        this.hasPreviousPage = true;
        this.hasNextPage = snapshot.docs.length === this.itemsPerPage;
        this.currentPage++;
      } catch (e) {
        console.error("Error fetching next page:", e);
      }
    },
    async getPreviousPage() {
      if (!this.hasPreviousPage) return;
      try {
        const q = query(collection(db, "contacts"), orderBy("submittedAt", "desc"), endBefore(this.firstVisible), limit(this.itemsPerPage));
        const snapshot = await getDocs(q);
        this.submissions = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        this.filteredSubmissions = [...this.submissions];
        this.updatePagination();
        this.firstVisible = snapshot.docs[0];
        this.lastVisible = snapshot.docs[snapshot.docs.length - 1];
        this.hasNextPage = true;
        this.hasPreviousPage = snapshot.docs.length === this.itemsPerPage;
        this.currentPage--;
      } catch (e) {
        console.error("Error fetching previous page:", e);
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.updatePagination();
    },
    updatePagination() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      this.paginatedSubmissions = this.filteredSubmissions.slice(start, start + this.itemsPerPage);
    },
    filterSubmissions() {
      const q = this.searchQuery.toLowerCase();
      this.filteredSubmissions = q
        ? this.submissions.filter((s) => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q))
        : [...this.submissions];
      this.currentPage = 1;
      this.updatePagination();
    },
    formatDate(ts) {
      return ts ? ts.toDate().toLocaleString() : "";
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
        await this.fetchSubmissions();
        this.deleteModal.hide();
      } catch (e) {
        console.error("Error deleting:", e);
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
.admin-page {
  padding-top: var(--nav-height);
}

.admin-controls {
  background: white;
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  margin-bottom: 1.5rem;
}

.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-bar {
  display: flex;
  align-items: center;
  background: var(--color-ivory);
  border: 1.5px solid var(--color-light-border);
  border-radius: var(--radius-md);
  padding: 0.4rem 0.875rem;
  flex: 1;
  max-width: 400px;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.search-bar:focus-within {
  border-color: var(--color-forest-light);
  box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.08);
}

.search-icon {
  color: var(--color-warm-gray);
  font-size: var(--text-sm);
  margin-right: 0.5rem;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-charcoal);
  outline: none;
}

.controls-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.controls-label {
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  margin: 0;
}

.form-select-sm {
  width: auto;
  border-radius: var(--radius-sm);
}

.admin-table-wrapper {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.message-td {
  max-width: 200px;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-warm-gray);
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-sand);
  border-radius: var(--radius-xl);
  font-size: 1.25rem;
}

.message-content {
  background: var(--color-sand);
  padding: 1rem;
  border-radius: var(--radius-md);
  white-space: pre-wrap;
  max-height: 300px;
  overflow-y: auto;
  font-size: var(--text-sm);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .controls-row {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar {
    max-width: none;
  }
}
</style>

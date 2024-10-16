<template>
  <div class="admin-dashboard">
    <h2>Admin Dashboard</h2>
    <input
      type="text"
      class="form-control"
      placeholder="Search by name or email"
      v-model="searchQuery"
      @input="filterSubmissions"
    />

    <ul v-if="filteredSubmissions.length > 0">
      <li v-for="submission in paginatedSubmissions" :key="submission.id">
        <strong>Name:</strong> {{ submission.name }}<br />
        <strong>Email:</strong> {{ submission.email }}<br />
        <strong>Message:</strong> {{ submission.message }}<br />
        <strong>Date:</strong> {{ submission.submittedAt }}
      </li>
    </ul>

    <div class="pagination">
      <button @click="getPreviousPage" :disabled="!hasPreviousPage">
        Previous
      </button>
      <button @click="getNextPage" :disabled="!hasNextPage">Next</button>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
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
      hasNextPage: false,
      hasPreviousPage: false,
    };
  },
  async created() {
    await this.fetchSubmissions();
  },
  methods: {
    async fetchSubmissions() {
      const q = query(
        collection(db, "contacts"),
        orderBy("submittedAt", "desc"),
        limit(this.itemsPerPage)
      );
      const querySnapshot = await getDocs(q);
      this.submissions = querySnapshot.docs.map((doc) => doc.data());
      this.filteredSubmissions = this.submissions;
    },
    filterSubmissions() {
      this.filteredSubmissions = this.submissions.filter(
        (submission) =>
          submission.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          submission.email
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    },
    async getNextPage() {
      // Pagination logic for Next Page
    },
    async getPreviousPage() {
      // Pagination logic for Previous Page
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

ul {
  list-style-type: none;
}
</style>

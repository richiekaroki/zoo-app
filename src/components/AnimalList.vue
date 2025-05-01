<template>
  <div class="container py-4">
    <!-- Search Box -->
    <div class="mb-4">
      <div class="input-group" style="max-width: 400px">
        <input
          type="text"
          class="form-control"
          placeholder="Search animals..."
          v-model="searchQuery"
        />
        <span class="input-group-text">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Animals Grid -->
    <div v-else class="row">
      <div
        v-for="animal in filteredAnimals"
        :key="animal.name"
        class="col-md-4 mb-4"
      >
        <div class="card h-100">
          <img
            :src="animal.imageUrl"
            class="card-img-top"
            :alt="animal.name"
            style="height: 200px; object-fit: cover"
          />
          <div class="card-body">
            <h5 class="card-title">{{ animal.name }}</h5>
            <p class="card-text">{{ animal.habitat }}</p>
            <router-link
              :to="`/animals/${animal.name}`"
              class="btn btn-primary"
            >
              Learn More
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!loading && filteredAnimals.length === 0"
      class="text-center py-5"
    >
      <p class="text-muted">No animals found matching your search.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animals: [],
      loading: true,
      searchQuery: "",
      animalNames: [
        "Lion",
        "Tiger",
        "Elephant",
        "Giraffe",
        "Warthog",
        "Zebra",
        "Monkey",
      ],
    };
  },
  computed: {
    filteredAnimals() {
      const query = this.searchQuery.toLowerCase();
      return this.animals.filter(
        (animal) =>
          animal.name.toLowerCase().includes(query) ||
          animal.habitat.toLowerCase().includes(query)
      );
    },
  },
  async mounted() {
    await this.fetchAnimals();
  },
  methods: {
    async fetchAnimals() {
      try {
        const fetchedAnimals = [];

        for (const name of this.animalNames) {
          const habitat = await this.fetchAnimalHabitat(name);
          const imageUrl = await this.fetchAnimalImage(name);

          fetchedAnimals.push({
            name,
            habitat,
            imageUrl,
          });
        }

        this.animals = fetchedAnimals;
      } catch (error) {
        console.error("Error fetching animals:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchAnimalHabitat(name) {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/animals?name=${name}`,
        {
          headers: { "X-Api-Key": "XUrkiZ8CqgXO0McvqPMpmXWnE6RixqZYWidyofow" },
        }
      );
      const data = await response.json();
      return data[0]?.characteristics?.habitat || "Habitat not available";
    },
    async fetchAnimalImage(name) {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${name}&client_id=Sc4pjbkYKYIW0Kb84jJCNXyakIkkaiQ1c2DaGqTRzAA`
      );
      const data = await response.json();
      return (
        data.results[0]?.urls?.small || "https://via.placeholder.com/300x200"
      );
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

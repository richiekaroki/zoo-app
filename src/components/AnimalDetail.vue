<template>
  <div class="animal-detail container py-5">
    <div v-if="loading" class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <h2 class="text-center mb-4">{{ animal.name }}</h2>
      <img :src="animal.imageUrl" alt="Animal Image" class="img-fluid mb-4" />
      <h4>Habitat</h4>
      <p>{{ animal.habitat }}</p>
      <h4>Other Information</h4>
      <p>{{ animal.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name"], // Get the animal name from the route parameter
  data() {
    return {
      animal: {},
      loading: true,
    };
  },
  mounted() {
    this.fetchAnimalDetail();
  },
  methods: {
    async fetchAnimalDetail() {
      const habitat = await this.fetchAnimalHabitat(this.name);
      const imageUrl = await this.fetchAnimalImage(this.name);
      const description = await this.fetchAnimalDescription(this.name); // Fetch other details if needed

      this.animal = {
        name: this.name,
        habitat,
        imageUrl,
        description,
      };
      this.loading = false;
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
      return data.results[0]?.urls?.small || "https://via.placeholder.com/150";
    },
    async fetchAnimalDescription(name) {
      // Example placeholder for description (could be extended with additional data)
      return `This is a description for ${name}.`;
    },
  },
};
</script>

<style scoped>
.animal-detail {
  text-align: center;
}

.animal-detail img {
  max-width: 400px;
}
</style>

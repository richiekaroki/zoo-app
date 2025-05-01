<template>
  <div class="animal-detail container py-5">
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else class="animal-content">
      <h2 class="text-center mb-4">{{ animal.name }}</h2>
      <img
        :src="animal.imageUrl"
        :alt="`${animal.name} image`"
        class="img-fluid rounded mb-4 animal-image"
        @error="handleImageError"
      />
      <div class="animal-info">
        <h4 class="info-title">Habitat</h4>
        <p class="info-text">{{ animal.habitat }}</p>

        <h4 class="info-title">Description</h4>
        <p class="info-text">{{ animal.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      animal: {
        name: "",
        habitat: "",
        imageUrl: "",
        description: "",
      },
      loading: true,
      defaultImage: "https://via.placeholder.com/600x400?text=Animal+Image",
    };
  },
  async mounted() {
    await this.fetchAnimalDetail();
  },
  methods: {
    async fetchAnimalDetail() {
      try {
        const [habitat, imageUrl, description] = await Promise.all([
          this.fetchAnimalHabitat(this.name),
          this.fetchAnimalImage(this.name),
          this.fetchAnimalDescription(this.name),
        ]);

        this.animal = {
          name: this.name,
          habitat,
          imageUrl,
          description,
        };
      } catch (error) {
        console.error("Error loading animal:", error);
        this.animal.description = "Could not load animal details.";
        this.animal.imageUrl = this.defaultImage;
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
      return data.results[0]?.urls?.regular || this.defaultImage;
    },
    async fetchAnimalDescription(name) {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/animals?name=${name}`,
        {
          headers: { "X-Api-Key": "XUrkiZ8CqgXO0McvqPMpmXWnE6RixqZYWidyofow" },
        }
      );
      const data = await response.json();
      const characteristics = data[0]?.characteristics || {};
      return characteristics.slogan || `Information about ${name}`;
    },
    handleImageError() {
      this.animal.imageUrl = this.defaultImage;
    },
  },
};
</script>

<style scoped>
.animal-detail {
  max-width: 800px;
  margin: 0 auto;
}

.animal-image {
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.info-title {
  color: #2c3e50;
  margin-top: 1.5rem;
}

.info-text {
  color: #495057;
  line-height: 1.6;
}
</style>

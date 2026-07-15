<template>
  <div class="animal-list-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title" data-aos="fade-up" data-aos-delay="100">Our Animals</h1>
        <p class="page-subtitle" data-aos="fade-up" data-aos-delay="200">
          Discover the incredible species that call our planet home.
        </p>
      </div>
    </div>

    <div class="container py-5">
      <!-- Search -->
      <div class="search-wrapper" data-aos="fade-up">
        <div class="search-bar">
          <i class="fas fa-search search-icon"></i>
          <input
            type="text"
            class="search-input"
            placeholder="Search by name or habitat..."
            v-model="searchQuery"
            aria-label="Search animals"
          />
          <button v-if="searchQuery" class="search-clear" @click="searchQuery = ''" type="button" aria-label="Clear search">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Skeleton Loading -->
      <div v-if="loading" class="animal-grid" aria-busy="true" aria-label="Loading animals">
        <div class="loading-fact">
          <i class="fas fa-leaf loading-icon"></i>
          <p>{{ loadingMessage }}</p>
          <small class="fact-text">{{ animalFact }}</small>
        </div>
        <div v-for="n in 6" :key="n" class="skeleton-card">
          <div class="skeleton skeleton-img"></div>
          <div class="skeleton-card-body">
            <div class="skeleton skeleton-text" style="width: 40%"></div>
            <div class="skeleton skeleton-text" style="width: 70%; height: 1.25rem; margin-top: 0.5rem"></div>
            <div class="skeleton skeleton-text" style="width: 50%"></div>
          </div>
        </div>
      </div>

      <!-- Grid -->
      <div v-else class="animal-grid">
        <div
          v-for="animal in filteredAnimals"
          :key="animal.name"
          class="animal-card stagger-item"
        >
          <div class="animal-card-img">
            <img :src="animal.imageUrl" :alt="animal.name" loading="lazy" />
            <span class="conservation-badge" :class="getStatusClass(animal.status)" :aria-label="`Conservation status: ${animal.status}`" :title="getConservationInfo(animal.status)">
              {{ animal.status }}
            </span>
          </div>
          <div class="animal-card-body">
            <h3>{{ animal.name }}</h3>
            <p class="animal-card-habitat">
              <i class="fas fa-map-marker-alt me-1"></i>{{ animal.habitat }}
            </p>
            <router-link :to="`/animals/${animal.name}`" class="animal-card-link">
              Learn more<i class="fas fa-arrow-right ms-2"></i>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error && !loading" class="error-state" data-aos="fade-up">
        <div class="error-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h3>Oops! Something went wrong</h3>
        <p>{{ error }}</p>
        <button class="btn btn-outline-primary" @click="fetchAnimals">
          <i class="fas fa-redo me-2"></i>Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && filteredAnimals.length === 0" class="empty-state" data-aos="fade-up">
        <div class="empty-icon">
          <i class="fas fa-search"></i>
        </div>
        <h3>No animals found</h3>
        <p v-if="searchQuery">No animals match "{{ searchQuery }}". Try a different search term.</p>
        <p v-else>Our animal collection is being updated. Check back soon!</p>
        <div class="empty-actions">
          <button v-if="searchQuery" class="btn btn-outline-primary" @click="searchQuery = ''">
            <i class="fas fa-times me-2"></i>Clear Search
          </button>
          <router-link to="/" class="btn btn-primary">
            <i class="fas fa-home me-2"></i>Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAnimalHabitat, fetchAnimalImage } from "@/services/animalApi";
import { getRandomFact, getRandomLoadingMessage } from "@/utils/animalFacts";

export default {
  data() {
    return {
      animals: [],
      loading: true,
      error: null,
      searchQuery: "",
      animalNames: ["Lion", "Tiger", "Elephant", "Giraffe", "Warthog", "Zebra", "Monkey"],
      conservationStatus: {
        Lion: "Vulnerable",
        Tiger: "Endangered",
        Elephant: "Endangered",
        Giraffe: "Vulnerable",
        Warthog: "Least Concern",
        Zebra: "Near Threatened",
        Monkey: "Least Concern",
      },
      loadingMessage: getRandomLoadingMessage(),
      animalFact: getRandomFact(),
      factInterval: null,
    };
  },
  computed: {
    filteredAnimals() {
      const query = this.searchQuery.toLowerCase();
      return this.animals.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.habitat.toLowerCase().includes(query)
      );
    },
  },
  async mounted() {
    await this.fetchAnimals();
    this.factInterval = setInterval(() => {
      this.animalFact = getRandomFact();
    }, 5000);
  },
  beforeUnmount() {
    if (this.factInterval) clearInterval(this.factInterval);
  },
  methods: {
    async fetchAnimals() {
      try {
        const results = await Promise.all(
          this.animalNames.map(async (name) => {
            const [habitat, imageUrl] = await Promise.all([
              fetchAnimalHabitat(name),
              fetchAnimalImage(name, "small"),
            ]);
            return { name, habitat, imageUrl, status: this.conservationStatus[name] || "Unknown" };
          })
        );
        this.animals = results;
      } catch (error) {
        this.error = "Failed to load animals. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    getStatusClass(status) {
      const classes = {
        "Endangered": "status-endangered",
        "Vulnerable": "status-vulnerable",
        "Near Threatened": "status-near-threatened",
        "Least Concern": "status-least-concern",
      };
      return classes[status] || "";
    },
    getConservationInfo(status) {
      const info = {
        "Endangered": "Very high risk of extinction in the wild. Immediate conservation action needed.",
        "Vulnerable": "High risk of endangerment in the wild. Conservation measures recommended.",
        "Near Threatened": "Likely to become threatened in the near future. Monitoring required.",
        "Least Concern": "Widespread and abundant. Lowest risk of extinction.",
      };
      return info[status] || "Conservation status information unavailable.";
    },
  },
};
</script>

<style scoped>
.animal-list-page {
  padding-top: var(--nav-height);
}

.search-wrapper {
  max-width: 520px;
  margin: 0 auto 3rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border: 1.5px solid var(--color-light-border);
  border-radius: var(--radius-full);
  padding: 0.5rem 1.25rem;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.search-bar:focus-within {
  border-color: var(--color-forest-light);
  box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.08);
}

.search-icon {
  color: var(--color-warm-gray);
  font-size: var(--text-sm);
  margin-right: 0.75rem;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-charcoal);
  outline: none;
}

.search-input::placeholder {
  color: var(--color-warm-gray);
  opacity: 0.6;
}

.search-clear {
  color: var(--color-warm-gray);
  cursor: pointer;
  padding: 0.25rem;
  margin-left: 0.5rem;
  transition: color var(--transition-fast);
}

.search-clear:hover {
  color: var(--color-charcoal);
}

/* Grid */
.animal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Animal Card */
.animal-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: white;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-slow), box-shadow var(--transition-slow);
}

.animal-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
}

.animal-card-img {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.conservation-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-full);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 2;
}

.status-endangered {
  background: var(--badge-endangered-bg);
  color: var(--badge-endangered-text);
  border: 1px solid var(--badge-endangered-border);
}

.status-vulnerable {
  background: var(--badge-vulnerable-bg);
  color: var(--badge-vulnerable-text);
  border: 1px solid var(--badge-vulnerable-border);
}

.status-near-threatened {
  background: var(--badge-near-threatened-bg);
  color: var(--badge-near-threatened-text);
  border: 1px solid var(--badge-near-threatened-border);
}

.status-least-concern {
  background: var(--badge-least-concern-bg);
  color: var(--badge-least-concern-text);
  border: 1px solid var(--badge-least-concern-border);
}

.animal-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.animal-card:hover .animal-card-img img {
  transform: scale(1.05);
}

.animal-card-body {
  padding: 1.25rem 1.5rem 1.5rem;
}

.animal-card-body h3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 400;
  color: var(--color-forest-dark);
  margin-bottom: var(--space-2);
  letter-spacing: -0.01em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.animal-card-habitat {
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  margin-bottom: var(--space-4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.animal-card-link {
  font-weight: 600;
  color: var(--color-gold-dark);
  font-size: var(--text-sm);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.animal-card-link:hover {
  color: var(--color-gold);
  transform: translateX(3px);
}

/* Skeleton Card */
.skeleton-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: white;
  box-shadow: var(--shadow-xs);
}

.loading-fact {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem 1rem 1rem;
  margin-bottom: 1rem;
}

.loading-icon {
  font-size: 1.5rem;
  color: var(--color-forest-light);
  margin-bottom: 0.5rem;
  animation: gentlePulse 1.5s ease-in-out infinite;
}

.loading-fact p {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--color-forest-dark);
  margin-bottom: 0.25rem;
}

.fact-text {
  color: var(--color-warm-gray);
  font-style: italic;
}

.skeleton-img {
  height: 240px;
  border-radius: 0;
}

.skeleton-card-body {
  padding: 1.25rem 1.5rem 1.5rem;
}

/* Empty State */
.empty-state,
.error-state {
  text-align: center;
  padding: 4rem 0;
}

.empty-icon,
.error-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto var(--space-6);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-sand);
  border-radius: var(--radius-xl);
  color: var(--color-warm-gray);
  font-size: 1.5rem;
}

.error-icon {
  background: var(--badge-endangered-bg);
  color: var(--color-error);
}

.empty-state h3,
.error-state h3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-forest-dark);
  margin-bottom: var(--space-2);
}

.empty-state p,
.error-state p {
  color: var(--color-warm-gray);
  margin-bottom: var(--space-6);
}

.empty-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

/* Responsive */
@media (max-width: 992px) {
  .animal-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .animal-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .animal-card-img {
    height: 200px;
  }
}
</style>

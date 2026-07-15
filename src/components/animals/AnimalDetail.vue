<template>
  <div class="animal-detail-page">
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="error-state">
      <div class="container">
        <div class="error-content" data-aos="fade-up">
          <div class="error-icon">
            <i class="fas fa-binoculars"></i>
          </div>
          <h2>This animal is playing hide and seek</h2>
          <p>{{ error }}</p>
          <router-link to="/animals" class="btn btn-outline-primary">
            <i class="fas fa-arrow-left me-2"></i>Back to Animals
          </router-link>
        </div>
      </div>
    </div>

    <template v-else>
      <div class="detail-header">
        <div class="container">
          <router-link to="/animals" class="back-link" data-aos="fade-right">
            <i class="fas fa-arrow-left me-2"></i>Back to Animals
          </router-link>
          <h1 class="detail-title" data-aos="fade-up">{{ animal.name }}</h1>
        </div>
      </div>

      <div class="container py-5">
        <div class="detail-layout">
          <div class="detail-image-col" data-aos="fade-right">
            <div class="detail-image-wrapper">
              <img
                :src="animal.imageUrl"
                :alt="`${animal.name} image`"
                class="detail-image"
                loading="lazy"
                @error="handleImageError"
              />
            </div>
          </div>

          <div class="detail-info-col" data-aos="fade-left">
            <div class="detail-info">
              <div class="info-block">
                <span class="info-label">
                  <i class="fas fa-map-marker-alt me-2"></i>Habitat
                </span>
                <p class="info-value">{{ animal.habitat }}</p>
              </div>

              <div class="info-divider"></div>

              <div class="info-block">
                <span class="info-label">
                  <i class="fas fa-info-circle me-2"></i>Description
                </span>
                <p class="info-value">{{ animal.description }}</p>
              </div>

              <div class="detail-actions">
                <router-link to="/animals" class="btn btn-outline-primary">
                  <i class="fas fa-th-large me-2"></i>View All
                </router-link>
                <router-link to="/contact" class="btn btn-primary">
                  <i class="fas fa-envelope me-2"></i>Get in Touch
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {
  fetchAnimalHabitat,
  fetchAnimalImage,
  fetchAnimalDescription,
} from "@/services/animalApi";

const DEFAULT_IMAGE = null;

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      animal: { name: "", habitat: "", imageUrl: "", description: "" },
      loading: true,
      error: null,
    };
  },
  async mounted() {
    await this.fetchAnimalDetail();
  },
  methods: {
    async fetchAnimalDetail() {
      try {
        const [habitat, imageUrl, description] = await Promise.all([
          fetchAnimalHabitat(this.name),
          fetchAnimalImage(this.name, "regular"),
          fetchAnimalDescription(this.name),
        ]);
        this.animal = { name: this.name, habitat, imageUrl, description };
      } catch (error) {
        this.error = "Failed to load animal details. Please try again.";
        this.animal.imageUrl = DEFAULT_IMAGE;
      } finally {
        this.loading = false;
      }
    },
    handleImageError() {
      this.animal.imageUrl = DEFAULT_IMAGE;
    },
  },
};
</script>

<style scoped>
.animal-detail-page {
  padding-top: var(--nav-height);
}

.detail-header {
  background: var(--color-forest);
  padding: 3.5rem 0 3rem;
  position: relative;
  overflow: hidden;
}

.detail-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 30%, rgba(198, 123, 92, 0.1) 0%, transparent 60%);
  pointer-events: none;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 500;
  margin-bottom: var(--space-4);
  transition: color var(--transition-fast);
  position: relative;
  z-index: 1;
}

.back-link:hover {
  color: var(--color-gold);
}

.detail-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, var(--text-4xl));
  font-weight: 400;
  color: white;
  margin: 0;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

.detail-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.detail-image-wrapper {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.detail-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
  display: block;
}

.detail-info {
  padding: 2rem;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  position: sticky;
  top: calc(var(--nav-height) + 1.5rem);
}

.info-block {
  margin-bottom: var(--space-6);
}

.info-label {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-gold-dark);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-2);
}

.info-value {
  font-size: var(--text-base);
  color: var(--color-charcoal);
  line-height: 1.7;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.info-divider {
  height: 1px;
  background: var(--color-light-border);
  margin-bottom: var(--space-6);
}

.detail-actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-top: var(--space-6);
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding-top: var(--nav-height);
}

.error-state {
  padding-top: var(--nav-height);
}

.error-content {
  text-align: center;
  padding: 4rem 0;
}

.error-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto var(--space-6);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--badge-endangered-bg);
  border-radius: var(--radius-xl);
  color: var(--color-error);
  font-size: 1.5rem;
}

.error-content h2 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-forest-dark);
  margin-bottom: var(--space-2);
}

.error-content p {
  color: var(--color-warm-gray);
  margin-bottom: var(--space-6);
}

@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .detail-image {
    height: 300px;
  }

  .detail-info {
    padding: 1.5rem;
  }
}
</style>

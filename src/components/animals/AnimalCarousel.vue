<template>
  <div class="animal-carousel">
    <!-- Loading state -->
    <div
      v-if="loading"
      class="loading-state"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="skeleton skeleton-carousel"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <p>Failed to load animals. Please try again later.</p>
      <button class="btn btn-sm btn-outline-primary" @click="fetchAnimals">Retry</button>
    </div>

    <!-- Main Carousel -->
    <div v-else>
      <div
        id="animalCarousel"
        class="carousel slide"
        data-bs-ride="carousel"
        @mouseenter="pauseCarousel"
        @mouseleave="resumeCarousel"
      >
        <!-- Indicators -->
        <div class="carousel-indicators">
          <button
            v-for="(animal, index) in animals"
            :key="`indicator-${animal.id}`"
            type="button"
            data-bs-target="#animalCarousel"
            :data-bs-slide-to="index"
            :class="{ active: index === activeIndex }"
            :aria-label="`View ${animal.name} (${animal.conservationStatus})`"
            @click="setActiveIndex(index)"
          >
            <span
              class="conservation-badge"
              :class="getConservationClass(animal)"
            >
              <i :class="getStatusIcon(animal)"></i>
            </span>
          </button>
        </div>

        <!-- Slides -->
        <div class="carousel-inner">
          <div
            v-for="(animal, index) in animals"
            :key="`slide-${animal.id}`"
            class="carousel-item"
            :class="{ active: index === activeIndex }"
          >
            <div class="image-container">
              <img
                :src="animal.imageUrl || defaultImage"
                class="carousel-image"
                :alt="`${animal.name} in the wild`"
                loading="lazy"
                @load="handleImageLoad"
                @error="handleImageError(animal)"
              />
              <div v-if="!imageLoaded" class="image-placeholder">
                <i class="fas fa-paw fa-3x"></i>
              </div>
            </div>

            <!-- Caption -->
            <div class="carousel-caption">
              <div class="caption-content">
                <h3 class="animal-title">{{ animal.name }}</h3>
                <div class="caption-badge-row">
                  <span
                    class="conservation-status"
                    :class="getConservationClass(animal)"
                    :title="getConservationInfo(animal.conservationStatus)"
                  >
                    <i :class="getStatusIcon(animal)" class="me-1"></i>
                    {{ animal.conservationStatus }}
                  </span>
                </div>
                <p class="animal-description">
                  {{ truncateDescription(animal.description) }}
                </p>
                <div class="caption-actions">
                  <router-link
                    :to="'/animals/' + animal.slug"
                    class="btn btn-sm btn-gold"
                    :aria-label="`Learn more about ${animal.name}`"
                  >
                    <i class="fas fa-info-circle me-1"></i>Details
                  </router-link>
                  <button
                    class="btn btn-sm btn-ghost-light"
                    @click="playAnimalSound(animal)"
                    :disabled="!animal.sound"
                    :aria-label="`Play ${animal.name} sound`"
                  >
                    <i class="fas" :class="soundIcon(animal)"></i>Sound
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#animalCarousel"
          data-bs-slide="prev"
          @click="decrementIndex"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous animal</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#animalCarousel"
          data-bs-slide="next"
          @click="incrementIndex"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next animal</span>
        </button>
      </div>

      <!-- Audio Element -->
      <audio ref="animalAudio" preload="none"></audio>
    </div>
  </div>
</template>

<script>
import { Carousel } from "bootstrap";

export default {
  name: "AnimalCarousel",
  data() {
    return {
      animals: [],
      loading: true,
      error: false,
      activeIndex: 0,
      carousel: null,
      imageLoaded: false,
      defaultImage: null,
      placeholderImages: {
        lion: "https://images.unsplash.com/photo-1552410260-0fd9b577afa6?w=800&h=400&fit=crop",
        tiger: "https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=800&h=400&fit=crop",
        elephant: "https://images.unsplash.com/photo-1505148230895-d9a785a555fa?w=800&h=400&fit=crop",
        giraffe: "https://images.unsplash.com/photo-1533415648777-407b626eb0fa?w=800&h=400&fit=crop",
      },
    };
  },
  async created() {
    await this.fetchAnimals();
  },
  mounted() {
    this.initCarousel();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    this.destroyCarousel();
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    async fetchAnimals() {
      try {
        this.loading = true;
        this.error = false;
        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.animals = [
          {
            id: 1, name: "African Lion", slug: "lion",
            description: "The majestic king of the jungle that lives in prides. Lions are the only cats that live in groups called prides.",
            imageUrl: this.placeholderImages.lion, conservationStatus: "Vulnerable",
            sound: "https://cdn.freesound.org/previews/530/530568_6266058-lq.mp3",
          },
          {
            id: 2, name: "Bengal Tiger", slug: "tiger",
            description: "The largest cat species with distinctive stripes. Each tiger's stripe pattern is unique, like human fingerprints.",
            imageUrl: this.placeholderImages.tiger, conservationStatus: "Endangered",
            sound: "https://cdn.freesound.org/previews/431/431825_4486667-lq.mp3",
          },
          {
            id: 3, name: "African Elephant", slug: "elephant",
            description: "Gentle giants with incredible intelligence and memory. They can remember watering holes from decades past.",
            imageUrl: this.placeholderImages.elephant, conservationStatus: "Endangered",
            sound: "https://cdn.freesound.org/previews/425/425404_3389879-lq.mp3",
          },
          {
            id: 4, name: "Masai Giraffe", slug: "giraffe",
            description: "The tallest living terrestrial animal with long necks. Their necks contain the same number of vertebrae as humans (7).",
            imageUrl: this.placeholderImages.giraffe, conservationStatus: "Vulnerable",
            sound: null,
          },
        ];
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    initCarousel() {
      const carouselElement = document.getElementById("animalCarousel");
      if (carouselElement && this.animals.length > 0) {
        this.carousel = new Carousel(carouselElement, {
          interval: 6000, wrap: true, touch: true, pause: "hover",
        });
        carouselElement.addEventListener("slid.bs.carousel", (event) => {
          this.activeIndex = event.to;
          this.imageLoaded = false;
        });
      }
    },

    destroyCarousel() {
      if (this.carousel) {
        this.carousel.dispose();
        this.carousel = null;
      }
    },

    pauseCarousel() { if (this.carousel) this.carousel.pause(); },
    resumeCarousel() { if (this.carousel) this.carousel.cycle(); },

    setActiveIndex(index) {
      if (index >= 0 && index < this.animals.length) {
        this.activeIndex = index;
        if (this.carousel) this.carousel.to(index);
      }
    },

    incrementIndex() { this.setActiveIndex((this.activeIndex + 1) % this.animals.length); },
    decrementIndex() { this.setActiveIndex((this.activeIndex - 1 + this.animals.length) % this.animals.length); },

    playAnimalSound(animal) {
      if (animal.sound) {
        const audio = this.$refs.animalAudio;
        audio.pause();
        audio.src = animal.sound;
        audio.play().catch(() => {});
      }
    },

    soundIcon(animal) { return animal.sound ? "fa-volume-up" : "fa-volume-mute text-muted"; },

    getConservationClass(animal) {
      const status = (animal.conservationStatus || "").toLowerCase();
      if (status.includes("endangered")) return "status-endangered";
      if (status.includes("vulnerable")) return "status-vulnerable";
      if (status.includes("near threatened")) return "status-near-threatened";
      if (status.includes("least concern")) return "status-least-concern";
      return "status-unknown";
    },

    getConservationInfo(status) {
      const info = {
        "Endangered": "Very high risk of extinction in the wild.",
        "Vulnerable": "High risk of endangerment in the wild.",
        "Near Threatened": "Likely to become threatened soon.",
        "Least Concern": "Widespread and abundant.",
      };
      return info[status] || "Conservation status information unavailable.";
    },

    getStatusIcon(animal) {
      const status = animal.conservationStatus?.toLowerCase() || "";
      if (status.includes("endangered")) return "fa-exclamation-triangle";
      if (status.includes("vulnerable")) return "fa-exclamation-circle";
      return "fa-paw";
    },

    handleImageError(animal) { animal.imageUrl = this.defaultImage; },
    handleImageLoad() { this.imageLoaded = true; },

    truncateDescription(desc, maxLength = 150) {
      if (!desc) return "";
      return desc.length > maxLength ? `${desc.substring(0, maxLength)}...` : desc;
    },

    handleResize() {
      this.destroyCarousel();
      this.$nextTick(() => { this.initCarousel(); });
    },
  },
};
</script>

<style scoped>
.animal-carousel {
  margin: 1rem auto;
  max-width: 1200px;
  position: relative;
}

.loading-state {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skeleton-carousel {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-xl);
}

.error-state {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
}

.error-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(192, 57, 43, 0.08);
  border-radius: var(--radius-xl);
  color: var(--color-error);
  font-size: 1.25rem;
}

.image-container {
  position: relative;
  height: 480px;
  background-color: var(--color-sand);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.carousel-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
}

.image-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-warm-gray);
  background-color: var(--color-sand);
}

.carousel-caption {
  background: rgba(15, 43, 31, 0.94);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  right: 8%;
  left: 8%;
  bottom: 1.5rem;
}

.caption-content {
  max-width: 600px;
  margin: 0 auto;
}

.animal-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}

.caption-badge-row {
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.animal-description {
  font-size: var(--text-sm);
  margin-bottom: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.caption-actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.btn-gold {
  background: var(--color-gold);
  color: white;
  border: none;
}

.btn-gold:hover {
  background: var(--color-gold-dark);
  color: white;
}

.btn-ghost-light {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
}

.btn-ghost-light:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.conservation-status {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: inline-flex;
  align-items: center;
}

.carousel-indicators {
  margin-bottom: 1rem;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 6px;
  position: relative;
  border: none;
  background-color: rgba(255, 255, 255, 0.35);
  transition: all 0.3s ease;
}

.carousel-indicators button.active {
  background-color: white;
  transform: scale(1.3);
}

.conservation-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.5rem;
  font-weight: bold;
  color: white;
  border: 2px solid white;
}

.status-endangered { background-color: var(--color-error); color: white; }
.status-vulnerable { background-color: var(--color-gold); color: white; }
.status-near-threatened { background-color: var(--color-olive); color: white; }
.status-least-concern { background-color: var(--color-forest-light); color: white; }
.status-unknown { background-color: var(--color-warm-gray); color: white; }

button:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .image-container,
  .carousel-image {
    height: 300px;
  }

  .animal-title { font-size: 1.35rem; }
  .animal-description { font-size: 0.8rem; }

  .carousel-caption {
    padding: 1rem;
    bottom: 0.75rem;
    left: 4%;
    right: 4%;
  }

  .conservation-status {
    font-size: 0.6rem;
    padding: 0.2rem 0.5rem;
  }
}
</style>

<template>
  <div class="animal-carousel">
    <!-- Loading state with accessibility -->
    <div
      v-if="loading"
      class="loading-spinner"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading wildlife data...</span>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-state alert alert-danger">
      <i class="fas fa-exclamation-triangle me-2"></i>
      Failed to load animals. Please try again later.
      <button class="btn btn-sm btn-outline-danger ms-3" @click="fetchAnimals">
        Retry
      </button>
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
        <!-- Enhanced Indicators with Conservation Status -->
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

        <!-- Slides with Lazy Loading -->
        <div class="carousel-inner rounded-3 shadow-lg">
          <div
            v-for="(animal, index) in animals"
            :key="`slide-${animal.id}`"
            class="carousel-item"
            :class="{ active: index === activeIndex }"
          >
            <div class="image-container">
              <img
                :src="animal.imageUrl || defaultImage"
                class="d-block w-100 carousel-image"
                :alt="`${animal.name} in the wild`"
                loading="lazy"
                @load="handleImageLoad"
                @error="handleImageError(animal)"
              />
              <div v-if="!imageLoaded" class="image-placeholder">
                <i class="fas fa-paw fa-3x"></i>
              </div>
            </div>

            <!-- Caption with Conservation Info -->
            <div class="carousel-caption d-none d-md-block">
              <div class="caption-content">
                <h3 class="animal-title">{{ animal.name }}</h3>
                <div class="d-flex justify-content-center mb-2">
                  <span
                    class="conservation-status"
                    :class="getConservationClass(animal)"
                  >
                    <i :class="getStatusIcon(animal)" class="me-1"></i>
                    {{ animal.conservationStatus }}
                  </span>
                </div>
                <p class="animal-description">
                  {{ truncateDescription(animal.description) }}
                </p>
                <div class="d-flex justify-content-center gap-2">
                  <router-link
                    :to="'/animals/' + animal.slug"
                    class="btn btn-outline-light btn-sm"
                    :aria-label="`Learn more about ${animal.name}`"
                  >
                    <i class="fas fa-info-circle me-1"></i> Details
                  </router-link>
                  <button
                    class="btn btn-outline-light btn-sm"
                    @click="playAnimalSound(animal)"
                    :disabled="!animal.sound"
                    :aria-label="`Play ${animal.name} sound`"
                  >
                    <i class="fas" :class="soundIcon(animal)"></i> Sound
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Accessible Controls -->
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#animalCarousel"
          data-bs-slide="prev"
          @click="decrementIndex"
          @keydown.enter="decrementIndex"
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
          @keydown.enter="incrementIndex"
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
      defaultImage: "https://via.placeholder.com/800x400?text=Wildlife+Photo",
      placeholderImages: {
        lion: "https://images.unsplash.com/photo-1552410260-0fd9b577afa6?w=800&h=400&fit=crop",
        tiger:
          "https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=800&h=400&fit=crop",
        elephant:
          "https://images.unsplash.com/photo-1505148230895-d9a785a555fa?w=800&h=400&fit=crop",
        giraffe:
          "https://images.unsplash.com/photo-1533415648777-407b626eb0fa?w=800&h=400&fit=crop",
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

        // Simulate API call (replace with actual fetch)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.animals = [
          {
            id: 1,
            name: "African Lion",
            slug: "lion",
            description:
              "The majestic king of the jungle that lives in prides. Lions are the only cats that live in groups called prides.",
            imageUrl: this.placeholderImages.lion,
            conservationStatus: "Vulnerable",
            sound:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          },
          {
            id: 2,
            name: "Bengal Tiger",
            slug: "tiger",
            description:
              "The largest cat species with distinctive stripes. Each tiger's stripe pattern is unique, like human fingerprints.",
            imageUrl: this.placeholderImages.tiger,
            conservationStatus: "Endangered",
            sound:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          },
          {
            id: 3,
            name: "African Elephant",
            slug: "elephant",
            description:
              "Gentle giants with incredible intelligence and memory. They can remember watering holes from decades past.",
            imageUrl: this.placeholderImages.elephant,
            conservationStatus: "Endangered",
            sound:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          },
          {
            id: 4,
            name: "Masai Giraffe",
            slug: "giraffe",
            description:
              "The tallest living terrestrial animal with long necks. Their necks contain the same number of vertebrae as humans (7).",
            imageUrl: this.placeholderImages.giraffe,
            conservationStatus: "Vulnerable",
            sound:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          },
        ];
      } catch (error) {
        console.error("Error fetching animals:", error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    initCarousel() {
      const carouselElement = document.getElementById("animalCarousel");
      if (carouselElement && this.animals.length > 0) {
        this.carousel = new Carousel(carouselElement, {
          interval: 6000,
          wrap: true,
          touch: true,
          pause: "hover",
        });

        carouselElement.addEventListener("slid.bs.carousel", (event) => {
          this.activeIndex = event.to;
          this.imageLoaded = false; // Reset for new slide
        });
      }
    },

    destroyCarousel() {
      if (this.carousel) {
        this.carousel.dispose();
        this.carousel = null;
      }
    },

    pauseCarousel() {
      if (this.carousel) {
        this.carousel.pause();
      }
    },

    resumeCarousel() {
      if (this.carousel) {
        this.carousel.cycle();
      }
    },

    setActiveIndex(index) {
      if (index >= 0 && index < this.animals.length) {
        this.activeIndex = index;
        if (this.carousel) {
          this.carousel.to(index);
        }
      }
    },

    incrementIndex() {
      this.setActiveIndex((this.activeIndex + 1) % this.animals.length);
    },

    decrementIndex() {
      this.setActiveIndex(
        (this.activeIndex - 1 + this.animals.length) % this.animals.length
      );
    },

    playAnimalSound(animal) {
      if (animal.sound) {
        const audio = this.$refs.animalAudio;
        audio.pause(); // Stop any currently playing sound
        audio.src = animal.sound;
        audio.play().catch((e) => {
          console.error("Audio playback failed:", e);
          // Consider showing a toast notification to the user
        });
      }
    },

    soundIcon(animal) {
      return animal.sound ? "fa-volume-up" : "fa-volume-mute text-muted";
    },

    getConservationClass(animal) {
      const status = animal.conservationStatus?.toLowerCase() || "";
      if (status.includes("endangered")) return "status-danger";
      if (status.includes("vulnerable")) return "status-warning";
      if (status.includes("near threatened")) return "status-info";
      if (status.includes("least concern")) return "status-success";
      return "status-secondary";
    },

    getStatusIcon(animal) {
      const status = animal.conservationStatus?.toLowerCase() || "";
      if (status.includes("endangered")) return "fa-exclamation-triangle";
      if (status.includes("vulnerable")) return "fa-exclamation-circle";
      return "fa-paw";
    },

    handleImageError(animal) {
      console.warn(`Error loading image for ${animal.name}`);
      animal.imageUrl = this.defaultImage;
    },

    handleImageLoad() {
      this.imageLoaded = true;
    },

    truncateDescription(desc, maxLength = 150) {
      if (!desc) return "";
      return desc.length > maxLength
        ? `${desc.substring(0, maxLength)}...`
        : desc;
    },

    handleResize() {
      // Reinit carousel on resize to maintain responsiveness
      this.destroyCarousel();
      this.$nextTick(() => {
        this.initCarousel();
      });
    },
  },
};
</script>

<style scoped>
.animal-carousel {
  margin: 2rem auto;
  max-width: 1200px;
  position: relative;
}

.loading-spinner {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-state {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.image-container {
  position: relative;
  height: 500px;
  background-color: #f8f9fa;
}

.carousel-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.5s ease;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  background-color: #f8f9fa;
}

.carousel-caption {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 1rem;
  padding: 1.5rem;
  right: 10%;
  left: 10%;
  bottom: 2rem;
  backdrop-filter: blur(5px);
}

.caption-content {
  max-width: 600px;
  margin: 0 auto;
}

.animal-title {
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
}

.animal-description {
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
}

.conservation-status {
  padding: 0.35rem 0.9rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
}

.carousel-indicators {
  margin-bottom: 1rem;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 8px;
  position: relative;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.carousel-indicators button.active {
  background-color: white;
  transform: scale(1.2);
}

.conservation-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: bold;
  color: white;
  border: 2px solid white;
}

.btn-outline-light {
  transition: all 0.3s ease;
}

.btn-outline-light:hover {
  color: #333 !important;
  background-color: rgba(255, 255, 255, 0.9);
}

/* Conservation status colors */
.status-danger {
  background-color: #dc3545;
  color: white;
}

.status-warning {
  background-color: #ffc107;
  color: #212529;
}

.status-info {
  background-color: #0dcaf0;
  color: white;
}

.status-success {
  background-color: #198754;
  color: white;
}

.status-secondary {
  background-color: #6c757d;
  color: white;
}

/* Accessibility focus styles */
button:focus {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .image-container,
  .carousel-image {
    height: 300px;
  }

  .animal-title {
    font-size: 1.5rem;
  }

  .animal-description {
    font-size: 1rem;
  }

  .carousel-caption {
    padding: 1rem;
    bottom: 1rem;
    left: 5%;
    right: 5%;
  }

  .carousel-indicators {
    margin-bottom: 0.5rem;
  }

  .conservation-status {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
  }
}
</style>

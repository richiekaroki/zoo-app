<template>
  <div>
    <HeroSection />
    <WelcomeBanner />
    <section class="featured-section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Meet Our Wildlife</h2>
          <p class="section-subtitle">
            Each species plays a vital role in maintaining the balance of our ecosystems.
          </p>
        </div>

        <!-- Asymmetric grid: large card + 2 stacked -->
        <div class="featured-grid">
          <div class="featured-card featured-card--large">
            <div class="featured-card-img">
              <img :src="featuredAnimals[0].img" :alt="featuredAnimals[0].name" loading="lazy" />
              <div class="featured-card-overlay">
                <router-link :to="`/animals/${featuredAnimals[0].name}`" class="btn btn-sm btn-gold">
                  Learn More
                </router-link>
              </div>
            </div>
            <div class="featured-card-body">
              <span class="featured-card-tag">{{ featuredAnimals[0].tag }}</span>
              <h3>{{ featuredAnimals[0].name }}</h3>
              <p>{{ featuredAnimals[0].desc }}</p>
            </div>
          </div>

          <div class="featured-card-stack">
            <div
              class="featured-card featured-card--small"
              v-for="animal in featuredAnimals.slice(1)"
              :key="animal.name"
            >
              <div class="featured-card-img featured-card-img--small">
                <img :src="animal.img" :alt="animal.name" loading="lazy" />
                <div class="featured-card-overlay">
                  <router-link :to="`/animals/${animal.name}`" class="btn btn-sm btn-gold">
                    Learn More
                  </router-link>
                </div>
              </div>
              <div class="featured-card-body">
                <span class="featured-card-tag">{{ animal.tag }}</span>
                <h3>{{ animal.name }}</h3>
                <p>{{ animal.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5" data-aos="fade-up">
          <router-link to="/animals" class="btn btn-primary btn-lg">
            View All Animals<i class="fas fa-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroSection from "@/components/layout/HeroSection.vue";
import WelcomeBanner from "@/components/layout/WelcomeBanner.vue";

export default {
  name: "HomePage",
  components: {
    HeroSection,
    WelcomeBanner,
  },
  data() {
    return {
      featuredAnimals: [
        {
          name: "African Lion",
          tag: "Vulnerable",
          desc: "The king of the savanna, lions are social cats that live in groups called prides.",
          img: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=600&auto=format&fit=crop&q=80",
        },
        {
          name: "Bengal Tiger",
          tag: "Endangered",
          desc: "The largest big cat, tigers are solitary hunters with stunning striped coats.",
          img: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&auto=format&fit=crop&q=80",
        },
        {
          name: "Asian Elephant",
          tag: "Endangered",
          desc: "Intelligent and gentle giants, elephants are vital to their ecosystems.",
          img: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&auto=format&fit=crop&q=80",
        },
      ],
    };
  },
};
</script>

<style scoped>
.featured-section {
  padding: 7rem 0 8rem;
  background: var(--color-sand);
  position: relative;
}

.featured-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, var(--color-ivory), transparent);
  pointer-events: none;
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
  position: relative;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, var(--text-4xl));
  font-weight: 400;
  color: var(--color-forest-dark);
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--color-warm-gray);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Asymmetric Grid */
.featured-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.featured-card-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Cards */
.featured-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: white;
  transition: transform var(--transition-slow), box-shadow var(--transition-slow);
}

.featured-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-xl);
}

.featured-card--large .featured-card-img {
  height: 420px;
}

.featured-card--small .featured-card-img--small {
  height: 198px;
}

.featured-card-img {
  position: relative;
  overflow: hidden;
}

.featured-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.featured-card:hover .featured-card-img img {
  transform: scale(1.05);
}

.featured-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(15, 43, 31, 0.5) 0%,
    transparent 50%
  );
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 1.25rem;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.featured-card:hover .featured-card-overlay {
  opacity: 1;
}

.featured-card-body {
  padding: 1.5rem;
}

.featured-card--large .featured-card-body {
  padding: 1.75rem;
}

.featured-card-tag {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-gold-dark);
  background: rgba(198, 123, 92, 0.1);
  padding: 0.2rem 0.7rem;
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-3);
}

.featured-card-body h3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 400;
  color: var(--color-forest-dark);
  margin-bottom: var(--space-2);
  letter-spacing: -0.01em;
}

.featured-card--large .featured-card-body h3 {
  font-size: var(--text-2xl);
}

.featured-card-body p {
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  line-height: 1.65;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }

  .featured-card-stack {
    flex-direction: row;
  }

  .featured-card--small {
    flex: 1;
  }

  .featured-card--small .featured-card-img--small {
    height: 140px;
  }
}

@media (max-width: 576px) {
  .featured-card-stack {
    flex-direction: column;
  }
}
</style>

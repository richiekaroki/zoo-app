<template>
  <section class="about-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title" v-scroll-reveal>About Us</h1>
        <p class="page-subtitle" v-scroll-reveal="{ delay: 100 }">Protecting wildlife for future generations</p>
      </div>
    </div>

    <div class="container py-5">
      <div class="about-layout">
        <div class="about-content" v-scroll-reveal="{ direction: 'left' }">
          <h2 class="about-heading">
            Igniting Passion for<br />
            <span class="text-accent">Wildlife Conservation</span>
          </h2>
          <p class="about-text">
            At Wam Zoo, we believe that understanding is the first step toward
            protection. Our mission is to bring the wonder of wildlife to
            everyone, showcasing fascinating animal facts and the urgent need
            for conservation.
          </p>
          <p class="about-text">
            Join us in our journey to protect endangered species and their
            habitats. Together, we can make a difference for the natural
            world.
          </p>
          <router-link to="/contact" class="btn btn-primary mt-3">
            Get in Touch<i class="fas fa-arrow-right ms-2"></i>
          </router-link>
        </div>
        <div class="about-carousel-wrapper" v-scroll-reveal="{ direction: 'right' }">
          <AnimalCarousel />
        </div>
      </div>
    </div>

    <div class="values-section">
      <div class="container">
        <div class="text-center mb-5" v-scroll-reveal>
          <h2 class="section-title">What Drives Us</h2>
        </div>
        <div class="values-grid">
          <div class="value-card" v-for="(val, idx) in values" :key="val.title" v-scroll-reveal="{ delay: idx * 100 }">
            <div class="value-icon">
              <i :class="val.icon"></i>
            </div>
            <h3>{{ val.title }}</h3>
            <p>{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item" v-for="(stat, idx) in stats" :key="stat.label" v-scroll-reveal="{ delay: idx * 100 }">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AnimalCarousel from "@/components/animals/AnimalCarousel.vue";

export default {
  name: "AboutPage",
  components: { AnimalCarousel },
  data() {
    return {
      values: [
        { icon: "fas fa-seedling", title: "Conservation", desc: "Protecting habitats and the species that depend on them for survival." },
        { icon: "fas fa-graduation-cap", title: "Education", desc: "Empowering communities with knowledge about wildlife and ecosystems." },
        { icon: "fas fa-hand-holding-heart", title: "Action", desc: "Turning awareness into tangible results through active programs." },
      ],
      stats: [
        { number: "50+", label: "Species Protected" },
        { number: "10K", label: "Annual Visitors" },
        { number: "25", label: "Conservation Projects" },
        { number: "15", label: "Years of Impact" },
      ],
    };
  },
};
</script>

<style scoped>
.about-page {
  padding-top: var(--nav-height);
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, var(--text-3xl));
  font-weight: 400;
  color: var(--color-forest-dark);
  margin: 0;
  letter-spacing: -0.02em;
}

.about-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-heading {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, var(--text-3xl));
  font-weight: 400;
  color: var(--color-forest-dark);
  line-height: 1.15;
  margin-bottom: var(--space-6);
  letter-spacing: -0.02em;
}

.text-accent {
  color: var(--color-gold);
  font-style: italic;
}

.about-text {
  font-size: var(--text-lg);
  color: var(--color-warm-gray);
  line-height: 1.75;
  margin-bottom: var(--space-4);
}

.about-carousel-wrapper {
  padding: 1rem;
}

/* Values */
.values-section {
  background: var(--color-sand);
  padding: 5rem 0;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.value-card {
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  height: 100%;
  transition: transform var(--transition-slow), box-shadow var(--transition-slow);
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.value-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--space-6);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-sand);
  color: var(--color-forest);
  border-radius: var(--radius-lg);
  font-size: 1.3rem;
  transition: transform var(--transition-spring);
}

.value-card:hover .value-icon {
  transform: scale(1.08) rotate(-3deg);
}

.value-card h3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 400;
  color: var(--color-forest-dark);
  margin-bottom: var(--space-3);
}

.value-card p {
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  line-height: 1.65;
  margin: 0;
}

/* Stats Section */
.stats-section {
  background: var(--color-forest);
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
}

.stats-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 50%, rgba(198, 123, 92, 0.1) 0%, transparent 60%);
  pointer-events: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
}

.stat-item {
  padding: 1rem;
}

.stat-number {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, var(--text-4xl));
  color: var(--color-gold);
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .about-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}
</style>

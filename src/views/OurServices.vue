<template>
  <section class="services-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title" data-aos="fade-up" data-aos-delay="100">Our Services</h1>
        <p class="page-subtitle" data-aos="fade-up" data-aos-delay="200">
          Immersive experiences with Earth's most fascinating creatures.
        </p>
      </div>
    </div>

    <div class="container py-5">
      <div class="services-grid">
        <div
          class="service-card stagger-item"
          v-for="svc in services"
          :key="svc.title"
        >
          <div class="service-icon">
            <i :class="svc.icon"></i>
          </div>
          <h3>{{ svc.title }}</h3>
          <p>{{ svc.desc }}</p>
          <router-link :to="svc.link" class="service-link">
            {{ svc.cta }}<i class="fas fa-arrow-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "OurServices",
  data() {
    return {
      services: [
        {
          icon: "fas fa-paw",
          title: "Animal Directory",
          desc: "Browse our complete wildlife collection with detailed information about each species.",
          cta: "View Animals",
          link: "/animals",
        },
        {
          icon: "fas fa-heart",
          title: "Conservation Programs",
          desc: "Support our efforts to protect endangered species and their natural habitats.",
          cta: "Learn More",
          link: "/about",
        },
        {
          icon: "fas fa-envelope",
          title: "Get in Touch",
          desc: "Have questions or want to collaborate? We'd love to hear from you.",
          cta: "Contact Us",
          link: "/contact",
        },
      ],
    };
  },
};
</script>

<style scoped>
.services-page {
  padding-top: var(--nav-height);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.service-card {
  padding: 2.5rem 2rem;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  height: 100%;
  text-align: center;
  transition: transform var(--transition-slow), box-shadow var(--transition-slow);
  position: relative;
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.service-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto var(--space-6);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-forest);
  color: var(--color-gold-light);
  border-radius: var(--radius-lg);
  font-size: 1.3rem;
  transition: transform var(--transition-spring);
}

.service-card:hover .service-icon {
  transform: scale(1.08) rotate(-3deg);
}

.service-card h3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 400;
  color: var(--color-forest-dark);
  margin-bottom: var(--space-3);
  letter-spacing: -0.01em;
}

.service-card p {
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  line-height: 1.7;
  margin-bottom: var(--space-6);
}

.service-link {
  font-weight: 600;
  color: var(--color-gold-dark);
  text-decoration: none;
  font-size: var(--text-sm);
  letter-spacing: 0.02em;
  transition: all var(--transition-base);
  display: inline-flex;
  align-items: center;
}

.service-link:hover {
  color: var(--color-gold);
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>

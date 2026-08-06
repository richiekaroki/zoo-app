<template>
  <section class="services-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title" v-scroll-reveal>Our Services</h1>
        <p class="page-subtitle" v-scroll-reveal="{ delay: 100 }">
          Immersive experiences with Earth's most fascinating creatures.
        </p>
      </div>
    </div>

    <div class="container py-5">
      <div class="services-grid">
        <div
          class="service-card"
          v-for="(svc, idx) in services"
          :key="svc.title"
          v-scroll-reveal="{ delay: idx * 100 }"
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

      <div class="cta-banner" v-scroll-reveal>
        <div class="cta-content">
          <h2>Ready to Explore?</h2>
          <p>Join us in discovering the wonders of wildlife and supporting conservation efforts worldwide.</p>
          <div class="cta-actions">
            <router-link to="/animals" class="btn btn-gold btn-lg">
              <i class="fas fa-paw me-2"></i>Meet Our Animals
            </router-link>
            <router-link to="/contact" class="btn btn-ghost btn-lg">
              <i class="fas fa-envelope me-2"></i>Get in Touch
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useHead } from "@vueuse/head";

export default {
  name: "ServicesPage",
  setup() {
    useHead({
      title: "Services — Wam Zoo",
      meta: [
        { name: "description", content: "Discover Wam Zoo services including wildlife education programs, conservation tours, and research partnerships." },
        { property: "og:title", content: "Services — Wam Zoo" },
        { property: "og:description", content: "Discover Wam Zoo services including wildlife education programs, conservation tours, and research partnerships." },
        { property: "og:url", content: "https://zoo-app-nu.vercel.app/services" },
        { name: "twitter:title", content: "Services — Wam Zoo" },
        { name: "twitter:description", content: "Discover Wam Zoo services including wildlife education programs, conservation tours, and research partnerships." },
      ],
    });
  },
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
  gap: var(--space-6);
  margin-bottom: var(--space-16);
}

.service-card {
  padding: var(--space-10) var(--space-8);
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

/* CTA Banner */
.cta-banner {
  background: linear-gradient(135deg, var(--color-forest) 0%, var(--color-forest-dark) 100%);
  border-radius: var(--radius-xl);
  padding: 4rem 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 50%, rgba(198, 123, 92, 0.12) 0%, transparent 60%);
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-banner h2 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, var(--text-3xl));
  color: white;
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
}

.cta-banner p {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--text-lg);
  max-width: 480px;
  margin: 0 auto var(--space-8);
  line-height: 1.7;
}

.cta-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .cta-banner {
    padding: 3rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}

/* Dark Mode: CTA Banner */
[data-theme="dark"] .cta-banner {
  background: linear-gradient(135deg, var(--color-forest) 0%, #0d3025 100%);
}

[data-theme="dark"] .cta-banner::before {
  background: radial-gradient(ellipse at 30% 50%, rgba(198, 123, 92, 0.08) 0%, transparent 60%);
}

[data-theme="dark"] .cta-banner h2,
[data-theme="dark"] .cta-banner p {
  color: var(--color-charcoal);
}
</style>

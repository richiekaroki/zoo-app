<template>
  <section class="conservation-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title" v-scroll-reveal>Conservation</h1>
        <p class="page-subtitle" v-scroll-reveal="{ delay: 100 }">Protecting endangered species and their habitats</p>
      </div>
    </div>

    <!-- Mission Statement -->
    <div class="container py-5">
      <div class="conservation-layout">
        <div class="conservation-content" v-scroll-reveal="{ direction: 'left' }">
          <h2 class="conservation-heading">
            Every Species<br />
            <span class="text-accent">Matters</span>
          </h2>
          <p class="conservation-text">
            Wildlife populations have declined by 69% since 1970. At Wam Zoo, we're
            committed to reversing this trend through direct action, research, and
            community engagement.
          </p>
          <p class="conservation-text">
            Our conservation programs span across three continents, working with local
            communities to protect habitats and the species that depend on them.
          </p>
          <router-link to="/contact" class="btn btn-primary mt-3">
            Get Involved<i class="fas fa-arrow-right ms-2"></i>
          </router-link>
        </div>
        <div class="conservation-image-wrapper" v-scroll-reveal="{ direction: 'right' }">
          <img
            src="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&h=400&fit=crop"
            alt="Endangered wildlife in natural habitat"
            class="conservation-hero-image"
            width="600"
            height="400"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <!-- Threatened Species Spotlight -->
    <div class="species-section">
      <div class="container">
        <div class="text-center mb-5" v-scroll-reveal>
          <h2 class="section-title">Species We Protect</h2>
          <p class="section-subtitle">Critical conservation status demands urgent action</p>
        </div>
        <div class="species-grid">
          <div
            class="species-card"
            v-for="(species, idx) in threatenedSpecies"
            :key="species.name"
            v-scroll-reveal="{ delay: idx * 100 }"
          >
            <div class="species-image-wrapper">
              <img
                :src="species.image"
                :alt="`${species.name} in the wild`"
                class="species-image"
                loading="lazy"
                width="400"
                height="280"
              />
              <span
                class="species-status-badge"
                :class="getStatusClass(species.status)"
              >
                {{ species.status }}
              </span>
            </div>
            <div class="species-info">
              <h3 class="species-name">{{ species.name }}</h3>
              <p class="species-fact">{{ species.fact }}</p>
              <div class="species-population">
                <i class="fas fa-users me-2"></i>
                <span>{{ species.population }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Programs -->
    <div class="programs-section">
      <div class="container">
        <div class="text-center mb-5" v-scroll-reveal>
          <h2 class="section-title">Our Programs</h2>
          <p class="section-subtitle">Action-driven initiatives making a real difference</p>
        </div>
        <div class="programs-grid">
          <div
            class="program-card"
            v-for="(program, idx) in programs"
            :key="program.title"
            v-scroll-reveal="{ delay: idx * 100 }"
          >
            <div class="program-icon">
              <i :class="program.icon"></i>
            </div>
            <h3>{{ program.title }}</h3>
            <p>{{ program.desc }}</p>
            <div class="program-stat">
              <span class="program-stat-number">{{ program.stat }}</span>
              <span class="program-stat-label">{{ program.statLabel }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Impact Stats -->
    <div class="impact-section">
      <div class="container">
        <div class="impact-grid">
          <div class="impact-item" v-for="(stat, idx) in impactStats" :key="stat.label" v-scroll-reveal="{ delay: idx * 100 }">
            <div class="impact-number">{{ stat.number }}</div>
            <div class="impact-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="container py-5">
      <div class="cta-banner" v-scroll-reveal>
        <div class="cta-content">
          <h2>Join the Movement</h2>
          <p>Whether you adopt, donate, or spread awareness — every action counts.</p>
          <div class="cta-actions">
            <router-link to="/animals" class="btn btn-gold">
              <i class="fas fa-paw me-2"></i>Meet Our Animals
            </router-link>
            <router-link to="/contact" class="btn btn-outline-light">
              <i class="fas fa-envelope me-2"></i>Contact Us
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
  name: "ConservationPage",
  setup() {
    useHead({
      title: "Conservation Programs — Wam Zoo",
      meta: [
        { name: "description", content: "Explore our conservation programs protecting endangered species across 12 reserves. Join the movement to reverse wildlife decline." },
        { property: "og:title", content: "Conservation Programs — Wam Zoo" },
        { property: "og:description", content: "Explore our conservation programs protecting endangered species across 12 reserves. Join the movement to reverse wildlife decline." },
        { property: "og:url", content: "https://zoo-app-nu.vercel.app/conservation" },
        { name: "twitter:title", content: "Conservation Programs — Wam Zoo" },
        { name: "twitter:description", content: "Explore our conservation programs protecting endangered species across 12 reserves. Join the movement to reverse wildlife decline." },
      ],
    });
  },
  data() {
    return {
      threatenedSpecies: [
        {
          name: "African Elephant",
          status: "Endangered",
          population: "~415,000 remaining",
          fact: "Poached for ivory, elephants face habitat loss as human settlements expand across Africa.",
          image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&h=280&fit=crop",
        },
        {
          name: "Bengal Tiger",
          status: "Endangered",
          population: "~2,500 remaining",
          fact: "Tigers lost 95% of their historical range. Our anti-poaching efforts protect critical corridors.",
          image: "https://images.unsplash.com/photo-1561731216-c3a4d5127e72?w=400&h=280&fit=crop",
        },
        {
          name: "Mountain Gorilla",
          status: "Endangered",
          population: "~1,063 remaining",
          fact: "Deforested habitats threaten gorillas. Community-led conservation is key to their survival.",
          image: "https://images.unsplash.com/photo-1580855077995-88f4e44e2d66?w=400&h=280&fit=crop",
        },
        {
          name: "Sea Turtle",
          status: "Vulnerable",
          population: "Declining globally",
          fact: "Plastic pollution and nesting beach destruction threaten all seven sea turtle species.",
          image: "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=400&h=280&fit=crop",
        },
      ],
      programs: [
        {
          icon: "fas fa-shield-alt",
          title: "Anti-Poaching Patrols",
          desc: "24/7 ranger teams protect wildlife from illegal hunting across 12 reserves.",
          stat: "12",
          statLabel: "Reserves Protected",
        },
        {
          icon: "fas fa-tree",
          title: "Habitat Restoration",
          desc: "Replanting native vegetation to reconnect fragmented wildlife corridors.",
          stat: "50K+",
          statLabel: "Trees Planted",
        },
        {
          icon: "fas fa-graduation-cap",
          title: "Community Education",
          desc: "Teaching sustainable practices to communities living alongside wildlife.",
          stat: "25K",
          statLabel: "Students Reached",
        },
        {
          icon: "fas fa-microscope",
          title: "Research & Monitoring",
          desc: "Tracking populations and health to inform evidence-based conservation.",
          stat: "200+",
          statLabel: "Species Monitored",
        },
      ],
      impactStats: [
        { number: "69%", label: "Wildlife Population Decline Since 1970" },
        { number: "1M", label: "Species Threatened with Extinction" },
        { number: "30%", label: "Land Area Protected by 2030 Goal" },
        { number: "12", label: "Active Conservation Reserves" },
      ],
    };
  },
  methods: {
    getStatusClass(status) {
      const s = (status || "").toLowerCase();
      if (s.includes("endangered")) return "status-endangered";
      if (s.includes("vulnerable")) return "status-vulnerable";
      if (s.includes("near threatened")) return "status-near-threatened";
      return "status-least-concern";
    },
  },
};
</script>

<style scoped>
.conservation-page {
  padding-top: var(--nav-height);
}

/* Mission */
.conservation-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.conservation-heading {
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

.conservation-text {
  font-size: var(--text-lg);
  color: var(--color-warm-gray);
  line-height: 1.75;
  margin-bottom: var(--space-4);
}

.conservation-image-wrapper {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.conservation-hero-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
  display: block;
}

/* Species Section */
.species-section {
  background: var(--color-sand);
  padding: var(--space-20) 0;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, var(--text-3xl));
  font-weight: 400;
  color: var(--color-forest-dark);
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: var(--text-base);
  color: var(--color-warm-gray);
  margin: 0;
}

.species-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.species-card {
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-slow), box-shadow var(--transition-slow);
}

.species-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.species-image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.species-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.species-status-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: white;
}

.status-endangered { background-color: var(--color-error); }
.status-vulnerable { background-color: var(--color-gold-dark); }
.status-near-threatened { background-color: var(--color-olive); }
.status-least-concern { background-color: var(--color-forest-light); }

.species-info {
  padding: 1.25rem;
}

.species-name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 400;
  color: var(--color-forest-dark);
  margin: 0 0 0.5rem;
}

.species-fact {
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  line-height: 1.6;
  margin: 0 0 0.75rem;
}

.species-population {
  font-size: var(--text-sm);
  color: var(--color-forest);
  font-weight: 600;
}

/* Programs */
.programs-section {
  padding: var(--space-20) 0;
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.program-card {
  text-align: center;
  padding: 2rem 1.25rem;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-slow), box-shadow var(--transition-slow);
}

.program-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.program-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto var(--space-5);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(74, 158, 115, 0.08);
  color: var(--color-forest);
  border-radius: var(--radius-lg);
  font-size: 1.1rem;
}

.program-card h3 {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 400;
  color: var(--color-forest-dark);
  margin: 0 0 0.5rem;
}

.program-card p {
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  line-height: 1.6;
  margin: 0 0 1rem;
}

.program-stat {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.4rem;
}

.program-stat-number {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-gold-dark);
}

.program-stat-label {
  font-size: var(--text-xs);
  color: var(--color-warm-gray);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Impact */
.impact-section {
  background: var(--color-forest);
  padding: var(--space-16) 0;
  position: relative;
  overflow: hidden;
}

.impact-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 20% 50%, rgba(198, 123, 92, 0.1) 0%, transparent 60%);
  pointer-events: none;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
}

.impact-item {
  padding: 1rem;
}

.impact-number {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, var(--text-4xl));
  color: var(--color-gold);
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.impact-label {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* CTA */
.cta-banner {
  background: linear-gradient(135deg, var(--color-forest) 0%, #0d3025 100%);
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

.cta-content h2 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, var(--text-3xl));
  font-weight: 400;
  color: white;
  margin: 0 0 0.75rem;
}

.cta-content p {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 2rem;
}

.cta-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 992px) {
  .programs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .conservation-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .species-grid {
    grid-template-columns: 1fr;
  }

  .impact-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .cta-banner {
    padding: 3rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .programs-grid {
    grid-template-columns: 1fr;
  }

  .impact-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

[data-theme="dark"] .species-card,
[data-theme="dark"] .program-card {
  background: var(--color-surface);
}

[data-theme="dark"] .conservation-heading,
[data-theme="dark"] .section-title,
[data-theme="dark"] .species-name,
[data-theme="dark"] .program-card h3 {
  color: var(--color-charcoal);
}

[data-theme="dark"] .conservation-hero-image {
  opacity: 0.9;
}
</style>

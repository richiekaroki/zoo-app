<template>
  <div class="hero">
    <picture class="hero-image">
      <source
        media="(min-width: 1200px)"
        srcset="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&auto=format&fit=crop&q=80"
      />
      <source
        media="(min-width: 768px)"
        srcset="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1024&auto=format&fit=crop&q=80"
      />
      <img
        src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=640&auto=format&fit=crop&q=80"
        alt="Wildlife in their natural habitat"
        width="1600"
        height="900"
        fetchpriority="high"
        class="hero-img"
      />
    </picture>
    <div class="hero-overlay"></div>
    <div class="hero-bottom-fade"></div>

    <div class="container hero-content">
      <p class="hero-eyebrow">Wildlife Conservation</p>
      <h1 class="hero-title">
        Where Every<br />
        <span class="title-accent">Creature</span><br />
        Has a Story
      </h1>
      <p class="hero-subtitle">
        Explore the diversity of wildlife, learn about habitats on the brink,
        and discover what we can do to protect them.
      </p>
      <div class="hero-actions">
        <router-link to="/animals" class="btn btn-gold btn-lg">
          <i class="fas fa-paw me-2"></i>Explore Animals
        </router-link>
        <router-link to="/about" class="btn btn-ghost btn-lg">
          Our Mission<i class="fas fa-arrow-right ms-2"></i>
        </router-link>
      </div>

      <div class="hero-stats" data-count-up ref="statsRow">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <span class="stat-number">{{ animatedValues[stat.key] }}{{ stat.suffix }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <div class="hero-scroll-indicator" aria-hidden="true">
      <span class="scroll-text">Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
  data() {
    return {
      stats: [
        { key: "species", target: 7, suffix: "", label: "Species Featured" },
        { key: "programs", target: 4, suffix: "", label: "Conservation Programs" },
        { key: "dedication", target: 100, suffix: "%", label: "Dedication" },
      ],
      animatedValues: { species: 0, programs: 0, dedication: 0 },
      observer: null,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.startCountUp();
          this.observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (this.$refs.statsRow) {
      this.observer.observe(this.$refs.statsRow);
    }
  },
  beforeUnmount() {
    if (this.observer) this.observer.disconnect();
  },
  methods: {
    startCountUp() {
      const duration = 2000;
      const startTime = performance.now();
      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        this.stats.forEach((stat) => {
          this.animatedValues[stat.key] = Math.round(eased * stat.target);
        });
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    },
  },
};
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  background-color: var(--color-forest-dark);
  overflow: hidden;
}

.hero-image {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-image .hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  animation: heroZoom 20s ease-in-out infinite alternate;
}

@keyframes heroZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.06); }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    155deg,
    rgba(10, 30, 20, 0.82) 0%,
    rgba(15, 43, 31, 0.65) 35%,
    rgba(15, 43, 31, 0.45) 65%,
    rgba(10, 30, 20, 0.55) 100%
  );
  z-index: 1;
}

.hero-bottom-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 160px;
  background: linear-gradient(to top, var(--color-ivory), transparent);
  z-index: 2;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 3;
  padding: 10rem 0 7rem;
  max-width: 720px;
}

.hero-eyebrow {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--color-gold-light);
  margin-bottom: var(--space-5);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.hero-eyebrow::before {
  content: '';
  width: 32px;
  height: 1.5px;
  background: var(--color-gold);
  display: block;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, var(--text-6xl));
  font-weight: 400;
  color: white;
  line-height: 1.05;
  margin-bottom: var(--space-6);
  letter-spacing: -0.025em;
}

.title-accent {
  color: var(--color-gold);
  font-style: italic;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.75;
  margin-bottom: var(--space-10);
  max-width: 460px;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.hero-stats {
  display: flex;
  gap: 2.5rem;
  margin-top: var(--space-10);
  padding-top: var(--space-8);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.hero-stats .stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.hero-stats .stat-number {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, var(--text-3xl));
  color: var(--color-gold);
  letter-spacing: -0.02em;
  line-height: 1;
}

.hero-stats .stat-label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.scroll-text {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.55);
}

.scroll-line {
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, var(--color-gold), transparent);
  animation: scrollPulse 2.4s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    padding: 8rem 0 6rem;
  }

  .hero-title {
    font-size: clamp(2.25rem, 8vw, 3.5rem);
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-actions .btn {
    text-align: center;
  }

  .hero-scroll-indicator {
    display: none;
  }

  .hero-bottom-fade {
    height: 100px;
  }

  .hero-stats {
    gap: 1.5rem;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 6rem 0 4rem;
  }

  .hero-title {
    font-size: clamp(1.85rem, 7vw, 2.75rem);
  }

  .hero-subtitle {
    font-size: var(--text-base);
    margin-bottom: var(--space-8);
  }

  .hero-bottom-fade {
    height: 60px;
  }

  .hero-stats {
    gap: 1.25rem;
    margin-top: var(--space-8);
    padding-top: var(--space-6);
  }

  .hero-stats .stat-number {
    font-size: var(--text-xl);
  }

  .hero-stats .stat-label {
    font-size: 0.65rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-image .hero-img {
    animation: none;
  }
  .scroll-line {
    animation: none;
    opacity: 0.5;
  }
}
</style>

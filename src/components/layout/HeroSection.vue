<template>
  <div class="hero">
    <div class="hero-overlay"></div>
    <div class="hero-gradient"></div>

    <div class="container hero-content">
      <h1 class="hero-title" data-aos="fade-up" data-aos-delay="100">
        Where Every<br />
        <span class="title-accent">Creature</span><br />
        Has a Story
      </h1>
      <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="350">
        Explore the diversity of wildlife, learn about habitats on the brink,
        and discover what we can do to protect them.
      </p>
      <div class="hero-actions" data-aos="fade-up" data-aos-delay="500">
        <router-link to="/animals" class="btn btn-gold btn-lg">
          <i class="fas fa-paw me-2"></i>Explore Animals
        </router-link>
        <router-link to="/about" class="btn btn-ghost btn-lg">
          Our Mission<i class="fas fa-arrow-right ms-2"></i>
        </router-link>
      </div>

    </div>
    <div class="hero-scroll-indicator" aria-hidden="true">
      <div class="scroll-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
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

.hero-overlay {
  position: absolute;
  inset: 0;
  background-image: url("https://images.unsplash.com/photo-1723752233207-86148d03889f?w=1400&auto=format&fit=crop&q=80");
  background-size: cover;
  background-position: center 40%;
  opacity: 1;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    155deg,
    rgba(15, 43, 31, 0.94) 0%,
    rgba(27, 67, 50, 0.82) 30%,
    rgba(15, 43, 31, 0.6) 70%,
    rgba(15, 43, 31, 0.45) 100%
  );
  z-index: 1;
}



.hero-content {
  position: relative;
  z-index: 2;
  padding: 10rem 0 6rem;
  max-width: 700px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1rem;
  background: rgba(198, 123, 92, 0.15);
  border: 1px solid rgba(198, 123, 92, 0.25);
  border-radius: var(--radius-full);
  color: var(--color-gold-light);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: var(--space-8);
  backdrop-filter: blur(8px);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, var(--text-6xl));
  font-weight: 400;
  color: white;
  line-height: 1.05;
  margin-bottom: var(--space-6);
  letter-spacing: -0.03em;
}

.title-accent {
  color: var(--color-gold);
  font-style: italic;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: var(--space-10);
  max-width: 480px;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-16);
}

.hero-actions .btn-gold {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: white;
  font-weight: 600;
}

.hero-actions .btn-gold:hover {
  background: var(--color-gold-dark);
  border-color: var(--color-gold-dark);
  box-shadow: 0 4px 24px rgba(198, 123, 92, 0.4);
  transform: translateY(-2px);
}

.btn-ghost {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 500;
  padding: 0.875rem 1.75rem;
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  font-size: var(--text-base);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.35);
  color: white;
  transform: translateY(-2px);
}



.hero-scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.scroll-line {
  width: 1px;
  height: 56px;
  background: linear-gradient(to bottom, var(--color-gold), transparent);
  animation: scrollPulse 2.8s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.15; transform: scaleY(0.4); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    padding: 8rem 0 4rem;
  }

  .hero-title {
    font-size: clamp(2.25rem, 8vw, 3.5rem);
  }

  .hero-actions {
    flex-direction: column;
    margin-bottom: var(--space-10);
  }

  .hero-actions .btn {
    text-align: center;
  }

  .hero-scroll-indicator {
    display: none;
  }
}


</style>

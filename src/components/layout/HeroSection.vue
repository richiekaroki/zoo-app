<template>
  <div class="hero">
    <div class="hero-image"></div>
    <div class="hero-overlay"></div>
    <div class="hero-bottom-fade"></div>

    <div class="container hero-content">
      <p class="hero-eyebrow" data-aos="fade-up" data-aos-delay="50">Wildlife Conservation</p>
      <h1 class="hero-title" data-aos="fade-up" data-aos-delay="150">
        Where Every<br />
        <span class="title-accent">Creature</span><br />
        Has a Story
      </h1>
      <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="400">
        Explore the diversity of wildlife, learn about habitats on the brink,
        and discover what we can do to protect them.
      </p>
      <div class="hero-actions" data-aos="fade-up" data-aos-delay="550">
        <router-link to="/animals" class="btn btn-gold btn-lg">
          <i class="fas fa-paw me-2"></i>Explore Animals
        </router-link>
        <router-link to="/about" class="btn btn-ghost btn-lg">
          Our Mission<i class="fas fa-arrow-right ms-2"></i>
        </router-link>
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
  background-image: url("https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&auto=format&fit=crop&q=80");
  background-size: cover;
  background-position: center 40%;
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
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.45);
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--color-gold), transparent);
  animation: scrollPulse 2.4s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.2; transform: scaleY(0.5); transform-origin: top; }
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
}

@media (prefers-reduced-motion: reduce) {
  .hero-image {
    animation: none;
  }
  .scroll-line {
    animation: none;
    opacity: 0.5;
  }
}
</style>

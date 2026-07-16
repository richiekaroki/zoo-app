<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="not-found-illustration">
        <div class="paw-prints">
          <i class="fas fa-paw paw-1"></i>
          <i class="fas fa-paw paw-2"></i>
          <i class="fas fa-paw paw-3"></i>
        </div>
        <div class="not-found-number">404</div>
      </div>
      <h1 class="not-found-title">Lost in the Wild</h1>
      <p class="not-found-text">
        The page you're looking for seems to have wandered off into the savanna.
        Let's help you find your way back.
      </p>
      <div class="not-found-actions">
        <router-link to="/" class="btn btn-primary btn-lg">
          <i class="fas fa-home me-2"></i>Return Home
        </router-link>
        <router-link to="/animals" class="btn btn-outline-primary btn-lg">
          <i class="fas fa-paw me-2"></i>Explore Animals
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "NotFound" };
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  padding-top: var(--nav-height);
  background: var(--color-ivory);
}

.not-found-content {
  text-align: center;
  max-width: 520px;
}

.not-found-illustration {
  position: relative;
  margin-bottom: 2rem;
}

.not-found-number {
  font-family: var(--font-display);
  font-size: clamp(6rem, 15vw, 10rem);
  font-weight: 400;
  color: var(--color-forest);
  opacity: 0.1;
  line-height: 1;
  letter-spacing: -0.04em;
  user-select: none;
}

.paw-prints {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.paw-prints i {
  font-size: 1.5rem;
  color: var(--color-gold);
  opacity: 0.5;
}

.paw-1 { transform: rotate(-25deg); animation: float 3s ease-in-out infinite; }
.paw-2 { transform: rotate(10deg); animation: float 3s ease-in-out 0.5s infinite; font-size: 2rem !important; }
.paw-3 { transform: rotate(30deg); animation: float 3s ease-in-out 1s infinite; }

.not-found-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, var(--text-4xl));
  color: var(--color-forest-dark);
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
}

.not-found-text {
  font-size: var(--text-lg);
  color: var(--color-warm-gray);
  line-height: 1.7;
  margin-bottom: var(--space-8);
}

.not-found-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
  50% { transform: translateY(-8px) rotate(var(--rot, 0deg)); }
}

.paw-1 { --rot: -25deg; }
.paw-2 { --rot: 10deg; }
.paw-3 { --rot: 30deg; }

@media (prefers-reduced-motion: reduce) {
  .paw-prints i { animation: none; }
}
</style>

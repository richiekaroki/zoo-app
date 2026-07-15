<template>
  <div v-if="showWelcome" class="welcome-banner" data-aos="fade-up">
    <div class="container">
      <div class="welcome-content">
        <div class="welcome-icon">
          <i class="fas fa-paw"></i>
        </div>
        <div class="welcome-text">
          <h2>Welcome to Wam Zoo</h2>
          <p>Discover wildlife, learn about conservation, and explore our virtual sanctuary.</p>
        </div>
        <div class="welcome-actions">
          <router-link to="/animals" class="btn btn-gold btn-sm">
            <i class="fas fa-compass me-2"></i>Start Exploring
          </router-link>
          <button class="btn btn-ghost btn-sm" @click="dismissWelcome" aria-label="Dismiss welcome message">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeBanner",
  data() {
    return {
      showWelcome: false,
    };
  },
  mounted() {
    const hasSeenWelcome = localStorage.getItem("wamzoo-welcome-seen");
    if (!hasSeenWelcome) {
      this.showWelcome = true;
    }
  },
  methods: {
    dismissWelcome() {
      this.showWelcome = false;
      localStorage.setItem("wamzoo-welcome-seen", "true");
    },
  },
};
</script>

<style scoped>
.welcome-banner {
  background: linear-gradient(135deg, var(--color-forest) 0%, var(--color-forest-dark) 100%);
  padding: 1.5rem 0;
  margin-bottom: 0;
}

.welcome-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.welcome-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-lg);
  color: var(--color-gold-light);
  font-size: 1.5rem;
  flex-shrink: 0;
}

.welcome-text {
  flex: 1;
}

.welcome-text h2 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: white;
  margin-bottom: 0.25rem;
  letter-spacing: -0.01em;
}

.welcome-text p {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--text-sm);
  margin: 0;
}

.welcome-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.welcome-actions .btn-ghost {
  color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem;
}

.welcome-actions .btn-ghost:hover {
  color: white;
}

@media (max-width: 640px) {
  .welcome-content {
    flex-direction: column;
    text-align: center;
  }

  .welcome-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>

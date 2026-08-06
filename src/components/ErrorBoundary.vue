<template>
  <div v-if="error" class="error-boundary" role="alert">
    <div class="error-content">
      <div class="error-icon"><i class="fas fa-exclamation-triangle"></i></div>
      <h2>Something went wrong</h2>
      <p>{{ error.message || 'An unexpected error occurred.' }}</p>
      <button class="btn btn-primary" @click="reset">
        <i class="fas fa-redo me-2"></i>Try Again
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<script>
export default {
  name: "ErrorBoundary",
  data() {
    return { error: null };
  },
  errorCaptured(err) {
    this.error = err;
    return false;
  },
  methods: {
    reset() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
}

.error-content {
  max-width: 420px;
}

.error-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(198, 123, 92, 0.1);
  color: var(--color-gold-dark);
  border-radius: var(--radius-lg);
  font-size: 1.5rem;
}

.error-content h2 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-forest-dark);
  margin-bottom: var(--space-2);
}

.error-content p {
  color: var(--color-warm-gray);
  font-size: var(--text-sm);
  margin-bottom: var(--space-6);
}

.error-content .btn {
  background-color: var(--color-forest);
  border-color: var(--color-forest);
  color: white;
}

.error-content .btn:hover {
  background-color: var(--color-forest-light);
  border-color: var(--color-forest-light);
}
</style>

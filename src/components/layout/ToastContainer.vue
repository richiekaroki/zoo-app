<template>
  <teleport to="body">
    <div class="toast-container" aria-live="polite" aria-atomic="true">
      <transition-group name="toast-slide">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-item"
          :class="[`toast-${toast.type}`, { 'toast-exit': !toast.visible }]"
          role="alert"
        >
          <div class="toast-icon">
            <i :class="iconForType(toast.type)"></i>
          </div>
          <div class="toast-body">
            <strong v-if="toast.title" class="toast-title">{{ toast.title }}</strong>
            <p class="toast-message">{{ toast.message }}</p>
          </div>
          <button class="toast-close" @click="remove(toast.id)" :aria-label="`Dismiss ${toast.type} notification`">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script>
import { useToast } from "@/composables/useToast";

export default {
  name: "ToastContainer",
  setup() {
    const { toasts, remove } = useToast();

    function iconForType(type) {
      const icons = {
        success: "fas fa-check-circle",
        error: "fas fa-exclamation-circle",
        warning: "fas fa-exclamation-triangle",
        info: "fas fa-info-circle",
      };
      return icons[type] || icons.info;
    }

    return { toasts, remove, iconForType };
  },
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: calc(var(--nav-height) + 1rem);
  right: 1rem;
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
  width: calc(100% - 2rem);
  pointer-events: none;
}

.toast-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border-left: 4px solid var(--color-forest);
  pointer-events: auto;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-success { border-left-color: var(--color-forest); }
.toast-error { border-left-color: var(--color-error); }
.toast-warning { border-left-color: var(--color-gold); }
.toast-info { border-left-color: var(--color-forest-light); }

.toast-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  margin-top: 1px;
}

.toast-success .toast-icon { color: var(--color-forest); }
.toast-error .toast-icon { color: var(--color-error); }
.toast-warning .toast-icon { color: var(--color-gold-dark); }
.toast-info .toast-icon { color: var(--color-forest-light); }

.toast-body { flex: 1; min-width: 0; }

.toast-title {
  display: block;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--color-charcoal);
  margin-bottom: 0.15rem;
}

.toast-message {
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  margin: 0;
  line-height: 1.5;
}

.toast-close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: var(--color-warm-gray);
  cursor: pointer;
  padding: 0.25rem;
  font-size: 0.75rem;
  transition: color var(--transition-fast);
  line-height: 1;
}

.toast-close:hover { color: var(--color-charcoal); }

/* Transitions */
.toast-slide-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 1, 1);
}
.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}
.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-exit {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

@media (max-width: 576px) {
  .toast-container {
    right: 0.5rem;
    left: 0.5rem;
    max-width: none;
    width: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toast-item {
    transition: opacity 0.15s ease;
  }
}
</style>

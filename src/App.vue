<template>
  <div id="app">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <NavbarSection />
    <main id="main-content" class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'">
          <ErrorBoundary>
            <component :is="Component" />
          </ErrorBoundary>
        </transition>
      </router-view>
    </main>
    <FooterSection />
    <ToastContainer />

    <!-- Back to Top -->
    <button
      v-show="showBackToTop"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="Back to top"
    >
      <i class="fas fa-arrow-up"></i>
    </button>

    <Analytics />
  </div>
</template>

<script>
import FooterSection from "@/components/layout/FooterSection.vue";
import NavbarSection from "@/components/layout/NavbarSection.vue";
import ToastContainer from "@/components/layout/ToastContainer.vue";
import ErrorBoundary from "@/components/ErrorBoundary.vue";
import { Analytics } from "@vercel/analytics/vue";
import { useDarkMode } from "@/composables/useDarkMode";

export default {
  components: {
    NavbarSection,
    FooterSection,
    ToastContainer,
    ErrorBoundary,
    Analytics,
  },
  setup() {
    useDarkMode();
  },
  data() {
    return {
      showBackToTop: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showBackToTop = window.scrollY > 400;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}

.main-content {
  flex: 1;
}

/* Back to Top */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-forest);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 100;
}

.back-to-top:hover {
  background: var(--color-forest-light);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

[data-theme="dark"] .back-to-top {
  background: var(--color-forest);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}
</style>

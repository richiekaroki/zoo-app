<template>
  <div id="app">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <NavbarSection />
    <main id="main-content" class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterSection />
    <ToastContainer />
    <Analytics />
  </div>
</template>

<script>
import FooterSection from "@/components/layout/FooterSection.vue";
import NavbarSection from "@/components/layout/NavbarSection.vue";
import ToastContainer from "@/components/layout/ToastContainer.vue";
import { Analytics } from "@vercel/analytics/vue";
import { useDarkMode } from "@/composables/useDarkMode";

export default {
  components: {
    NavbarSection,
    FooterSection,
    ToastContainer,
    Analytics,
  },
  setup() {
    useDarkMode();
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
</style>

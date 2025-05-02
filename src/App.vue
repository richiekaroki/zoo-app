<template>
  <div id="app">
    <NavbarSection />
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
    <FooterSection />
  </div>
</template>

<script>
import FooterSection from "@/components/FooterSection.vue";
import NavbarSection from "@/components/NavbarSection.vue";

export default {
  components: {
    NavbarSection,
    FooterSection,
  },
};
</script>

<style>
/* Global Styles */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ensure content takes up remaining space */
router-view {
  flex: 1;
}
</style>
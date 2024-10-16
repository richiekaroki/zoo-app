<template>
  <div id="app">
    <NavbarSection />
    <router-view />
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
/* Add any global styles if necessary */
</style>

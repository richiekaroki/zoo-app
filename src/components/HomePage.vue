<template>
  <div>
    <NavbarSection />
    <HeroSection />
  </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
export default {
  name: "HomePage",
  components: {
    HeroSection,
  },
};
</script>

<style>
/* Custom styles for the home page */
</style>

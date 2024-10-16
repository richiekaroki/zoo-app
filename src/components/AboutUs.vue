<template>
  <div class="about-us-container">
    <div class="about-text">
      <h5>DISCOVER WILDLIFE</h5>
      <h1>Explore animal facts and conservation</h1>
      <p>
        At Animal Kingdom, we ignite your passion for wildlife by showcasing
        fascinating animal facts and descriptions. Our mission is to promote
        wildlife conservation and foster a deeper appreciation for the natural
        world. Join us in our journey to protect endangered species and their
        habitats. Together, we can make a difference!
      </p>
      <a href="/contact" class="btn btn-success btn-lg">Get in touch</a>
    </div>
    <div class="carousel-section">
      <!-- Animal Carousel component -->
      <AnimalCarousel />
    </div>
  </div>
</template>

<script>
import AnimalCarousel from "@/components/AnimalCarousel.vue";

export default {
  components: {
    AnimalCarousel,
  },
};
</script>

<style scoped>
.about-us-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  background-color: #f8f9fa;
}

.about-text {
  flex: 1;
  max-width: 50%;
}

.about-text h5 {
  color: #37a000;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.about-text h1 {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
}

.about-text p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
}

.contact-link {
  text-decoration: none;
  font-weight: bold;
  color: #000;
  border-bottom: 1px solid #000;
}

.carousel-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 50%;
}

.carousel-section img {
  max-width: 100%;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .about-us-container {
    flex-direction: column;
    text-align: center;
  }

  .about-text,
  .carousel-section {
    max-width: 100%;
  }
}
</style>

<template>
  <section class="about-section">
    <div class="about-us-container container py-5">
      <div class="row align-items-center g-5">
        <!-- Text Content -->
        <div class="col-lg-6 about-text">
          <h5 class="section-subtitle">DISCOVER WILDLIFE</h5>
          <h1 class="section-title">Explore animal facts and conservation</h1>
          <p class="section-description">
            At Animal Kingdom, we ignite your passion for wildlife by showcasing
            fascinating animal facts and descriptions. Our mission is to promote
            wildlife conservation and foster a deeper appreciation for the
            natural world. Join us in our journey to protect endangered species
            and their habitats. Together, we can make a difference!
          </p>
          <router-link to="/contact" class="btn btn-success btn-lg px-4 py-3">
            Get in touch <i class="fas fa-arrow-right ms-2"></i>
          </router-link>
        </div>

        <!-- Carousel -->
        <div class="col-lg-6 carousel-section">
          <AnimalCarousel />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AnimalCarousel from "@/components/AnimalCarousel.vue";

export default {
  name: "AboutSection",
  components: {
    AnimalCarousel,
  },
};
</script>

<style scoped>
.about-section {
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: "";
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(
    circle,
    rgba(55, 160, 0, 0.1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  z-index: 0;
}

.about-us-container {
  position: relative;
  z-index: 1;
}

.section-subtitle {
  color: #37a000;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  display: inline-block;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #212529;
}

.section-description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #495057;
}

.btn-success {
  background-color: #37a000;
  border-color: #37a000;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 50px;
}

.btn-success:hover {
  background-color: #2d8600;
  border-color: #2d8600;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(55, 160, 0, 0.3);
}

.carousel-section {
  padding: 20px;
}

@media (max-width: 992px) {
  .about-us-container {
    text-align: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-description {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 40px 0;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .btn-lg {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style>

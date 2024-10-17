<template>
  <div :class="['hero-section', { loaded: imageLoaded }]">
    <div class="overlay"></div>
    <div class="content">
      <h1 class="display-4">Zoo App</h1>
      <p>Showcasing animal facts and promoting wildlife conservation.</p>
      <a href="/services" class="btn btn-success btn-lg">View Services</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
  data() {
    return {
      imageLoaded: false, // Track whether the background image is loaded
    };
  },
  mounted() {
    this.lazyLoadImage(); // Lazy-load the background image after component is mounted
  },
  methods: {
    lazyLoadImage() {
      const img = new Image();
      img.src =
        "https://images.unsplash.com/photo-1723752233207-86148d03889f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D";
      img.onload = () => {
        this.imageLoaded = true;
      };
    },
  },
};
</script>

<style scoped>
.hero-section {
  background-image: none; /* Default to none initially */
  background-image: url("https://images.unsplash.com/photo-1723752233207-86148d03889f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D");
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Parallax effect */
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-image 0.5s ease-in-out; /* Smooth transition when image is loaded */
}

/* Apply the background image only when it’s loaded */
.hero-section[data-vue-scoped-true].loaded {
  background-image: url("https://images.unsplash.com/photo-1723752233207-86148d03889f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D");
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.content {
  z-index: 2;
  color: white;
  padding: 0 20px; /* Responsive padding */
}

h1 {
  font-size: 3rem;
  font-weight: bold;
}

p {
  font-size: 1.2rem;
}

.btn {
  margin-top: 20px;
}
.btn:hover {
  transform: scale(1.1); /* Scale up button on hover */
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3); /* Add a shadow effect */
}
/* Media Queries for responsiveness */
@media (max-width: 1200px) {
  .hero-section.loaded {
    background-image: url("https://images.unsplash.com/photo-1723752233207-86148d03889f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D");
  }
}

@media (max-width: 768px) {
  .hero-section {
    background-attachment: scroll; /* Disable parallax on small screens */
  }
  .hero-section.loaded {
    background-image: url("https://images.unsplash.com/photo-1723752233207-86148d03889f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D");
  }
  h1 {
    font-size: 2rem; /* Smaller font on mobile */
  }
  p {
    font-size: 1rem;
  }
  .btn {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .hero-section.loaded {
    background-image: url("https://images.unsplash.com/photo-1723752233207-86148d03889f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D");
  }
  h1 {
    font-size: 1.8rem;
  }
  p {
    font-size: 0.9rem;
  }
}
</style>

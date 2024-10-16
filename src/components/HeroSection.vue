<template>
  <div class="hero-section text-center text-white">
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
};
</script>

<style scoped>
.hero-section {
  background-image: url("https://images.unsplash.com/photo-1723752233207-86148d03889f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D");
  background-size: cover;
  background-position: center;
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>

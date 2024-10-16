<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
    <div class="container">
      <a class="navbar-brand" href="/">ANIMAL KINGDOM</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/services" class="nav-link">Services</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarSection",
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Softer shadow for modern look */
  padding: 10px 20px;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.8rem; /* Larger font size for branding */
  transition: color 0.3s ease;
}

.navbar-brand:hover {
  color: #28a745; /* Hover effect for the brand */
}

.nav-link {
  margin-right: 25px; /* Increased margin for better spacing */
  font-weight: 500;
  color: #333; /* Darker text color */
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #28a745; /* Smooth hover color change */
}

@media (max-width: 992px) {
  .navbar-nav {
    text-align: center;
    margin-top: 20px;
  }

  .nav-item {
    margin-bottom: 10px; /* Spacing between items in mobile view */
  }
}
</style>

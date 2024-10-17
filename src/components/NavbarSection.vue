<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
    <div class="container">
      <!-- Brand Name -->
      <router-link class="navbar-brand" to="/">ZOO APP</router-link>

      <!-- Custom Hamburger Menu Button for Small Screens, only rendered when mobile -->
      <button
        v-if="!isDesktop"
        class="navbar-toggler custom-toggler"
        type="button"
        @click="toggleMenu"
        :class="{ 'is-active': isMenuOpen }"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <!-- Custom Hamburger Icon Animation -->
        <span class="toggler-icon"></span>
        <span class="toggler-icon"></span>
        <span class="toggler-icon"></span>
      </button>

      <!-- Navbar Links -->
      <div
        class="collapse navbar-collapse"
        :class="{ show: isMenuOpen || isDesktop }"
        id="navbarNav"
      >
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" @click="closeMenu"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" @click="closeMenu"
              >About</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/services" class="nav-link" @click="closeMenu"
              >Services</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link" @click="closeMenu"
              >Contact</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarSection",
  data() {
    return {
      isMenuOpen: false, // Track menu open/close state for mobile
      isDesktop: window.innerWidth >= 992, // Track if desktop or mobile
    };
  },
  mounted() {
    this.checkScreenSize(); // Check the screen size on initial load
    window.addEventListener("resize", this.checkScreenSize); // Add event listener to track screen resizing
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize); // Clean up the event listener when component unmounts
  },
  methods: {
    toggleMenu() {
      if (!this.isDesktop) {
        this.isMenuOpen = !this.isMenuOpen; // Toggle menu state on mobile only
      }
    },
    closeMenu() {
      if (!this.isDesktop) {
        this.isMenuOpen = false; // Close menu when a link is clicked on mobile
      }
    },
    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 992; // Update `isDesktop` when the screen is resized
      if (this.isDesktop) {
        this.isMenuOpen = false; // Close mobile menu when switching to desktop
      }
    },
  },
};
</script>

<style scoped>
/* Navbar Styles */
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

/* Custom Hamburger Icon */
.custom-toggler {
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
  cursor: pointer;
  padding: 0;
}

.toggler-icon {
  width: 100%;
  height: 3px;
  background-color: #333;
  border-radius: 5px;
  transition: all 0.3s ease;
}

/* Transform hamburger to 'X' when active */
.is-active .toggler-icon:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}
.is-active .toggler-icon:nth-child(2) {
  opacity: 0;
}
.is-active .toggler-icon:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Slide down transition for the navbar collapse */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.5s ease-in-out;
}
.slide-down-enter,
.slide-down-leave-to {
  max-height: 0;
  overflow: hidden;
}

.navbar-collapse {
  max-height: 500px; /* Maximum height to enable sliding effect */
  overflow: hidden; /* Prevent content overflow */
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

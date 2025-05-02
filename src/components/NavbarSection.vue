<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold">
        <i class="fas fa-paw me-2"></i>ZOO APP
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link
              to="/services"
              class="nav-link"
              @click="handleNavClick('/services', $event)"
            >
              Services
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/about"
              class="nav-link"
              @click="handleNavClick('/about', $event)"
            >
              About
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/contact"
              class="nav-link"
              @click="handleNavClick('/contact', $event)"
            >
              Contact
            </router-link>
          </li>

          <!-- Admin Link (Conditional) -->
          <li class="nav-item" v-if="isAdmin">
            <router-link
              to="/admin"
              class="nav-link text-danger fw-bold"
              @click="handleNavClick('/admin', $event)"
            >
              Admin
            </router-link>
          </li>

          <!-- Authentication Buttons -->
          <template v-if="!isLoggedIn">
            <li class="nav-item ms-lg-2">
              <router-link
                to="/login"
                class="btn btn-outline-primary"
                @click="handleNavClick('/login', $event)"
              >
                Sign In
              </router-link>
            </li>
            <li class="nav-item ms-lg-2">
              <router-link
                to="/register"
                class="btn btn-primary"
                @click="handleNavClick('/register', $event)"
              >
                Sign Up
              </router-link>
            </li>
          </template>

          <!-- User Dropdown (Logged In) -->
          <li v-else class="nav-item dropdown ms-lg-2">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              @click.prevent="toggleDropdown"
              :aria-expanded="isDropdownOpen ? 'true' : 'false'"
            >
              <img
                v-if="userPhoto"
                :src="userPhoto"
                class="rounded-circle me-2"
                width="32"
                height="32"
                alt="User profile"
              />
              {{ userName || "Profile" }}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              :class="{ show: isDropdownOpen }"
            >
              <li>
                <router-link
                  to="/profile"
                  class="dropdown-item"
                  @click="closeAllMenus"
                >
                  <i class="fas fa-user me-2"></i>Profile
                </router-link>
              </li>
              <li v-if="isAdmin">
                <router-link
                  to="/admin"
                  class="dropdown-item"
                  @click="closeAllMenus"
                >
                  <i class="fas fa-lock me-2"></i>Admin
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  class="dropdown-item text-danger"
                  href="#"
                  @click="handleLogout"
                >
                  <i class="fas fa-sign-out-alt me-2"></i>Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";

export default {
  name: "NavbarSection",
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen: false,
      isLoggedIn: false,
      userName: null,
      userPhoto: null,
      isAdmin: false,
      lastClickTime: 0
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userName = user.displayName || user.email?.split("@")[0];
        this.userPhoto = user.photoURL;
        this.isAdmin = user.email?.endsWith("@admin.com"); // Simple admin check
      }
    });
  },
  methods: {
    handleNavClick(routePath, event) {
      event.preventDefault();
      const now = Date.now();
      if (now - this.lastClickTime < 300) return;
      this.lastClickTime = now;

      if (this.$route.path === routePath) {
        this.$router.go(0);
      } else {
        this.isMenuOpen = false;
        this.$router.push(routePath);
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) this.isDropdownOpen = false;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) this.isMenuOpen = false;
    },
    closeAllMenus() {
      this.isMenuOpen = false;
      this.isDropdownOpen = false;
    },
    async handleLogout() {
      try {
        await signOut(auth);
        this.$router.push("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.navbar-brand {
  font-size: 1.5rem;
  color: #28a745;
}

/* Mobile menu styles */
@media (max-width: 991.98px) {
  .navbar-collapse {
    padding-top: 1rem;
  }
  .nav-item {
    margin-bottom: 0.5rem;
  }
  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

/* Dropdown styles */
.dropdown-menu {
  margin-top: 0.5rem;
}
</style>
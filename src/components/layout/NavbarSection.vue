<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }" role="navigation" aria-label="Main navigation">
    <div class="container navbar-inner">
      <router-link to="/" class="navbar-brand" aria-label="Zoo App home">
        <span class="brand-icon"><i class="fas fa-paw"></i></span>
        <span class="brand-text">Wam<span class="brand-accent"> Zoo</span></span>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
        aria-label="Toggle navigation"
      >
        <span class="toggler-bar" :class="{ open: isMenuOpen }"></span>
      </button>

      <div class="navbar-collapse" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="link in navLinks" :key="link.path">
            <router-link
              :to="link.path"
              class="nav-link"
              :class="{ active: $route.path === link.path }"
              @click="handleNavClick(link.path, $event)"
            >
              {{ link.label }}
            </router-link>
          </li>

          <li class="nav-item" v-if="isAdmin">
            <router-link
              to="/admin"
              class="nav-link nav-admin"
              @click="handleNavClick('/admin', $event)"
            >
              <i class="fas fa-shield-alt me-1"></i>Admin
            </router-link>
          </li>

          <li class="nav-item">
            <button
              class="theme-toggle"
              @click="toggleTheme"
              :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
              :title="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
            >
              <i class="fas" :class="theme === 'dark' ? 'fa-sun' : 'fa-moon'"></i>
            </button>
          </li>

          <template v-if="!isLoggedIn">
            <li class="nav-item nav-cta">
              <router-link
                to="/login"
                class="nav-link"
                @click="handleNavClick('/login', $event)"
              >
                Sign In
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/register"
                class="btn btn-gold-nav"
                @click="handleNavClick('/register', $event)"
              >
                Get Started
              </router-link>
            </li>
          </template>

          <li v-else class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle user-toggle"
              href="#"
              @click.prevent="toggleDropdown"
              :aria-expanded="isDropdownOpen ? 'true' : 'false'"
            >
              <span class="user-avatar" v-if="userPhoto">
                <img :src="userPhoto" :alt="userName || 'User avatar'" />
              </span>
              <span class="user-avatar user-avatar-placeholder" v-else>
                <i class="fas fa-user"></i>
              </span>
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
                  <i class="fas fa-shield-alt me-2"></i>Admin
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  class="dropdown-item text-error"
                  href="#"
                  @click="handleLogout"
                >
                  <i class="fas fa-sign-out-alt me-2"></i>Sign Out
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
import { useDarkMode } from "@/composables/useDarkMode";

export default {
  name: "NavbarSection",
  setup() {
    const { theme, toggleTheme } = useDarkMode();
    return { theme, toggleTheme };
  },
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen: false,
      isLoggedIn: false,
      userName: null,
      userPhoto: null,
      isAdmin: false,
      isScrolled: false,
      lastClickTime: 0,
      navLinks: [
        { path: "/animals", label: "Animals" },
        { path: "/conservation", label: "Conservation" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
      ],
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userName = user.displayName || user.email?.split("@")[0];
        this.userPhoto = user.photoURL;
        this.isAdmin = user.email?.endsWith("@admin.com");
      }
    });
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener("keydown", this.handleEscape);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleEscape);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 20;
    },
    handleClickOutside(event) {
      const navbar = this.$el;
      if (!navbar.contains(event.target)) {
        this.isMenuOpen = false;
        this.isDropdownOpen = false;
      }
    },
    handleEscape(event) {
      if (event.key === "Escape") {
        this.isMenuOpen = false;
        this.isDropdownOpen = false;
      }
    },
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
        this.closeAllMenus();
        this.$router.push("/");
      } catch {
        // Sign-out failed silently; user remains logged in
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  padding: 1rem 0;
  background: transparent;
  transition: all var(--transition-base);
}

.navbar.scrolled {
  background: rgba(245, 240, 225, 0.82);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border-bottom: 1px solid rgba(226, 221, 208, 0.35);
  padding: 0.5rem 0;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  flex-shrink: 0;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--color-forest);
  color: var(--color-gold-light);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: transform var(--transition-spring);
}

.navbar-brand:hover .brand-icon {
  transform: rotate(-8deg) scale(1.08);
}

.brand-text {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.5rem;
  color: white;
  letter-spacing: -0.01em;
  transition: color var(--transition-base);
}

.navbar.scrolled .brand-text {
  color: var(--color-forest-dark);
}

.brand-accent {
  color: var(--color-gold);
}

/* Nav Links */
.navbar-collapse {
  align-items: center;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-family: var(--font-body);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  position: relative;
  font-size: var(--text-sm);
  text-decoration: none;
}

.navbar.scrolled .nav-link {
  color: var(--color-charcoal);
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.navbar.scrolled .nav-link:hover {
  color: var(--color-forest);
  background: rgba(27, 67, 50, 0.05);
}

.nav-link.active {
  color: white;
  font-weight: 600;
}

.navbar.scrolled .nav-link.active {
  color: var(--color-forest);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 2px;
  background: var(--color-gold);
  border-radius: var(--radius-full);
}

.nav-admin {
  color: var(--color-forest) !important;
  font-weight: 600;
}

/* Theme Toggle */
.theme-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.85);
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all var(--transition-base);
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.18);
  color: white;
  transform: rotate(15deg);
}

.navbar.scrolled .theme-toggle {
  background: var(--color-sand);
  border-color: var(--color-light-border);
  color: var(--color-charcoal);
}

.navbar.scrolled .theme-toggle:hover {
  background: var(--color-forest);
  border-color: var(--color-forest);
  color: white;
}

/* CTA */
.nav-cta .nav-link {
  color: rgba(255, 255, 255, 0.7) !important;
}

.navbar.scrolled .nav-cta .nav-link {
  color: var(--color-warm-gray) !important;
}

/* Gold Nav Button */
.btn-gold-nav {
  background: var(--color-gold);
  color: white;
  border: none;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  letter-spacing: 0.01em;
  text-decoration: none;
  transition: all var(--transition-base);
}

.btn-gold-nav:hover {
  background: var(--color-gold-dark);
  color: white;
  box-shadow: 0 4px 20px rgba(198, 123, 92, 0.35);
  transform: translateY(-1px);
}

.btn-gold-nav:active {
  transform: scale(0.97) translateY(0);
}

/* User Toggle */
.user-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 2px solid var(--color-gold);
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-forest);
  color: white;
  font-size: 0.75rem;
}

/* Toggler */
.navbar-toggler {
  border: none;
  padding: 0.5rem;
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: transparent;
  cursor: pointer;
  z-index: 10;
}

.toggler-bar {
  display: block;
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all var(--transition-base);
  position: relative;
}

.navbar.scrolled .toggler-bar {
  background: var(--color-charcoal);
}

.toggler-bar::before,
.toggler-bar::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all var(--transition-base);
}

.navbar.scrolled .toggler-bar::before,
.navbar.scrolled .toggler-bar::after {
  background: var(--color-charcoal);
}

.toggler-bar::before { top: -7px; }
.toggler-bar::after { bottom: -7px; }

.toggler-bar.open {
  background: transparent;
}
.toggler-bar.open::before {
  top: 0;
  transform: rotate(45deg);
}
.toggler-bar.open::after {
  bottom: 0;
  transform: rotate(-45deg);
}

/* Desktop */
@media (min-width: 992px) {
  .navbar-collapse {
    display: flex !important;
    position: static;
    width: auto;
    height: auto;
    background: none;
    padding: 0;
    box-shadow: none;
    flex-direction: row;
    align-items: center;
    overflow: visible;
  }

  .navbar-nav {
    display: flex !important;
    flex-direction: row !important;
    align-items: center;
  }

  .navbar-toggler {
    display: none !important;
  }

  .navbar {
    padding: 1rem 0;
  }
  .navbar.scrolled {
    padding: 0.5rem 0;
  }
}

/* Mobile */
@media (max-width: 992px) {
  .navbar-toggler {
    display: flex;
  }

  .navbar-collapse {
    position: fixed;
    top: 0;
    right: -100%;
    width: min(320px, 85vw);
    height: 100vh;
    height: 100dvh;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    margin: 0;
    padding: 5rem 1.5rem 2rem;
    flex-direction: column;
    align-items: stretch;
    box-shadow: -8px 0 40px rgba(0, 0, 0, 0.08);
    transition: right var(--transition-slow);
    z-index: var(--z-overlay);
    overflow-y: auto;
  }

  .navbar-collapse.show {
    right: 0;
  }

  .navbar-nav {
    flex-direction: column;
    gap: 0.25rem;
  }

  .nav-link {
    padding: 0.75rem 1rem !important;
    font-size: var(--text-base);
    border-radius: var(--radius-md);
  }

  .nav-link.active::after {
    display: none;
  }

  .btn-gold-nav {
    width: 100%;
    text-align: center;
    margin-top: 0.75rem;
    padding: 0.75rem 1.25rem;
  }

  .theme-toggle {
    width: 100%;
    height: auto;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    justify-content: flex-start;
    gap: 0.5rem;
    font-size: var(--text-base);
    background: transparent;
    border: none;
    color: var(--color-charcoal);
  }

  .theme-toggle:hover {
    background: var(--color-sand);
  }

  .nav-cta {
    margin-top: 0.5rem;
  }

  .nav-cta .nav-link {
    width: 100%;
    text-align: center;
    border: 1.5px solid var(--color-forest);
    border-radius: var(--radius-md);
    color: var(--color-forest);
    font-weight: 600;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    border: none;
    background: var(--color-sand);
    margin-top: 0.5rem;
  }
}
</style>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <!-- Brand -->
        <div class="footer-brand">
          <router-link to="/" class="footer-logo">
            <span class="brand-icon"><i class="fas fa-paw"></i></span>
            <span class="brand-text">Wam<span class="brand-accent"> Zoo</span></span>
          </router-link>
          <p class="footer-desc">
            Dedicated to wildlife conservation and bringing the wonder of
            nature to everyone.
          </p>
          <div class="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/animals">Animals</router-link></li>
            <li><router-link to="/conservation">Conservation</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>

        <!-- Visit -->
        <div class="footer-links">
          <h4>Visit Us</h4>
          <ul class="footer-contact">
            <li>
              <i class="fas fa-map-marker-alt"></i>
              123 Zoo Lane, Wildlife City
            </li>
            <li>
              <i class="fas fa-phone"></i>
              (123) 456-7890
            </li>
            <li>
              <i class="fas fa-envelope"></i>
              info@wamzoo.com
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Wam Zoo. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterSection",
};
</script>

<style scoped>
.site-footer {
  background: var(--color-forest-dark);
  color: rgba(255, 255, 255, 0.8);
  padding: 5rem 0 0;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* Brand */
.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  margin-bottom: 1.25rem;
}

.footer-logo .brand-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gold);
  color: var(--color-forest-dark);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
}

.footer-logo .brand-text {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.35rem;
  color: white;
  letter-spacing: -0.01em;
}

.footer-logo .brand-accent {
  color: var(--color-gold);
}

.footer-desc {
  font-size: var(--text-sm);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  max-width: 280px;
}

.social-links {
  display: flex;
  gap: 0.625rem;
}

.social-links a {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: all var(--transition-base);
  font-size: 0.85rem;
}

.social-links a:hover {
  background: var(--color-gold);
  color: var(--color-forest-dark);
  transform: translateY(-2px);
}

/* Links */
.footer-links h4 {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 0.625rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-gold-light);
}

.footer-contact li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-contact i {
  color: var(--color-gold);
  font-size: 0.8rem;
  width: 16px;
  text-align: center;
}

/* Bottom */
.footer-bottom {
  padding: 1.5rem 0;
  text-align: center;
}

.footer-bottom p {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  letter-spacing: 0.02em;
}

/* Responsive */
@media (max-width: 992px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 576px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .social-links {
    justify-content: flex-start;
  }
}
</style>

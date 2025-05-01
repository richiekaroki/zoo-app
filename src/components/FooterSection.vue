<template>
  <footer class="footer-dark bg-dark text-white pt-5">
    <div class="container">
      <div class="row g-4">
        <!-- Connect With Us -->
        <div class="col-lg-3 col-md-6">
          <h5 class="footer-heading text-success mb-4">
            <i class="fas fa-share-alt me-2"></i>CONNECT WITH US
          </h5>
          <div class="social-icons mb-4 d-flex">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon me-3"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon me-3"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon me-3"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
            >
              <i class="fab fa-youtube"></i>
            </a>
          </div>
          <a
            href="https://tripadvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-success btn-sm"
          >
            <i class="fab fa-tripadvisor me-1"></i> Leave a Review
          </a>
        </div>

        <!-- Explore -->
        <div class="col-lg-3 col-md-6">
          <h5 class="footer-heading text-success mb-4">
            <i class="fas fa-compass me-2"></i>EXPLORE
          </h5>
          <ul class="list-unstyled">
            <li class="mb-3">
              <router-link
                to="/"
                class="text-white text-decoration-none hover-green"
              >
                <i class="fas fa-home me-2"></i>Home
              </router-link>
            </li>
            <li class="mb-3">
              <router-link
                to="/animals"
                class="text-white text-decoration-none hover-green"
              >
                <i class="fas fa-paw me-2"></i>Animals
              </router-link>
            </li>
            <li class="mb-3">
              <router-link
                to="/services"
                class="text-white text-decoration-none hover-green"
              >
                <i class="fas fa-concierge-bell me-2"></i>Services
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="text-white text-decoration-none hover-green"
              >
                <i class="fas fa-envelope me-2"></i>Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Visit Us -->
        <div class="col-lg-3 col-md-6">
          <h5 class="footer-heading text-success mb-4">
            <i class="fas fa-map-marker-alt me-2"></i>VISIT US
          </h5>
          <ul class="list-unstyled">
            <li class="mb-3">
              <i class="fas fa-map-marker-alt me-2 text-success"></i>
              123 Zoo Lane, Wildlife City
            </li>
            <li class="mb-3">
              <i class="fas fa-phone me-2 text-success"></i>
              (123) 456-7890
            </li>
            <li>
              <i class="fas fa-envelope me-2 text-success"></i>
              info@animalkingdom.com
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="col-lg-3 col-md-6">
          <h5 class="footer-heading text-success mb-4">
            <i class="fas fa-newspaper me-2"></i>NEWSLETTER
          </h5>
          <div class="input-group mb-3">
            <input
              type="email"
              class="form-control bg-dark text-white border-secondary"
              placeholder="Your email"
            />
            <button class="btn btn-success" type="button">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <small class="text-white-50">Get wildlife updates</small>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-top border-secondary mt-5 pt-4 pb-3 text-center">
        <p class="mb-0">&copy; 2024 Animal Kingdom. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.footer-dark {
  background-color: #1a1e21;
}

/* Social Icons - Guaranteed Visible */
.social-icons {
  margin-bottom: 1.5rem;
}

.social-icon {
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
}

.social-icon:hover {
  color: #28a745;
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

/* Force Font Awesome to show */
.fab,
.fas {
  font-family: "Font Awesome 6 Brands", "Font Awesome 6 Free";
  display: inline-block;
}

/* Links styling */
.hover-green:hover {
  color: #28a745 !important;
  padding-left: 5px;
  text-decoration: none;
}

/* Form styling */
.form-control {
  background-color: #2c3034;
  border-color: #495057;
  color: white;
}

.form-control:focus {
  background-color: #2c3034;
  border-color: #28a745;
  box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
  color: white;
}

/* Button styling */
.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

/* Responsive adjustments */
@media (max-width: 767.98px) {
  .social-icons {
    justify-content: center;
  }

  .footer-heading {
    margin-bottom: 1rem;
  }
}
</style>

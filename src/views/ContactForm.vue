<template>
  <div class="contact-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title" data-aos="fade-up" data-aos-delay="100">Contact Us</h1>
      </div>
    </div>

    <div class="container py-5">
      <div class="contact-layout">
        <!-- Form -->
        <div class="contact-form-col" data-aos="fade-right">
          <div class="contact-form-card">
            <div v-if="submitSuccess" class="alert alert-success" role="status" aria-live="polite">
              <i class="fas fa-check-circle me-2"></i>Message sent successfully!
            </div>
            <div v-if="submitError" class="alert alert-danger" role="alert" aria-live="assertive">
              <i class="fas fa-exclamation-circle me-2"></i>{{ submitError }}
            </div>

            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name" class="form-label">Your Name</label>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  v-model="formData.name"
                  @blur="validateName"
                  placeholder="e.g. Jane Doe"
                  required
                />
                <small v-if="errors.name" class="form-error">{{ errors.name }}</small>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="formData.email"
                  @blur="validateEmail"
                  placeholder="e.g. jane@example.com"
                  required
                />
                <small v-if="errors.email" class="form-error">{{ errors.email }}</small>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">Message</label>
                <textarea
                  id="message"
                  class="form-control"
                  v-model="formData.message"
                  :maxlength="500"
                  @blur="validateMessage"
                  rows="5"
                  placeholder="Tell us how we can help..."
                  required
                ></textarea>
                <div class="d-flex justify-content-between">
                  <small v-if="errors.message" class="form-error">{{ errors.message }}</small>
                  <small class="char-count">{{ formData.message.length }}/500</small>
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-lg w-100"
                :disabled="!isValid || loading"
                :aria-busy="loading"
              >
                <span v-if="loading">
                  <span class="spinner-border spinner-border-sm me-2"></span>Sending...
                </span>
                <span v-else><i class="fas fa-paper-plane me-2"></i>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Info -->
        <div class="contact-info-col" data-aos="fade-left">
          <div class="contact-info-card">
            <h3>Get in Touch</h3>
            <p class="contact-info-desc">
              Whether you have a question, want to collaborate, or just want to
              say hello, we're here for you.
            </p>

            <div class="info-items">
              <div class="info-item">
                <div class="info-icon"><i class="fas fa-map-marker-alt"></i></div>
                <div>
                  <strong>Address</strong>
                  <p>123 Zoo Lane, Wildlife City</p>
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon"><i class="fas fa-phone"></i></div>
                <div>
                  <strong>Phone</strong>
                  <p>(123) 456-7890</p>
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon"><i class="fas fa-envelope"></i></div>
                <div>
                  <strong>Email</strong>
                  <p>info@wamzoo.com</p>
                </div>
              </div>
            </div>

            <div class="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345092846!2d144.95373631531586!3d-37.81627944202121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577b16d4f8dff84!2sMelbourne%20City%2C%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1615378382866!5m2!1sen!2sau"
                width="100%"
                height="250"
                style="border: 0; border-radius: var(--radius-lg)"
                allowfullscreen=""
                loading="lazy"
                title="Location map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export default {
  data() {
    return {
      formData: { name: "", email: "", message: "" },
      errors: { name: "", email: "", message: "" },
      isValid: false,
      loading: false,
      submitSuccess: false,
      submitError: null,
    };
  },
  watch: {
    formData: { deep: true, handler() { this.validateForm(); } },
  },
  methods: {
    validateName() {
      const n = this.formData.name.trim();
      this.errors.name = n.length === 0 ? "Name is required." : n.length < 3 ? "Name must be at least 3 characters." : "";
    },
    validateEmail() {
      const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      this.errors.email = !this.formData.email.trim() ? "Email is required." : !re.test(this.formData.email) ? "Please enter a valid email." : "";
    },
    validateMessage() {
      const m = this.formData.message;
      this.errors.message = !m.trim() ? "Message is required." : m.length < 10 ? "Message must be at least 10 characters." : "";
    },
    validateForm() {
      this.validateName();
      this.validateEmail();
      this.validateMessage();
      this.isValid = !this.errors.name && !this.errors.email && !this.errors.message;
    },
    async submitForm() {
      this.loading = true;
      this.submitSuccess = false;
      this.submitError = null;
      try {
        await addDoc(collection(db, "contacts"), {
          ...this.formData,
          submittedAt: serverTimestamp(),
        });
        this.submitSuccess = true;
        this.resetForm();
        setTimeout(() => { this.submitSuccess = false; }, 5000);
      } catch {
        this.submitError = "Something went wrong. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.formData = { name: "", email: "", message: "" };
      this.errors = { name: "", email: "", message: "" };
    },
  },
};
</script>

<style scoped>
.contact-page {
  padding-top: var(--nav-height);
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-form-card {
  background: white;
  padding: 2.5rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-error {
  color: var(--color-error);
  font-size: var(--text-xs);
  display: block;
  margin-top: var(--space-1);
}

.char-count {
  font-size: var(--text-xs);
  color: var(--color-warm-gray);
  margin-left: auto;
}

.contact-info-card {
  padding: 2.5rem;
  background: var(--color-sand);
  border-radius: var(--radius-xl);
  height: 100%;
}

.contact-info-card h3 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-forest-dark);
  margin-bottom: var(--space-3);
}

.contact-info-desc {
  color: var(--color-warm-gray);
  margin-bottom: var(--space-8);
  line-height: 1.7;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.info-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-forest);
  color: var(--color-gold-light);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  flex-shrink: 0;
  transition: transform var(--transition-spring);
}

.info-item:hover .info-icon {
  transform: scale(1.08) rotate(-3deg);
}

.info-item strong {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-forest-dark);
  margin-bottom: var(--space-1);
}

.info-item p {
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  margin: 0;
}

.map-wrapper {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.contact-form-card .btn-primary {
  background-color: var(--color-forest);
  border-color: var(--color-forest);
  color: white;
}

.contact-form-card .btn-primary:hover {
  background-color: var(--color-forest-light);
  border-color: var(--color-forest-light);
  box-shadow: 0 4px 24px rgba(27, 67, 50, 0.35);
  transform: translateY(-2px);
}

.contact-form-card .btn-primary:disabled {
  opacity: 0.5;
  transform: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>

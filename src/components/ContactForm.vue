<template>
  <div class="contact-page container py-5">
    <div class="row">
      <!-- Left Column: Contact Form -->
      <div class="col-md-6">
        <div class="contact-form">
          <h2>Contact Us</h2>
          <form @submit.prevent="submitForm">
            <!-- Name Field -->
            <div class="mb-3">
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                class="form-control"
                v-model="formData.name"
                @blur="validateName"
                required
              />
              <small v-if="errors.name" class="text-danger">{{
                errors.name
              }}</small>
            </div>

            <!-- Email Field -->
            <div class="mb-3">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                v-model="formData.email"
                @blur="validateEmail"
                required
              />
              <small v-if="errors.email" class="text-danger">{{
                errors.email
              }}</small>
            </div>

            <!-- Message Field -->
            <div class="mb-3">
              <label for="message">Message</label>
              <textarea
                id="message"
                class="form-control"
                v-model="formData.message"
                required
                :maxlength="500"
                @blur="validateMessage"
              ></textarea>
              <small v-if="errors.message" class="text-danger">{{
                errors.message
              }}</small>
              <p v-if="formData.message.length > 500" class="text-danger">
                Message is too long (max 500 characters).
              </p>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary" :disabled="!isValid">
              Submit
            </button>
          </form>

          <!-- Toast Notifications -->
          <toast v-if="toast.show" :type="toast.type">{{
            toast.message
          }}</toast>
        </div>
      </div>

      <!-- Right Column: Contact Information and Map -->
      <div class="col-md-6">
        <div class="contact-info">
          <h3>Contact Information</h3>
          <p>
            <strong>Address:</strong> 123 Animal Street, Safari City, SC 12345
          </p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Email:</strong> info@wildlifehabitat.com</p>

          <div class="map-responsive">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345092846!2d144.95373631531586!3d-37.81627944202121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577b16d4f8dff84!2sMelbourne%20City%2C%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1615378382866!5m2!1sen!2sau"
              width="100%"
              height="300"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default {
  data() {
    return {
      formData: { name: "", email: "", message: "" },
      errors: { name: "", email: "", message: "" },
      isValid: false, // This will control whether the form can be submitted
      loading: false,
      toast: { show: false, type: "", message: "" },
    };
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        this.validateForm();
      },
    },
  },
  methods: {
    validateName() {
      const name = this.formData.name.trim();
      if (name.length === 0) {
        this.errors.name = "Name is required.";
      } else if (name.length < 3) {
        this.errors.name = "Name must be at least 3 characters.";
      } else {
        this.errors.name = "";
      }
    },
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!this.formData.email.trim()) {
        this.errors.email = "Email is required.";
      } else if (!emailPattern.test(this.formData.email)) {
        this.errors.email = "Please enter a valid email address.";
      } else {
        this.errors.email = "";
      }
    },
    validateMessage() {
      if (!this.formData.message.trim()) {
        this.errors.message = "Message is required.";
      } else if (this.formData.message.length < 10) {
        this.errors.message = "Message must be at least 10 characters.";
      } else {
        this.errors.message = "";
      }
    },
    validateForm() {
      this.validateName();
      this.validateEmail();
      this.validateMessage();
      this.isValid =
        !this.errors.name && !this.errors.email && !this.errors.message;
    },
    async submitForm() {
      this.loading = true;
      try {
        await addDoc(collection(db, "contacts"), {
          ...this.formData,
          submittedAt: serverTimestamp(),
        });
        this.showToast("success", "Form submitted successfully!");
        this.resetForm();
      } catch (error) {
        this.showToast("error", "An error occurred. Please try again.");
      } finally {
        this.loading = false;
      }
    },
    showToast(type, message) {
      this.toast = { show: true, type, message };
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
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
  max-width: 1200px;
  margin: auto;
}

.contact-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.contact-info {
  padding: 20px;
}

.map-responsive {
  position: relative;
  overflow: hidden;
  padding-bottom: 56.25%;
  height: 0;
}
.map-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>

<template>
  <div class="auth-page">
    <div class="auth-card" data-aos="fade-up">
      <div class="auth-header">
        <router-link to="/" class="auth-brand" aria-label="Back to home">
          <span class="brand-icon"><i class="fas fa-paw"></i></span>
        </router-link>
        <h1>Create Account</h1>
        <p>Join our community of wildlife enthusiasts</p>
      </div>

      <form @submit.prevent="registerUser" aria-label="Create account form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control"
            placeholder="you@example.com"
            required
            autocomplete="email"
            :aria-describedby="error ? 'registerError' : undefined"
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="At least 6 characters"
            required
            minlength="6"
            autocomplete="new-password"
            aria-describedby="passwordHelp"
          />
          <small id="passwordHelp" class="form-text text-muted">Minimum 6 characters</small>
        </div>

        <div v-if="error" class="alert alert-danger" role="alert" aria-live="assertive" id="registerError">
          <i class="fas fa-exclamation-circle me-2"></i>{{ error }}
        </div>

        <button type="submit" class="btn btn-primary btn-lg w-100" :disabled="loading || !isFormValid" :aria-busy="loading">
          <span v-if="loading">
            <span class="spinner-border spinner-border-sm me-2"></span>Creating account...
          </span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <p class="auth-footer">
        Already have an account?
        <router-link to="/login">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export default {
  data() {
    return { email: "", password: "", loading: false, error: null };
  },
  computed: {
    isFormValid() {
      return this.email.trim() && this.password.length >= 6;
    },
  },
  methods: {
    async registerUser() {
      if (!this.isFormValid) return;
      this.loading = true;
      this.error = null;
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/");
      } catch (e) {
        if (e.code === "auth/email-already-in-use") {
          this.error = "An account with this email already exists.";
        } else if (e.code === "auth/invalid-email") {
          this.error = "Please enter a valid email address.";
        } else if (e.code === "auth/weak-password") {
          this.error = "Password must be at least 6 characters.";
        } else {
          this.error = "Registration failed. Please try again.";
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-sand);
  padding: 2rem 1rem;
  position: relative;
}

.auth-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 20%, rgba(27, 67, 50, 0.06) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 80%, rgba(198, 123, 92, 0.06) 0%, transparent 60%);
  pointer-events: none;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  position: relative;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-brand {
  display: inline-flex;
  margin-bottom: 1.25rem;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--color-forest);
  color: var(--color-gold-light);
  border-radius: var(--radius-lg);
  font-size: 1.25rem;
  transition: transform var(--transition-spring);
}

.auth-brand:hover .brand-icon {
  transform: rotate(-5deg) scale(1.05);
}

.auth-header h1 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 400;
  color: var(--color-forest-dark);
  margin-bottom: var(--space-2);
  letter-spacing: -0.01em;
}

.auth-header p {
  color: var(--color-warm-gray);
  font-size: var(--text-sm);
  margin: 0;
}

.form-group {
  margin-bottom: 1.25rem;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
}

.auth-footer a {
  color: var(--color-forest);
  font-weight: 600;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.auth-footer a:hover {
  color: var(--color-gold);
}

.auth-card .btn-primary {
  background-color: var(--color-forest);
  border-color: var(--color-forest);
  color: white;
}

.auth-card .btn-primary:hover {
  background-color: var(--color-forest-light);
  border-color: var(--color-forest-light);
  box-shadow: 0 4px 24px rgba(27, 67, 50, 0.35);
  transform: translateY(-2px);
}

.auth-card .btn-primary:disabled {
  opacity: 0.5;
  transform: none;
  box-shadow: none;
}
</style>

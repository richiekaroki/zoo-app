<template>
  <div class="auth-page">
    <div class="auth-card" data-aos="fade-up">
      <div class="auth-header">
        <router-link to="/" class="auth-brand" aria-label="Back to home">
          <span class="brand-icon"><i class="fas fa-paw"></i></span>
        </router-link>
        <h1>Welcome Back</h1>
        <p>Sign in to access your profile</p>
      </div>

      <form @submit.prevent="loginUser" aria-label="Sign in form">
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
            aria-describedby="emailError"
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter your password"
            required
            autocomplete="current-password"
            aria-describedby="passwordError"
          />
        </div>

        <div v-if="error" class="alert alert-danger" role="alert" aria-live="assertive" id="loginError">
          <i class="fas fa-exclamation-circle me-2"></i>{{ error }}
        </div>

        <button type="submit" class="btn btn-primary btn-lg w-100" :disabled="loading || !isFormValid" :aria-busy="loading">
          <span v-if="loading">
            <span class="spinner-border spinner-border-sm me-2"></span>Signing in...
          </span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <p class="auth-footer">
        Don't have an account?
        <router-link to="/register">Create one</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export default {
  data() {
    return { email: "", password: "", loading: false, error: null };
  },
  computed: {
    isFormValid() {
      return this.email.trim() && this.password.trim();
    },
  },
  methods: {
    async loginUser() {
      if (!this.isFormValid) return;
      this.loading = true;
      this.error = null;
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/");
      } catch (e) {
        if (e.code === "auth/user-not-found") {
          this.error = "No account found with this email.";
        } else if (e.code === "auth/wrong-password") {
          this.error = "Incorrect password. Please try again.";
        } else if (e.code === "auth/too-many-requests") {
          this.error = "Too many failed attempts. Please try again later.";
        } else {
          this.error = "Invalid email or password. Please try again.";
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
</style>

<template>
  <div class="profile-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title" data-aos="fade-up" data-aos-delay="100">Profile</h1>
      </div>
    </div>

    <div class="container py-5">
      <!-- Loading State -->
      <div v-if="loading" class="profile-loading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading profile...</span>
        </div>
      </div>

      <div v-else class="profile-layout">
        <div class="profile-card" data-aos="fade-up">
          <!-- Photo -->
          <div class="profile-photo-section">
            <div class="profile-photo">
              <img
                :src="user.photoURL || undefined"
                :alt="`${user.displayName || 'User'} profile photo`"
              />
            </div>
            <button class="btn btn-sm btn-outline-primary" @click="triggerFileUpload" aria-label="Change profile photo">
              <i class="fas fa-camera me-1"></i>Change Photo
            </button>
            <input
              type="file"
              ref="fileInput"
              @change="handlePhotoChange"
              accept="image/*"
              aria-label="Upload profile photo"
              style="display: none"
            />
          </div>

          <!-- Form -->
          <div class="profile-form">
            <div class="form-group">
              <label class="form-label" for="displayName">Display Name</label>
              <input
                type="text"
                class="form-control"
                id="displayName"
                v-model="user.displayName"
                maxlength="50"
                aria-describedby="displayNameHelp"
              />
              <small id="displayNameHelp" class="form-text text-muted">Up to 50 characters</small>
            </div>

            <div class="form-group">
              <label class="form-label" for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="user.email"
                :disabled="!canChangeEmail"
                :aria-describedby="!canChangeEmail ? 'emailHelp' : undefined"
              />
              <small v-if="!canChangeEmail" id="emailHelp" class="form-text text-muted">
                Email can only be changed for password accounts
              </small>
            </div>

            <div v-if="user.providerData[0]?.providerId === 'password'" class="form-group">
              <label class="form-label" for="newPassword">New Password</label>
              <input
                type="password"
                class="form-control mb-2"
                id="newPassword"
                v-model="newPassword"
                placeholder="Leave blank to keep current"
                minlength="6"
                aria-describedby="passwordHelp"
              />
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                v-model="confirmPassword"
                placeholder="Confirm new password"
                :aria-invalid="newPassword && newPassword !== confirmPassword"
                aria-describedby="confirmHelp"
              />
              <small id="passwordHelp" class="form-text text-muted">Minimum 6 characters</small>
              <small v-if="newPassword && newPassword !== confirmPassword" id="confirmHelp" class="form-text text-error">
                Passwords do not match
              </small>
            </div>

            <div class="profile-actions">
              <button
                class="btn btn-primary"
                @click="updateProfile"
                :disabled="updating || !isFormValid"
                aria-busy="updating"
              >
                <span v-if="updating">
                  <span class="spinner-border spinner-border-sm me-1"></span>Saving...
                </span>
                <span v-else><i class="fas fa-check me-1"></i>Save Changes</span>
              </button>
              <button class="btn btn-outline-danger" @click="handleLogout" :disabled="updating" aria-label="Sign out">
                <i class="fas fa-sign-out-alt me-1"></i>Sign Out
              </button>
            </div>

            <div v-if="successMessage" class="alert alert-success mt-3" role="status">
              <i class="fas fa-check-circle me-2"></i>{{ successMessage }}
            </div>
            <div v-if="error" class="alert alert-danger mt-3" role="alert">
              <i class="fas fa-exclamation-circle me-2"></i>{{ error }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, storage } from "@/firebase/firebaseConfig";
import { updateProfile, updateEmail, updatePassword, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "UserProfile",
  data() {
    return {
      user: { displayName: "", email: "", photoURL: "", providerData: [] },
      newPassword: "",
      confirmPassword: "",
      updating: false,
      loading: true,
      error: null,
      successMessage: null,
    };
  },
  computed: {
    canChangeEmail() {
      return this.user.providerData[0]?.providerId === "password";
    },
    isFormValid() {
      if (!this.user.displayName.trim()) return false;
      if (!this.user.email.trim()) return false;
      if (this.newPassword && this.newPassword.length < 6) return false;
      if (this.newPassword && this.newPassword !== this.confirmPassword) return false;
      return true;
    },
  },
  created() {
    this.loadUserData();
  },
  methods: {
    loadUserData() {
      this.loading = true;
      const u = auth.currentUser;
      if (u) {
        this.user = {
          displayName: u.displayName || "",
          email: u.email || "",
          photoURL: u.photoURL || "",
          providerData: u.providerData || [],
        };
      }
      this.loading = false;
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    async handlePhotoChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      try {
        this.updating = true;
        this.error = null;
        const storageRef = ref(storage, `profile-photos/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await updateProfile(auth.currentUser, { photoURL: downloadURL });
        this.user.photoURL = downloadURL;
        this.successMessage = "Photo updated!";
        setTimeout(() => { this.successMessage = null; }, 3000);
      } catch (e) {
        this.error = this.mapFirebaseError(e);
      } finally {
        this.updating = false;
      }
    },
    async updateProfile() {
      if (!this.isFormValid) {
        this.error = "Please fix the form errors before saving.";
        return;
      }
      try {
        this.updating = true;
        this.error = null;
        this.successMessage = null;

        if (this.user.displayName !== auth.currentUser.displayName || this.user.photoURL !== auth.currentUser.photoURL) {
          await updateProfile(auth.currentUser, { displayName: this.user.displayName, photoURL: this.user.photoURL });
        }
        if (this.canChangeEmail && this.user.email !== auth.currentUser.email) {
          await updateEmail(auth.currentUser, this.user.email);
        }
        if (this.newPassword && this.user.providerData[0]?.providerId === "password") {
          await updatePassword(auth.currentUser, this.newPassword);
          this.newPassword = "";
          this.confirmPassword = "";
        }

        this.successMessage = "Profile updated!";
        setTimeout(() => { this.successMessage = null; }, 3000);
      } catch (e) {
        this.error = this.mapFirebaseError(e);
      } finally {
        this.updating = false;
      }
    },
    async handleLogout() {
      try {
        await signOut(auth);
        this.$router.push("/login");
      } catch (e) {
        this.error = "Failed to sign out. Please try again.";
      }
    },
    mapFirebaseError(e) {
      const code = e.code || "";
      const messages = {
        "auth/requires-recent-login": "This action requires a recent sign-in. Please log out and log back in.",
        "auth/email-already-in-use": "This email is already associated with another account.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/user-not-found": "No account found with this email.",
        "storage/unauthorized": "You don't have permission to upload files.",
        "storage/quota-exceeded": "Storage quota exceeded. Please contact support.",
      };
      return messages[code] || "Something went wrong. Please try again.";
    },
  },
};
</script>

<style scoped>
.profile-page {
  padding-top: var(--nav-height);
}

.profile-layout {
  max-width: 580px;
  margin: 0 auto;
}

.profile-card {
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.profile-photo-section {
  text-align: center;
  padding: 2rem 2rem 1.5rem;
  background: var(--color-sand);
}

.profile-photo {
  width: 110px;
  height: 110px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid var(--color-gold);
  transition: transform var(--transition-spring);
}

.profile-photo:hover {
  transform: scale(1.03);
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.profile-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.profile-actions .btn {
  flex: 1;
}

.profile-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

.profile-actions .btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

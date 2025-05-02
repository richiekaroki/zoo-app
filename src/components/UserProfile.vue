<template>
    <div class="profile-container container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-sm">
            <div class="card-header bg-primary text-white">
              <h3 class="mb-0">User Profile</h3>
            </div>
            <div class="card-body">
              <!-- Profile Photo -->
              <div class="text-center mb-4">
                <img
                  :src="user.photoURL || 'https://via.placeholder.com/150'"
                  class="rounded-circle profile-photo"
                  width="150"
                  height="150"
                  alt="Profile"
                >
                <div class="mt-3">
                  <button 
                    class="btn btn-sm btn-outline-primary"
                    @click="triggerFileUpload"
                  >
                    Change Photo
                  </button>
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handlePhotoChange"
                    accept="image/*"
                    style="display: none"
                  >
                </div>
              </div>
  
              <!-- User Info -->
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.displayName"
                >
              </div>
  
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="user.email"
                  :disabled="!canChangeEmail"
                >
              </div>
  
              <!-- Password Change (only for email/password users) -->
              <div v-if="user.providerData[0]?.providerId === 'password'" class="mb-3">
                <label class="form-label">Change Password</label>
                <input
                  type="password"
                  class="form-control mb-2"
                  v-model="newPassword"
                  placeholder="New Password"
                >
                <input
                  type="password"
                  class="form-control"
                  v-model="confirmPassword"
                  placeholder="Confirm New Password"
                >
              </div>
  
              <!-- Action Buttons -->
              <div class="d-grid gap-2 mt-4">
                <button
                  class="btn btn-primary"
                  @click="updateProfile"
                  :disabled="updating"
                >
                  <span v-if="updating">
                    <span class="spinner-border spinner-border-sm" role="status"></span>
                    Updating...
                  </span>
                  <span v-else>Save Changes</span>
                </button>
                <button
                  class="btn btn-outline-danger"
                  @click="handleLogout"
                >
                  Logout
                </button>
              </div>
  
              <!-- Error Message -->
              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { auth } from '@/firebase/firebaseConfig';
  import { 
    updateProfile,
    updateEmail,
    updatePassword,
    signOut
  } from 'firebase/auth';
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  
  export default {
    name: 'UserProfile',
    data() {
      return {
        user: {
          displayName: '',
          email: '',
          photoURL: '',
          providerData: []
        },
        newPassword: '',
        confirmPassword: '',
        updating: false,
        error: null
      };
    },
    computed: {
      canChangeEmail() {
        return this.user.providerData[0]?.providerId === 'password';
      }
    },
    created() {
      this.loadUserData();
    },
    methods: {
      loadUserData() {
        const user = auth.currentUser;
        if (user) {
          this.user = {
            displayName: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || '',
            providerData: user.providerData || []
          };
        }
      },
      triggerFileUpload() {
        this.$refs.fileInput.click();
      },
      async handlePhotoChange(event) {
        const file = event.target.files[0];
        if (!file) return;
  
        try {
          this.updating = true;
          const storage = getStorage();
          const storageRef = ref(storage, `profile-photos/${auth.currentUser.uid}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          
          await updateProfile(auth.currentUser, {
            photoURL: downloadURL
          });
          
          this.user.photoURL = downloadURL;
          this.error = null;
        } catch (error) {
          console.error("Error updating profile photo:", error);
          this.error = error.message;
        } finally {
          this.updating = false;
        }
      },
      async updateProfile() {
        if (this.newPassword && this.newPassword !== this.confirmPassword) {
          this.error = "Passwords don't match";
          return;
        }
  
        try {
          this.updating = true;
          this.error = null;
  
          // Update profile info
          if (this.user.displayName !== auth.currentUser.displayName || 
              this.user.photoURL !== auth.currentUser.photoURL) {
            await updateProfile(auth.currentUser, {
              displayName: this.user.displayName,
              photoURL: this.user.photoURL
            });
          }
  
          // Update email if changed and allowed
          if (this.canChangeEmail && this.user.email !== auth.currentUser.email) {
            await updateEmail(auth.currentUser, this.user.email);
          }
  
          // Update password if provided
          if (this.newPassword && this.user.providerData[0]?.providerId === 'password') {
            await updatePassword(auth.currentUser, this.newPassword);
            this.newPassword = '';
            this.confirmPassword = '';
          }
  
          this.$toast.success('Profile updated successfully!');
        } catch (error) {
          console.error("Error updating profile:", error);
          this.error = error.message;
        } finally {
          this.updating = false;
        }
      },
      async handleLogout() {
        try {
          await signOut(auth);
          this.$router.push('/login');
        } catch (error) {
          console.error("Logout error:", error);
          this.error = error.message;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .profile-photo {
    object-fit: cover;
    border: 3px solid #37a000;
  }
  
  .card {
    border-radius: 10px;
    overflow: hidden;
  }
  
  .card-header {
    font-weight: 600;
  }
  
  .form-label {
    font-weight: 500;
  }
  
  .alert {
    margin-bottom: 0;
  }
  </style>
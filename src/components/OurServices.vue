<template>
  <section class="our-services py-5" id="our-services">
    <div class="container">
      <h2 class="text-center mb-5 display-4 fw-bold text-primary">
        Explore Our Wildlife Services
      </h2>

      <p class="text-center mb-5 lead text-muted">
        Immersive experiences with Earth's most fascinating creatures
      </p>

      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <div class="card h-100 shadow-sm border-0 service-card">
            <div class="card-body p-4 text-center">
              <div class="icon-wrapper mb-4">
                <i class="fas fa-paw fa-3x text-gradient"></i>
              </div>
              <h3 class="card-title h4 fw-bold mb-3">Animal Directory</h3>
              <p class="card-text text-muted mb-4">
                Browse our complete wildlife collection
              </p>
              <router-link
                to="/animals"
                class="btn btn-outline-primary rounded-pill px-4 py-2"
                @click="navigateToAnimals($event)"
              >
                View Animals <i class="fas fa-arrow-right ms-2"></i>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Other service cards... -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "OurServices",
  methods: {
    navigateToAnimals(event) {
      event.preventDefault();
      if (this.$route.path === "/animals") {
        this.$router.go(0); // Force reload if already on animals page
      } else {
        this.$router.push("/animals");
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.hash === "#our-services") {
        const el = document.getElementById("our-services");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      if (typeof window.AOS !== "undefined") {
        window.AOS.refresh();
      }
    });
  },
};
</script>

<style scoped>
.our-services {
  background: linear-gradient(135deg, #f5fcff 0%, #ebf7ff 100%);
}

.service-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.service-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12) !important;
}

.text-gradient {
  background: linear-gradient(135deg, #3498db 0%, #2ecc71 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.icon-wrapper {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-outline-primary {
  transition: all 0.4s;
  border-width: 2px;
}

.btn-outline-primary:hover {
  background: linear-gradient(135deg, #3498db 0%, #2ecc71 100%);
  color: white !important;
  border-color: transparent;
}

@media (max-width: 768px) {
  .our-services {
    padding: 3rem 0;
  }
}
</style>
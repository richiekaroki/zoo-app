import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// CSS
import "@/assets/css/transitions.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

// JS
import AOS from "aos";

const app = createApp(App);

// Initialize AOS
AOS.init({
  duration: 600,
  easing: "ease-out-quad",
  once: true,
  offset: 100,
  disable: window.innerWidth < 768
});

// Smooth AOS refresh on route changes
let refreshTimeout;
router.afterEach((to, from) => {
  if (to.path !== from.path) {
    clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(() => {
      AOS.refreshHard();
    }, 150);
  }
});

app.use(router).mount("#app");
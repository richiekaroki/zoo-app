import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { scrollReveal } from "./directives/scrollReveal";
import { createHead } from "@vueuse/head";

// CSS
import "@/assets/css/_bootstrap.scss";
import "@/assets/css/design-system.css";
import "@/assets/css/transitions.css";
import "@/assets/css/scroll-reveal.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const app = createApp(App);
const head = createHead();

app.directive("scroll-reveal", scrollReveal);
app.use(router).use(head).mount("#app");

window.dispatchEvent(new Event("render-event"));

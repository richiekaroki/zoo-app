// Import the Firebase auth instance and necessary Vue Router functions
import { auth } from "@/firebase/firebaseConfig";
import { createRouter, createWebHistory } from "vue-router";

// Import components
import AboutUs from "@/components/AboutUs.vue";
import AdminDashboard from "@/components/AdminDashboard.vue";
import AnimalDetails from "@/components/AnimalDetail.vue";
import AnimalList from "@/components/AnimalList.vue";
import ContactForm from "@/components/ContactForm.vue";
import HomePage from "@/components/HomePage.vue";
import NewRegister from "@/components/NewRegister.vue";
import OurServices from "@/components/OurServices.vue";
import UserLogin from "@/components/UserLogin.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/about", name: "About", component: AboutUs },
  { path: "/services", name: "Services", component: OurServices },
  { path: "/contact", name: "Contact", component: ContactForm },
  { path: "/login", name: "Login", component: UserLogin },
  { path: "/register", name: "Register", component: NewRegister },
  { path: "/animals", name: "AnimalList", component: AnimalList },
  {
    path: "/animals/:name",
    name: "AnimalDetail",
    component: AnimalDetails,
    props: true,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add Navigation Guard for routes requiring authentication
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = auth.currentUser; // Get current user

    // Check if user is authenticated
    if (!user) {
      // User is not authenticated, redirect to login
      next("/login");
    } else {
      // User is authenticated, proceed to the next route
      next();
    }
  } else {
    // Route does not require authentication, proceed as normal
    next();
  }
});

export default router;

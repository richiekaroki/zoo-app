import { auth } from "@/firebase/firebaseConfig";
import { createRouter, createWebHistory } from "vue-router";

// Import components directly (no lazy loading)
import AboutUs from "@/components/AboutUs.vue";
import AdminDashboard from "@/components/AdminDashboard.vue";
import AnimalDetails from "@/components/AnimalDetail.vue";
import AnimalList from "@/components/AnimalList.vue";
import ContactForm from "@/components/ContactForm.vue";
import HomePage from "@/components/HomePage.vue";
import NewRegister from "@/components/NewRegister.vue";
import OurServices from "@/components/OurServices.vue";
import UserLogin from "@/components/UserLogin.vue";
import UserProfile from "@/components/UserProfile.vue"; // Make sure this exists

const routes = [
  // Basic routes
  { path: "/", name: "Home", component: HomePage },
  { path: "/about", name: "About", component: AboutUs },
  { path: "/services", name: "Services", component: OurServices },
  { path: "/contact", name: "Contact", component: ContactForm },
  
  // Authentication routes
  { path: "/login", name: "Login", component: UserLogin },
  { path: "/register", name: "Register", component: NewRegister },
  
  // Animal-related routes
  { path: "/animals", name: "AnimalList", component: AnimalList },
  {
    path: "/animals/:name",
    name: "AnimalDetail",
    component: AnimalDetails,
    props: true,
  },
  
  // Redirects
  {
    path: "/services/animals",
    redirect: "/animals"
  },
  {
    path: "/habitats",
    redirect: "/animals"
  },
  
  // Protected routes
  {
    path: "/profile",
    name: "Profile",
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminDashboard,
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 70 // Offset for navbar
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = auth.currentUser;
    if (!user) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
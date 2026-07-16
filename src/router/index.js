import { auth } from "@/firebase/firebaseConfig";
import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";

const HomePage = () => import("@/views/HomePage.vue");
const AboutUs = () => import("@/views/AboutUs.vue");
const OurServices = () => import("@/views/OurServices.vue");
const ContactForm = () => import("@/views/ContactForm.vue");
const UserLogin = () => import("@/components/auth/UserLogin.vue");
const NewRegister = () => import("@/components/auth/NewRegister.vue");
const AnimalList = () => import("@/components/animals/AnimalList.vue");
const AnimalDetail = () => import("@/components/animals/AnimalDetail.vue");
const UserProfile = () => import("@/views/UserProfile.vue");
const AdminDashboard = () => import("@/components/admin/AdminDashboard.vue");
const NotFound = () => import("@/views/NotFound.vue");

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/about", name: "About", component: AboutUs },
  { path: "/services", name: "Services", component: OurServices },
  { path: "/conservation", redirect: "/about" },
  { path: "/contact", name: "Contact", component: ContactForm },
  { path: "/login", name: "Login", component: UserLogin },
  { path: "/register", name: "Register", component: NewRegister },
  { path: "/animals", name: "AnimalList", component: AnimalList },
  {
    path: "/animals/:name",
    name: "AnimalDetail",
    component: AnimalDetail,
    props: true,
  },
  { path: "/services/animals", redirect: "/animals" },
  { path: "/habitats", redirect: "/animals" },
  {
    path: "/profile",
    name: "Profile",
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: "smooth", top: 70 };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

const waitForAuth = new Promise((resolve) => {
  const unsubscribe = onAuthStateChanged(auth, () => {
    unsubscribe();
    resolve();
  });
});

router.beforeEach(async (to, from, next) => {
  await waitForAuth;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.currentUser) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

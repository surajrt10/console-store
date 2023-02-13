import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Consoles from "./views/Consoles.vue";
import Games from "./views/Games.vue";
import Accessories from "./views/Accessories.vue";
import Partner from "./views/Partner.vue";
import Cart from "./components/Cart.vue";
import Profile from "./views/Profile.vue";
import LoginRegister from './views/LoginRegister.vue'
import Checkout from './views/Checkout.vue'

const routes = [
  {
    path: "/",
    alias:'/home',
    name: "Home",
    component: Home,
  },
  {
    path: "/consoles",
    name: "Consoles",
    component: Consoles,
  },
  {
    path: "/games",
    name: "Games",
    component: Games,
  },
  {
    path: "/accessories",
    name: "Accessories",
    component: Accessories,
  },
  {
    path: "/partner",
    name: "Partner",
    component: Partner,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path:'/login',
    name:'LoginRegister',
    component:LoginRegister
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
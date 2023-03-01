import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Consoles from "./views/Consoles.vue";
import Games from "./views/Games.vue";
import Accessories from "./views/Accessories.vue";
import Partner from "./views/Partner.vue";
import Cart from "./components/Cart.vue";
import Profile from "./views/Profile.vue";
import LoginRegister from "./views/LoginRegister.vue";
import Checkout from "./views/Checkout.vue";
import Pc from "./views/Pc.vue";
import Processor from "./components/Pc/Processor.vue";
import Motherboard from "./components/Pc/Motherboard.vue";
import GraphicsCard from "./components/Pc/GraphicsCard.vue";
import Ram from "./components/Pc/Ram.vue";
import PowerSupply from "./components/Pc/PowerSupply.vue";
import Case from "./components/Pc/Case.vue";
import Cooling from "./components/Pc/Cooling.vue";
import StorageComponent from "./components/Pc/StorageComponent.vue";


const routes = [
  {
    path: "/",
    alias: "/home",
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
    path: "/pc",
    name: "Pc",
    component: Pc,
    children: [
      {
        path: "/pc/processor",
        name: "Processor",
        component: Processor,
      },
      {
        path: "/pc/motherboard",
        name: "Motherboard",
        component: Motherboard,
      },
      {
        path: "/pc/graphics",
        name: "GraphicsCard",
        component: GraphicsCard,
      },
      {
        path: "/pc/ram",
        name: "Ram",
        component: Ram,
      },
      {
        path: "/pc/psu",
        name: "Psu",
        component: PowerSupply,
      },
      {
        path: "/pc/case",
        name: "Case",
        component: Case,
      },
      {
        path: "/pc/cooling",
        name: "Cooling",
        component: Cooling,
      },
      {
        path: "/pc/storage",
        name: "Storage",
        component: StorageComponent,
      },
    ],
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
    path: "/login",
    name: "LoginRegister",
    component: LoginRegister,
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

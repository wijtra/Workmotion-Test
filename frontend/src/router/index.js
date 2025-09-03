import { createRouter, createWebHistory } from "vue-router";
import Products from "../pages/Products.vue";
import Categories from "../pages/Categories.vue";

const routes = [
  { path: "/", redirect: "/products" },
  { path: "/products", component: Products },
  { path: "/categories", component: Categories },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

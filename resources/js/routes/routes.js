import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products.vue";
import Categories from "../pages/Categories.vue";

import AddProduct from "../components/AddProduct.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/home",
      name: "home",
      component: Dashboard
    },
    {
      path: "/dashboard/products",
      name: "products",
      component: Products
    },
    {
      path: "/dashboard/products/add-product",
      name: "products-add",
      component: AddProduct
    },
    {
      path: "/dashboard/products/edit-product",
      name: "products-edit",
      component: AddProduct
    },
    {
      path: "/dashboard/categories",
      name: "categories",
      component: Categories
    }
  ]
});

import Vue from "vue";
import Router from "vue-router";

import AppDashboard from "../components/AppDashboard.vue";
import ManagePengeluaran from "../components/ManagePengeluaran.vue";
import ManagePenjualan from "../components/ManagePenjualan.vue";
import ManageKeuangan from "../components/ManageKeuangan.vue";
import ManagePembayaran from "../components/ManagePembayaran.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/dashboard",
      name: "AppDashboard",
      component: AppDashboard,
    },
    {
      path: "/pengeluaran",
      name: "ManagePengeluaran",
      component: ManagePengeluaran,
    },
    {
      path: "/penjualan",
      name: "ManagePenjualan",
      component: ManagePenjualan,
    },
    {
      path: "/keuangan",
      name: "ManageKeuangan",
      component: ManageKeuangan,
    },
    {
      path: "/pembayaran",
      name: "ManagePembayaran",
      component: ManagePembayaran,
    },
    // { path: "/login", component: LoginPage }, // Rute halaman login
    // { path: "/", component: HomePage }, // Rute halaman utama
    // // Rute lainnya...
  ],
});

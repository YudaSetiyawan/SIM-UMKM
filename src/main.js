import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // impor dari folder router
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "./assets/style.css";

import store from "./store";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  // integrasi router
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

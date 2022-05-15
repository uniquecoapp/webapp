import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

/* import font awesome icon component */

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

Vue.config.productionTip = false;

const options = {
  confirmButtonColor: "#ff974c",
  cancelButtonColor: "#ff7674",
};

Vue.use(VueSweetalert2, options);
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});

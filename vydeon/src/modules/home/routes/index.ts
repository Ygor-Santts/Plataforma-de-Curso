import type { RouteRecordRaw } from "vue-router";
import IndexVue from "../views/IndexVue.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: IndexVue,
  },
];

export default routes;

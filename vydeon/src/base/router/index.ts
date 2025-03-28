import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import type { ModuleConfig, ModulesConfig } from "../types";
import IndexView from "../views/IndexView.vue";

export default (modulesConfig: ModulesConfig) => {
  const modules = modulesConfig.config;
  const defaultRoute = modulesConfig.defaultRoute;

  const routes: RouteRecordRaw[] = [];

  modules.forEach((module: ModuleConfig) => {
    if (module.routes) {
      module.routes.forEach((route: RouteRecordRaw) => {
        routes.push(route);
      });
    }
  });

  if (!routes.find((route) => route.path === "/")) {
    routes.push({
      path: "/",
      name: "DefaultRoute",
      component: IndexView,
      props: { defaultRoute },
    });
  }

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  return router;
};

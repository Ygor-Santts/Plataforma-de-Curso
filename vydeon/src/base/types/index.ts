import type { RouteRecordRaw } from "vue-router";
import type { Store } from "pinia";

interface ModuleConfig {
  enabled: boolean;
  name: string;
  path?: string;
  routes: RouteRecordRaw[];
  defaultRoute?: string;
  store?: Store;
}

interface ModulesConfig {
  config: ModuleConfig[];
  defaultRoute?: string;
}

export type { ModuleConfig, ModulesConfig };

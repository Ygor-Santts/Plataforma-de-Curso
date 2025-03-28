import type { ModuleConfig } from "../../base/types";
import routes from "./routes";

const config: ModuleConfig = {
  enabled: true,
  name: "Login",
  routes: routes,
};

export default config;

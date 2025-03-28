import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import modulesSetup from "./setup/modules";

import "@/assets/main.css";
import getErrorMessage from "@/base/functions/erros";

export default async () => {
  try {
    const app = createApp(App);

    app.use(createPinia());

    const modulesConfig = await modulesSetup();
    app.use(router(modulesConfig));

    return app;
  } catch (error) {
    console.error(`Failed to create app: ${getErrorMessage(error)}`);
  }
};

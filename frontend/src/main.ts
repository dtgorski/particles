import "@/assets/css.scss";
import { Popper } from "@/context/Popper";

import { createApp } from "vue";

import App from "@/App.vue";
import { cache } from "@/cache";

createApp(App)
    .provide("cache", cache)
    .provide("popper", new Popper())
    .mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/routes";
import store from "./store";
import "bootstrap/dist/js/bootstrap.bundle";

require("@fortawesome/fontawesome-free/css/all.css");

createApp(App)
	.use(router)
	.use(store)
	.mount("#app");

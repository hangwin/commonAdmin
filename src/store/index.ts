import { createPinia } from 'pinia';
import type { App } from 'vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
export const store = createPinia();
store.use(piniaPluginPersistedstate);
export const setupStore = (app: App) => {
	app.use(store);
};

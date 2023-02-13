import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import { createStore } from 'vuex'
import { CartStore } from './store/CartStore'
const store = createStore({
  modules: {
    CartStore,
  }
});

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(store)
  .mount('#app')

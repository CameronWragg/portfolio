import 'mdb-vue-ui-kit/css/mdb.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import title from './mixins/title'

createApp(App).use(router).mixin(title).mount('#app')

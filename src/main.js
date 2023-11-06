import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import {library} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {faUserSecret, faPen, faTrash, faCheck  } from '@fortawesome//free-solid-svg-icons';

library.add(faUserSecret, faPen, faTrash, faCheck)

const app = createApp(App)

app.use(createPinia())
app.component('fa-icon', FontAwesomeIcon)
app.mount('#app')

import bootstrap from 'bootstrap/dist/js/bootstrap.js'

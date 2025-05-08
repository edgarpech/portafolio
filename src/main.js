import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'; // Importa el router desde router/index.js
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);
app.use(router); 
app.mount('#app'); // Monta la aplicación

// Inicializa AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
  });

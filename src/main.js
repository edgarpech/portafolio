import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'; // Importa el router desde router/index.js
import AOS from 'aos'; // Ensure you have installed AOS using npm
import 'aos/dist/aos.css';

import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";

const app = createApp(App);
app.use(Particles, {
  init: async engine => {
    // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
    await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
  },
}); // Usa Particles
app.use(router); 
app.mount('#app'); // Monta la aplicación

// Inicializa AOS
AOS.init({
  duration: 1000,
  once: true,
});

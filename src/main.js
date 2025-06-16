import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'; // Importa el router desde router/index.js
import AOS from 'aos';
import 'aos/dist/aos.css';

import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";

const app = createApp(App);

app.use(Particles, {
    init: async engine => {
        // await loadFull(engine); // Biblioteca completa de tsParticles desde "tsparticles"
        await loadSlim(engine); // Versión slim desde "@tsparticles/slim"
    },
});

app.use(router); 
app.mount('#app'); // Monta la aplicación

// Inicializa AOS
AOS.init({
    duration: 1000,
    once: true,
});

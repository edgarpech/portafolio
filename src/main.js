import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);
app.use(router);

// Wait for router to resolve current route before first paint
// to avoid the navbar briefly highlighting "Inicio" on reload.
router.isReady().then(() => {
    app.mount('#app');
});

AOS.init({
    duration: 700,
    once: true,
    easing: 'ease-out-cubic',
});

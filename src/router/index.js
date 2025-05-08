import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/proyectos', component: () => import('../views/Projects.vue') },
    { path: '/sobre-mi', component: () => import('../views/About.vue') },
    { path: '/cv', component: () => import('../views/CV.vue') },
    { path: '/contacto', component: () => import('../views/Contact.vue') },
  ];

// Crea la instancia del router
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        };
      }
      return { top: 0, behavior: 'smooth' };
    },
});

export default router; // Exporta el router para usarlo en main.js
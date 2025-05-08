import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/proyectos',
    name: 'Projects',
    // Lazy loading para cargar el componente solo cuando se acceda a la ruta
    component: () => import('../views/Projects.vue'),
  },
];

// Crea la instancia del router
const router = createRouter({
  history: createWebHistory(), // Modo de historial HTML5 (URLs limpias, sin "#")
  routes, 
});

export default router; // Exporta el router para usarlo en main.js
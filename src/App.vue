<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa; /* Fondo claro por defecto */
}

/* Si quieres animaciones al cambiar de ruta */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
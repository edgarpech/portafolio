<template>
    <main class="min-h-screen flex flex-col justify-center items-center pt-16 bg-white">
      <h1 class="text-6xl font-bold mb-4 text-gray-800">
        Hola, soy Edgar Pech
      </h1>
      <p class="text-2xl mb-8 text-gray-600">
        Desarrollador Web 
      </p>
      <router-link 
        to="/proyectos"
        class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Mis Proyectos
      </router-link>
    </main>
  </template>
<template>
    <main class="min-h-screen flex flex-col justify-center items-center">
      <h1 
        class="text-6xl font-bold mb-4 text-gray-800"
        data-aos="fade-down"
      >
        Hola, soy Edgar Pech
      </h1>
      <p 
        class="text-2xl mb-8 text-gray-600"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        Desarrollador Web Frontend
      </p>
      <router-link 
        to="/proyectos" 
        class="btn bg-green-500 hover:bg-green-600"
        data-aos="zoom-in"
        data-aos-delay="400"
      >
        Mis Proyectos
      </router-link>
    </main>
  </template>
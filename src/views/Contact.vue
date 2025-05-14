<template>
  <section class="pt-16">
    <div>
    <h2 
      class="text-4xl font-bold mt-10 mb-8 text-center text-gray-800 hover:text-green-500 transition-colors"
      data-aos="fade-up"
    >
      Contáctame
    </h2>
    <!-- seccion de contacto, email, direccion, telefono -->
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div data-aos="fade-in">
      <img 
        src="https://avatars.githubusercontent.com/u/12345678?v=4"
        alt="Edgar Pech" 
        class="rounded-full w-64 h-64 object-cover mx-auto shadow-lg"
      >
      </div>
      <div data-aos="fade-in">
      <p class="text-lg mb-4 text-gray-700">
        ¡Hola! Soy desarrollador frontend con experiencia en Vue.js, React y animaciones web.
      </p>
      <p class="text-lg mb-4 text-gray-700">
        Puedes contactarme a través de mi correo electrónico: 
        <a href="mailto:example@example.com">example@example.com</a>
      </p>
      </div>
    </div>
    <div class="mt-8 text-center">
      <a 
      href="mailto:example@example.com" class="text-blue-500 hover:underline">Envíame un correo</a>
    </div>
    </div>
  </section>
  </template>
  
  <script setup>
  // No se necesita el método animateText
  </script>
  
  <style>
  /* No se necesita la clase hover-letter */
  </style>

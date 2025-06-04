<script setup>

const particlesLoaded = container => {};

</script>
<template>
  <div>
        <vue-particles id="tsparticles" @particles-loaded="particlesLoaded" url="/particles.json" />
    <section class="pt-16">
      <div>
      <h2 
        class="text-4xl font-bold mt-10 mb-8 text-center text-gray-100"
        data-aos="fade-up"
      >
        Contáctame
      </h2>
      <!-- seccion de contacto, email, direccion, telefono -->
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div data-aos="fade-in">
        <p class="text-lg mb-4 text-gray-100">
          ¡Hola! Soy desarrollador frontend con experiencia en Vue.js, React y animaciones web.
        </p>
        <p class="text-lg mb-4 text-gray-100">
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
    </div>  
  </template>

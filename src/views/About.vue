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
            Sobre mí
          </h2>
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div data-aos="fade-in">
              <img 
                src="https://avatars.githubusercontent.com/edgarpech?v=4"
                alt="Edgar Pech" 
                class="rounded-full w-64 h-64 object-cover mx-auto shadow-lg"
              >
            </div>
            <div data-aos="fade-in">
              <!-- Más contenido -->
            </div>
          </div>
          </div>
      </section>
  </div>
  </template>
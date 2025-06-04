<script setup>

const particlesLoaded = container => {};

</script>

<template>
    <div>
        <vue-particles id="tsparticles" @particles-loaded="particlesLoaded" url="/particles.json" />
        <section class="pt-16">
            <div>
                <h1 
                    class="text-4xl font-bold text-center mt-10 mb-5 text-white"
                    data-aos="fade-up"
                >
                    Proyectos
                </h1>
                <p 
                    class="text-center text-gray-100 mb-10" 
                    data-aos="fade-in"
                    data-aos-delay="200"
                >
                    Aquí puedes ver algunos de mis proyectos más destacados.
                </p>
            </div>
        </section>
        </div>  
</template>
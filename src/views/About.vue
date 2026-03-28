<script setup>
    import { onMounted } from 'vue'
    import { gsap } from 'gsap'

    const particlesLoaded = container => {};

    const techStack = [
        { name: 'PHP', logo: '/logos/php.webp' },
        { name: 'JavaScript', logo: '/logos/javascript.webp' },
        { name: 'HTML5', logo: '/logos/html.webp' },
        { name: 'CSS3', logo: '/logos/css.webp' },
        { name: 'Laravel', logo: '/logos/laravel.webp' },
        { name: 'Yii', logo: '/logos/yii.webp' },
        { name: 'Livewire', logo: '/logos/livewire.webp' },
        { name: 'Vue.js', logo: '/logos/vuejs.webp' },
        { name: 'Tailwind CSS', logo: '/logos/tailwindcss.webp' },
        { name: 'Bootstrap', logo: '/logos/bootstrap.webp' },
        { name: 'MySQL', logo: '/logos/mysql.webp' },
        { name: 'SQL Server', logo: '/logos/sqlserver.webp' },
        { name: 'PostgreSQL', logo: '/logos/postgresql.webp' },
        { name: 'Git', logo: '/logos/git.webp' },
        { name: 'GitHub', logo: '/logos/github.webp' },
        { name: 'Bitbucket', logo: '/logos/bitbucket.webp' },
        { name: 'Jira', logo: '/logos/jira.webp' },
        { name: 'API REST', logo: '/logos/restapi.webp' },
        { name: 'Composer', logo: '/logos/composer.webp' },
        { name: 'Figma', logo: '/logos/figma.webp' }
    ];

    onMounted(() => {
        gsap.from('.about-header', { y: -30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 });
        gsap.from('.about-section', { y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.4 });
    });
</script>

<template>
    <div class="page-content">
        <vue-particles id="tsparticles" @particles-loaded="particlesLoaded" url="/particles.json"/>

        <section class="flex-1 pt-4 sm:pt-24 px-4 pb-8">
            <div class="container mx-auto max-w-5xl">
                <!-- Header -->
                <div class="about-header flex flex-col sm:flex-row items-center gap-5 mb-8">
                    <img src="/images/perfil.webp" alt="Edgar Pech" class="profile-img w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-3 border-indigo-500/50">
                    <div class="text-center sm:text-left">
                        <h1 class="text-2xl sm:text-3xl font-bold text-white mb-1">Edgar Pech</h1>
                        <p class="text-indigo-400 font-medium text-sm sm:text-base">Ingeniero en Sistemas Computacionales</p>
                        <p class="text-slate-400 text-sm mt-1">+1.5 años de experiencia en desarrollo web Full Stack</p>
                    </div>
                </div>

                <!-- Tech Stack -->
                <div class="about-section mb-8">
                    <h3 class="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Stack Tecnológico</h3>
                    <div class="flex flex-wrap gap-1.5 sm:gap-2.5">
                        <div v-for="(tech, i) in techStack" :key="i"
                            class="tech-pill flex items-center gap-1.5 sm:gap-2 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/30 px-2 py-1.5 sm:px-3 sm:py-2 transition-all hover:-translate-y-0.5 hover:border-indigo-500/30"
                            :title="tech.name">
                            <img :src="tech.logo" :alt="tech.name" class="w-4 h-4 sm:w-5 sm:h-5 object-contain">
                            <span class="text-slate-300 text-[10px] sm:text-xs font-medium hidden sm:inline">{{ tech.name }}</span>
                        </div>
                    </div>
                </div>

                <!-- Experience -->
                <div class="about-section mb-8">
                    <h3 class="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Experiencia</h3>
                    <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-5 sm:p-6 mb-5">
                        <p class="text-slate-300 leading-relaxed text-sm sm:text-base">
                            Ingeniero en Sistemas Computacionales apasionado por crear soluciones eficientes. Más de 1.5 años de experiencia desarrollando sistemas clave, alineando soluciones técnicas con necesidades administrativas y financieras.
                        </p>
                    </div>
                </div>

                <!-- Objectives -->
                <div class="about-section">
                    <h3 class="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Objetivos</h3>
                    <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-5 sm:p-6">
                        <p class="text-slate-300 leading-relaxed text-sm sm:text-base mb-3">
                            Busco integrarme en equipos dinámicos donde pueda contribuir con mis habilidades mientras aprendo de otros profesionales. Mi objetivo es enfrentar nuevos desafíos que me permitan crecer técnicamente.
                        </p>
                        <p class="text-slate-300 leading-relaxed text-sm sm:text-base">
                            Comprometido con el aprendizaje continuo y la exploración de tecnologías emergentes. Aspiro a documentar soluciones y compartir conocimiento en entornos donde la curiosidad y la mejora continua sean valores fundamentales.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .profile-img {
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
    }
</style>
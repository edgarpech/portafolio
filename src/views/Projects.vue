<script setup>
    import { ref, onMounted, nextTick, onUnmounted } from 'vue'
    import { gsap } from 'gsap'

    const particlesLoaded = container => {};
    const selectedProject = ref(null);

    const projects = [
        {
            title: "Construcciones Luna",
            image: "/logos/projects/construccionesluna.webp",
            url: "https://construccionesluna.com.mx",
            description: "Sitio web personalizado para un ingeniero eléctrico independiente, especializado en diseño y construcción de instalaciones eléctricas.",
            workType: "Freelance",
            client: "Gerardo Bernal",
            tech: [
                { logo: "/logos/html.webp", name: "HTML" },
                { logo: "/logos/css.webp", name: "CSS" },
                { logo: "/logos/javascript.webp", name: "JavaScript" },
                { logo: "/logos/vuejs.webp", name: "Vue.js" },
                { logo: "/logos/tailwindcss.webp", name: "Tailwind CSS" }
            ]
        },
        {
            title: "Simulador SkyCapital",
            image: "/logos/projects/simulacion.webp",
            url: "https://cotiza.skycapital.mx/simulador",
            description: "Plataforma de simulación de inversiones con cálculo de rendimientos y generación de reportes PDF.",
            workType: "Netlancers (empresa anterior)",
            client: "SkyCapital (cliente de Netlancers)",
            tech: [
                { logo: "/logos/html.webp", name: "HTML" },
                { logo: "/logos/css.webp", name: "CSS" },
                { logo: "/logos/javascript.webp", name: "JavaScript" },
                { logo: "/logos/php.webp", name: "PHP" },
                { logo: "/logos/mysql.webp", name: "MySQL" },
                { logo: "/logos/bootstrap.webp", name: "Bootstrap" },
                { logo: "/logos/laravel.webp", name: "Laravel" },
                { logo: "/logos/livewire.webp", name: "Livewire" }
            ]
        },
        {
            title: "Tendejón Azael",
            image: "/logos/projects/tendejonazael.webp",
            url: "https://tendejonazael.com.mx",
            description: "Sitio web para tienda de abarrotes con catálogo de productos y panel de administración, sincronizando productos diariamente con el sistema de punto de venta Eleventa.",
            workType: "Freelance",
            client: "Tendejón Azael",
            tech: [
                { logo: "/logos/html.webp", name: "HTML" },
                { logo: "/logos/css.webp", name: "CSS" },
                { logo: "/logos/javascript.webp", name: "JavaScript" },
                { logo: "/logos/php.webp", name: "PHP" },
                { logo: "/logos/postgresql.webp", name: "PostgreSQL" },
                { logo: "/logos/laravel.webp", name: "Laravel" },
                { logo: "/logos/tailwindcss.webp", name: "Tailwind CSS" }
            ]
        }
    ];

    const openProject = (index) => {
        selectedProject.value = index;
        document.body.style.overflow = 'hidden';
    };

    const closeProject = () => {
        selectedProject.value = null;
        document.body.style.overflow = '';
    };

    const handleKeydown = (e) => {
        if (e.key === 'Escape') closeProject();
    };

    onMounted(() => {
        document.addEventListener('keydown', handleKeydown);
        nextTick(() => {
            gsap.from('.project-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.2
            });
        });
    });

    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeydown);
        document.body.style.overflow = '';
    });
</script>

<template>
    <div class="page-content">
        <vue-particles id="tsparticles" @particles-loaded="particlesLoaded" url="/particles.json"/>

        <section class="pt-4 sm:pt-24 px-4 pb-8">
            <div class="container mx-auto max-w-5xl">
                <h2 class="text-3xl sm:text-4xl font-bold text-white mb-2 text-center">Mis Proyectos</h2>
                <p class="text-slate-400 text-center mb-10 text-sm sm:text-base">Algunos de los proyectos en los que he trabajado</p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div v-for="(project, index) in projects" :key="index"
                        class="project-card group cursor-pointer"
                        @click="openProject(index)">
                        <div class="card-inner bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-indigo-500/10 group-hover:border-indigo-500/30">
                            <div class="relative overflow-hidden h-40 sm:h-48 bg-slate-900/50">
                                <img :src="project.image" :alt="project.title" class="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105">
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                    <span class="text-white text-sm font-medium px-4 py-2 bg-indigo-600/80 rounded-full backdrop-blur-sm">Ver detalles</span>
                                </div>
                            </div>
                            <div class="p-5 sm:p-6">
                                <h3 class="text-xl font-semibold text-white mb-2">{{ project.title }}</h3>
                                <p class="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{{ project.description }}</p>
                                <div class="flex items-center gap-2 flex-wrap">
                                    <span class="text-xs text-slate-500 mr-1">Stack:</span>
                                    <div v-for="(tech, i) in project.tech.slice(0, 5)" :key="i" class="flex items-center gap-1 bg-slate-700/50 rounded-full px-2.5 py-1">
                                        <img :src="tech.logo" :alt="tech.name" class="w-3.5 h-3.5 object-contain">
                                        <span class="text-xs text-slate-300">{{ tech.name }}</span>
                                    </div>
                                    <span v-if="project.tech.length > 5" class="text-xs text-slate-500">+{{ project.tech.length - 5 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Modal Overlay -->
        <Transition name="modal">
            <div v-if="selectedProject !== null" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8" @click.self="closeProject">
                <div class="modal-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeProject"></div>
                <div class="modal-card relative bg-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10">
                    <button @click="closeProject" class="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-slate-700/80 hover:bg-slate-600 text-white transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    <div class="relative h-48 sm:h-64 bg-slate-900/50 overflow-hidden rounded-t-2xl">
                        <img :src="projects[selectedProject].image" :alt="projects[selectedProject].title" class="w-full h-full object-contain p-8">
                    </div>

                    <div class="p-6 sm:p-8">
                        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">{{ projects[selectedProject].title }}</h2>

                        <div class="flex flex-wrap gap-3 mb-6">
                            <div v-if="projects[selectedProject].workType" class="flex items-center gap-2 text-sm">
                                <span class="text-slate-400">Tipo:</span>
                                <span class="text-indigo-400 font-medium">{{ projects[selectedProject].workType }}</span>
                            </div>
                            <span v-if="projects[selectedProject].workType && projects[selectedProject].client" class="text-slate-600">·</span>
                            <div v-if="projects[selectedProject].client" class="flex items-center gap-2 text-sm">
                                <span class="text-slate-400">Cliente:</span>
                                <span class="text-indigo-400 font-medium">{{ projects[selectedProject].client }}</span>
                            </div>
                        </div>

                        <p class="text-slate-300 leading-relaxed mb-6">{{ projects[selectedProject].description }}</p>

                        <div class="mb-6">
                            <h4 class="text-sm font-medium text-slate-400 mb-3">Tecnologías utilizadas</h4>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="(tech, i) in projects[selectedProject].tech" :key="i" class="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-2">
                                    <img :src="tech.logo" :alt="tech.name" class="w-5 h-5 object-contain">
                                    <span class="text-sm text-slate-300">{{ tech.name }}</span>
                                </div>
                            </div>
                        </div>

                        <a v-if="projects[selectedProject].url" :href="projects[selectedProject].url" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl transition-colors font-medium">
                            Visitar sitio web
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
    .modal-enter-active,
    .modal-leave-active {
        transition: all 0.3s ease;
    }

    .modal-enter-active .modal-backdrop,
    .modal-leave-active .modal-backdrop {
        transition: opacity 0.3s ease;
    }

    .modal-enter-active .modal-card,
    .modal-leave-active .modal-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .modal-enter-from .modal-backdrop,
    .modal-leave-to .modal-backdrop {
        opacity: 0;
    }

    .modal-enter-from .modal-card,
    .modal-leave-to .modal-card {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }

    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    /* Scrollbar modal */
    .modal-card::-webkit-scrollbar {
        width: 6px;
    }

    .modal-card::-webkit-scrollbar-track {
        background: transparent;
    }

    .modal-card::-webkit-scrollbar-thumb {
        background-color: #6366f1;
        border-radius: 3px;
    }
</style>
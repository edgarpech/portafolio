<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { X, ExternalLink, ArrowUpRight } from 'lucide-vue-next';

    const selectedProject = ref(null);

    const projects = [
        {
            title: "Construcciones Luna",
            image: "/logos/projects/construccionesluna.webp",
            url: "https://construccionesluna.netlify.app/",
            description: "Sitio web personalizado para un ingeniero eléctrico, especializado en diseño y construcción.",
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
        // {
        //     title: "Simulador SkyCapital",
        //     image: "/logos/projects/simulacion.webp",
        //     url: "https://cotiza.skycapital.mx/simulador",
        //     description: "Plataforma de simulación de inversiones con cálculo de rendimientos y generación de reportes PDF.",
        //     workType: "Netlancers (empresa anterior)",
        //     client: "SkyCapital (cliente de Netlancers)",
        //     tech: [
        //         { logo: "/logos/html.webp", name: "HTML" },
        //         { logo: "/logos/css.webp", name: "CSS" },
        //         { logo: "/logos/javascript.webp", name: "JavaScript" },
        //         { logo: "/logos/php.webp", name: "PHP" },
        //         { logo: "/logos/mysql.webp", name: "MySQL" },
        //         { logo: "/logos/bootstrap.webp", name: "Bootstrap" },
        //         { logo: "/logos/laravel.webp", name: "Laravel" },
        //         { logo: "/logos/livewire.webp", name: "Livewire" }
        //     ]
        // },
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
    });

    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeydown);
        document.body.style.overflow = '';
    });
</script>

<template>
    <div class="page-content">
        <section class="projects">
            <div class="projects-container">
                <div class="projects-intro reveal" style="--d: 0ms">
                    <span class="eyebrow">Trabajo seleccionado</span>
                    <h1 class="projects-title">Proyectos</h1>
                    <p class="projects-sub">Algunos de los proyectos en los que he trabajado.</p>
                </div>

                <div class="projects-grid">
                    <article v-for="(project, index) in projects" :key="index"
                             class="project-card reveal"
                             :style="{ '--d': `${120 + index * 100}ms` }"
                             @click="openProject(index)">
                        <div class="project-image">
                            <img :src="project.image" :alt="project.title" />
                            <div class="project-overlay">
                                <span class="project-cta">
                                    Ver detalles
                                    <ArrowUpRight :size="14" :stroke-width="2" />
                                </span>
                            </div>
                        </div>
                        <div class="project-body">
                            <h3>{{ project.title }}</h3>
                            <p>{{ project.description }}</p>
                            <div class="project-tech">
                                <div v-for="(tech, i) in project.tech.slice(0, 4)" :key="i" class="tech-mini">
                                    <img :src="tech.logo" :alt="tech.name" />
                                    <span>{{ tech.name }}</span>
                                </div>
                                <span v-if="project.tech.length > 4" class="tech-more">
                                    +{{ project.tech.length - 4 }}
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- Modal (teleport para escapar del stacking context) -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="selectedProject !== null" class="modal-overlay" @click.self="closeProject">
                <div class="modal-backdrop" @click="closeProject"></div>
                <div class="modal-card">
                    <button @click="closeProject" class="modal-close" aria-label="Cerrar">
                        <X :size="18" :stroke-width="2" />
                    </button>

                    <div class="modal-image">
                        <img :src="projects[selectedProject].image" :alt="projects[selectedProject].title" />
                    </div>

                    <div class="modal-body">
                        <h2>{{ projects[selectedProject].title }}</h2>

                        <div class="modal-meta">
                            <div v-if="projects[selectedProject].workType" class="meta-row">
                                <span class="meta-label">Tipo</span>
                                <span class="meta-value">{{ projects[selectedProject].workType }}</span>
                            </div>
                            <div v-if="projects[selectedProject].client" class="meta-row">
                                <span class="meta-label">Cliente</span>
                                <span class="meta-value">{{ projects[selectedProject].client }}</span>
                            </div>
                        </div>

                        <p class="modal-description">{{ projects[selectedProject].description }}</p>

                        <div class="modal-section">
                            <span class="eyebrow">Tecnologías</span>
                            <div class="modal-tech">
                                <div v-for="(tech, i) in projects[selectedProject].tech" :key="i" class="tech-mini">
                                    <img :src="tech.logo" :alt="tech.name" />
                                    <span>{{ tech.name }}</span>
                                </div>
                            </div>
                        </div>

                        <a v-if="projects[selectedProject].url"
                           :href="projects[selectedProject].url"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="btn-neon">
                            Visitar sitio
                            <ExternalLink :size="14" :stroke-width="2" />
                        </a>
                    </div>
                </div>
            </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
    /* Entrance animation (pure CSS, runs once on mount) */
    @keyframes revealUp {
        from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
    }

    .reveal {
        opacity: 0;
        animation: revealUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        animation-delay: var(--d, 0ms);
        will-change: transform, opacity;
    }

    @media (prefers-reduced-motion: reduce) {
        .reveal {
            animation: none;
            opacity: 1;
        }
    }

    .projects {
        flex: 1;
        padding: 4.5rem 1rem 5.5rem;
        display: flex;
        justify-content: center;
    }

    @media (max-width: 639px) {
        .projects {
            padding-top: 1.5rem;
            padding-bottom: 4.5rem;
        }

        .projects-title {
            font-size: 1.35rem;
        }

        .projects-sub {
            font-size: 0.8125rem;
        }
    }

    .projects-container {
        width: 100%;
        max-width: 64rem;
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
    }

    .projects-intro {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
    }

    .projects-title {
        font-size: 1.625rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    }

    .projects-sub {
        color: var(--text-muted);
        font-size: 0.875rem;
        margin: 0;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.25rem;
    }

    .project-card {
        cursor: pointer;
        background: rgba(19, 19, 26, 0.6);
        backdrop-filter: blur(12px);
        border: 1px solid var(--border-subtle);
        border-radius: 1rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .project-card:hover {
        transform: translateY(-4px);
        border-color: rgba(163, 230, 53, 0.3);
        box-shadow: 0 0 32px rgba(163, 230, 53, 0.08);
    }

    .project-image {
        position: relative;
        height: 11rem;
        background: var(--bg-surface-2);
        overflow: hidden;
    }

    .project-image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 1.5rem;
        transition: transform 0.5s ease;
    }

    .project-card:hover .project-image img {
        transform: scale(1.05);
    }

    .project-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(10, 10, 15, 0.9), transparent 60%);
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 1rem;
    }

    .project-card:hover .project-overlay {
        opacity: 1;
    }

    .project-cta {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        background: var(--neon-lime);
        color: var(--bg-base);
        padding: 0.4rem 0.875rem;
        border-radius: 999px;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        font-weight: 600;
    }

    .project-body {
        padding: 1.25rem 1.25rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        flex: 1;
    }

    .project-body h3 {
        color: var(--text-primary);
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0;
    }

    .project-body > p {
        color: var(--text-secondary);
        font-size: 0.875rem;
        line-height: 1.6;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        margin-top: auto;
    }

    .tech-mini {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--border-subtle);
        border-radius: 999px;
        padding: 0.25rem 0.625rem;
    }

    .tech-mini img {
        width: 0.875rem;
        height: 0.875rem;
        object-fit: contain;
    }

    .tech-mini span {
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        color: var(--text-secondary);
    }

    .tech-more {
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        color: var(--text-muted);
        align-self: center;
    }

    /* Modal */
    .modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    .modal-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
    }

    .modal-card {
        position: relative;
        z-index: 1;
        background: var(--bg-surface);
        border: 1px solid var(--border-soft);
        border-radius: 1rem;
        width: 100%;
        max-width: 42rem;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
    }

    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 2;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid var(--border-subtle);
        color: var(--text-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        backdrop-filter: blur(8px);
    }

    .modal-close:hover {
        background: var(--neon-lime);
        color: var(--bg-base);
        border-color: var(--neon-lime);
    }

    .modal-image {
        height: 9rem;
        background: var(--bg-surface-2);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    .modal-image img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .modal-body {
        padding: 1.5rem 1.5rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .modal-body h2 {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    }

    .modal-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem 1.5rem;
    }

    .meta-row {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
    }

    .meta-label {
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .meta-value {
        color: var(--neon-lime);
        font-size: 0.875rem;
        font-weight: 500;
    }

    .modal-description {
        color: var(--text-secondary);
        font-size: 0.8125rem;
        line-height: 1.6;
        margin: 0;
    }

    .modal-section {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .modal-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
    }

    /* Modal scrollbar */
    .modal-card::-webkit-scrollbar {
        width: 4px;
    }

    .modal-card::-webkit-scrollbar-track {
        background: transparent;
    }

    .modal-card::-webkit-scrollbar-thumb {
        background-color: var(--neon-lime);
        border-radius: 3px;
    }

    /* Modal transition */
    .modal-enter-active,
    .modal-leave-active {
        transition: opacity 0.3s ease;
    }

    .modal-enter-active .modal-card,
    .modal-leave-active .modal-card {
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
    }

    .modal-enter-from .modal-card,
    .modal-leave-to .modal-card {
        opacity: 0;
        transform: translateY(20px) scale(0.96);
    }

    @media (min-width: 640px) {
        .projects {
            padding: 5rem 1.5rem 2.5rem;
        }

        .projects-title {
            font-size: 2.25rem;
        }

        .projects-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
        }

        .project-image {
            height: 11rem;
        }

        .modal-image {
            height: 18rem;
        }

        .modal-body {
            padding: 2rem 2rem 2.5rem;
        }

        .modal-body h2 {
            font-size: 1.5rem;
        }

        .modal-description {
            font-size: 0.9375rem;
            line-height: 1.65;
        }
    }
</style>

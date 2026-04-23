<script setup>
    import { ref } from 'vue';

    const techStack = [
        { name: 'Laravel', logo: '/logos/laravel.webp', years: 2 },
        { name: 'Yii', logo: '/logos/yii.webp', years: 1 },
        { name: 'Livewire', logo: '/logos/livewire.webp', years: 1 },
        { name: 'Vue.js', logo: '/logos/vuejs.webp', years: 1 },
        { name: 'JavaScript', logo: '/logos/javascript.webp', years: 3 },
        { name: 'Flutter / Dart', logo: '/logos/flutter.svg', years: 0.5 },
        { name: 'Tailwind CSS', logo: '/logos/tailwindcss.webp', years: 2 },
        { name: 'Bootstrap', logo: '/logos/bootstrap.webp', years: 3 },
        { name: 'HTML5', logo: '/logos/html.webp', years: 3 },
        { name: 'CSS3', logo: '/logos/css.webp', years: 3 },
        { name: 'MySQL', logo: '/logos/mysql.webp', years: 2 },
        { name: 'PostgreSQL', logo: '/logos/postgresql.webp', years: 1 },
        { name: 'SQL Server', logo: '/logos/sqlserver.webp', years: 1 },
        { name: 'API REST', logo: '/logos/restapi.webp', years: 2 },
        { name: 'Composer', logo: '/logos/composer.webp', years: 3 },
        { name: 'Git', logo: '/logos/git.webp', years: 3 },
        { name: 'GitHub', logo: '/logos/github.webp', years: 3 },
        { name: 'Bitbucket', logo: '/logos/bitbucket.webp', years: 1.5 },
        { name: 'DigitalOcean', logo: '/logos/digitalocean.svg', years: 0.5 },
        { name: 'Jira', logo: '/logos/jira.webp', years: 3 },
        { name: 'Figma', logo: '/logos/figma.webp', years: 0.5 }
    ];

    const activeSplash = ref(null);
    let splashTimer = null;

    const formatYears = (y) => {
        const val = Number.isInteger(y) ? y : y.toString().replace('.', ',');
        const label = y === 1 ? 'año' : 'años';
        return `${val} ${label}`;
    };

    const triggerSplash = (i) => {
        if (splashTimer) clearTimeout(splashTimer);
        activeSplash.value = null;
        // next tick via rAF to restart animation cleanly
        requestAnimationFrame(() => {
            activeSplash.value = i;
            splashTimer = setTimeout(() => {
                activeSplash.value = null;
                splashTimer = null;
            }, 5000);
        });
    };
</script>

<template>
    <div class="page-content">
        <section class="about">
            <div class="about-container">
                <!-- Header (centered, en sintonía con Projects/Contact) -->
                <div class="about-intro reveal" style="--d: 0ms">
                    <span class="eyebrow">Sobre mí</span>
                    <div class="profile-wrapper">
                        <img src="/images/perfil.webp" alt="Edgar Pech" class="profile-img" />
                    </div>
                    <h1 class="about-title">Edgar Pech</h1>
                    <p class="role">Ingeniero en Sistemas Computacionales</p>
                    <p class="muted">+2.5 años de experiencia en desarrollo web Full Stack</p>
                </div>

                <!-- Tech Stack -->
                <div class="about-section reveal" style="--d: 120ms">
                    <span class="eyebrow">Stack tecnológico</span>
                    <div class="tech-grid">
                        <button
                            v-for="(tech, i) in techStack"
                            :key="i"
                            type="button"
                            class="tech-pill"
                            :class="{ 'is-active': activeSplash === i }"
                            :title="tech.name"
                            @click="triggerSplash(i)">
                            <img :src="tech.logo" :alt="tech.name" />
                            <span>{{ tech.name }}</span>
                            <Transition name="splash">
                                <span v-if="activeSplash === i" class="tech-splash" aria-live="polite">
                                    {{ formatYears(tech.years) }}
                                </span>
                            </Transition>
                        </button>
                    </div>
                </div>

                <!-- Experience -->
                <div class="about-section reveal" style="--d: 220ms">
                    <span class="eyebrow">Experiencia</span>
                    <div class="glass-card">
                        <p>
                            Ingeniero en Sistemas Computacionales apasionado por crear soluciones eficientes.
                            Más de 2.5 años de experiencia desarrollando sistemas clave, alineando soluciones
                            técnicas con necesidades administrativas y financieras.
                        </p>
                    </div>
                </div>

                <!-- Objectives -->
                <div class="about-section reveal" style="--d: 320ms">
                    <span class="eyebrow">Objetivos</span>
                    <div class="glass-card">
                        <p>
                            Busco integrarme en equipos dinámicos donde pueda contribuir con mis habilidades
                            mientras aprendo de otros profesionales. Mi objetivo es enfrentar nuevos desafíos
                            que me permitan crecer técnicamente.
                        </p>
                        <p>
                            Comprometido con el aprendizaje continuo y la exploración de tecnologías emergentes.
                            Aspiro a documentar soluciones y compartir conocimiento en entornos donde la
                            curiosidad y la mejora continua sean valores fundamentales.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
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

    .about {
        flex: 1;
        padding: 4.5rem 1rem 5.5rem;
        display: flex;
        justify-content: center;
    }

    .about-container {
        width: 100%;
        max-width: 56rem;
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
    }

    .about-intro {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 0.5rem;
    }

    .about-title {
        font-size: 1.625rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0.25rem 0 0;
    }

    .profile-wrapper {
        position: relative;
        padding: 3px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--neon-lime), var(--neon-fuchsia));
    }

    .profile-img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        object-fit: cover;
        display: block;
        background: var(--bg-base);
        box-shadow: 0 0 24px rgba(163, 230, 53, 0.25);
    }

    .role {
        color: var(--neon-lime);
        font-family: var(--font-mono);
        font-size: 0.8125rem;
        margin: 0;
    }

    .muted {
        color: var(--text-muted);
        font-size: 0.8125rem;
        margin: 0;
    }

    .about-section {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .about-section .eyebrow {
        margin: 0;
    }

    .tech-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .tech-pill {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.2rem 0.5rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 0.625rem;
        transition: all 0.25s ease;
        backdrop-filter: blur(8px);
        cursor: pointer;
        font: inherit;
        color: inherit;
    }

    .tech-pill:hover {
        border-color: rgba(163, 230, 53, 0.3);
        transform: translateY(-2px);
        background: rgba(163, 230, 53, 0.04);
    }

    .tech-pill.is-active {
        border-color: rgba(163, 230, 53, 0.6);
        background: rgba(163, 230, 53, 0.08);
        box-shadow: 0 0 20px rgba(163, 230, 53, 0.2);
    }

    .tech-splash {
        position: absolute;
        bottom: calc(100% + 0.5rem);
        left: 50%;
        transform: translateX(-50%);
        background: rgba(19, 19, 26, 0.95);
        color: var(--neon-lime);
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        padding: 0.35rem 0.6rem;
        border-radius: 0.5rem;
        white-space: nowrap;
        pointer-events: none;
        border: 1px solid rgba(163, 230, 53, 0.35);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(163, 230, 53, 0.15);
        backdrop-filter: blur(10px);
        z-index: 5;
    }

    .tech-splash::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: rgba(19, 19, 26, 0.95);
        margin-top: -1px;
    }

    .tech-splash::before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: rgba(163, 230, 53, 0.35);
    }

    .splash-enter-active {
        animation: splashIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .splash-leave-active {
        animation: splashOut 0.25s ease-in forwards;
    }

    @keyframes splashIn {
        0% {
            opacity: 0;
            transform: translate(-50%, 6px) scale(0.7);
        }
        60% {
            opacity: 1;
            transform: translate(-50%, -2px) scale(1.08);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
        }
    }

    @keyframes splashOut {
        to {
            opacity: 0;
            transform: translate(-50%, -4px) scale(0.9);
        }
    }

    .tech-pill img {
        width: 1rem;
        height: 1rem;
        object-fit: contain;
    }

    .tech-pill span {
        color: var(--text-secondary);
        font-size: 0.75rem;
        font-family: var(--font-mono);
        font-weight: 500;
    }

    .glass-card p {
        color: var(--text-secondary);
        line-height: 1.5;
        font-size: 0.9rem;
        margin: 0;
    }

    .glass-card p + p {
        margin-top: 0.875rem;
    }

    @media (min-width: 640px) {
        .about {
            padding: 5rem 1.5rem 2.5rem;
        }

        .about-container {
            gap: 2rem;
        }

        .profile-img {
            width: 4rem;
            height: 4rem;
        }

        .about-title {
            font-size: 1.7rem;
        }

        .role {
            font-size: 0.9375rem;
        }

        .muted {
            font-size: 0.875rem;
        }
    }
</style>

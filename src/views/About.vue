<script setup>
    import { ref, onMounted, onUnmounted, nextTick } from 'vue';
    import { gsap } from 'gsap';
    import { FileText, Download, Eye, X, Sparkles, Briefcase, Target } from 'lucide-vue-next';

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

    // CV flip card
    const isFlipped = ref(false);
    const isPdfOpen = ref(false);
    const flipCard = ref(null);
    const docPaper = ref(null);
    const backContent = ref(null);

    const toggleFlip = () => {
        isFlipped.value = !isFlipped.value;
        if (!flipCard.value) return;
        gsap.to(flipCard.value, {
            rotateY: isFlipped.value ? 180 : 0,
            duration: 1,
            ease: 'power3.inOut'
        });
        // Subtle scale pulse mid-flip for tactile feel
        gsap.fromTo(flipCard.value,
            { scale: 1 },
            { scale: 0.95, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }
        );
    };

    const openPdf = () => {
        isPdfOpen.value = true;
        document.body.style.overflow = 'hidden';
    };
    const closePdf = () => {
        isPdfOpen.value = false;
        document.body.style.overflow = '';
    };

    const handleEsc = (e) => {
        if (e.key === 'Escape' && isPdfOpen.value) closePdf();
    };

    onMounted(() => {
        document.addEventListener('keydown', handleEsc);
        nextTick(() => {
            // Animate front-face content sliding in
            if (docPaper.value) {
                gsap.from(docPaper.value.querySelectorAll('.doc-summary-row'), {
                    x: -16,
                    autoAlpha: 0,
                    duration: 0.55,
                    stagger: 0.12,
                    ease: 'power3.out',
                    delay: 0.5
                });
                gsap.from(docPaper.value.querySelector('.doc-footer'), {
                    autoAlpha: 0,
                    y: 8,
                    duration: 0.5,
                    ease: 'power2.out',
                    delay: 1.05
                });
            }
        });
    });

    onUnmounted(() => {
        document.removeEventListener('keydown', handleEsc);
        if (splashTimer) clearTimeout(splashTimer);
        document.body.style.overflow = '';
    });
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
                    <div class="section-head">
                        <span class="eyebrow">Stack tecnológico</span>
                        <span class="section-hint">
                            <span class="hint-dot"></span>
                            Toca cada tecnología para ver mis años de experiencia
                        </span>
                    </div>
                    <div class="tech-grid">
                        <button
                            v-for="(tech, i) in techStack"
                            :key="i"
                            type="button"
                            class="tech-pill"
                            :class="{ 'is-active': activeSplash === i, 'is-hint': i === 0 && activeSplash === null }"
                            :title="`${tech.name} — toca para ver años`"
                            @click="triggerSplash(i)">
                            <img :src="tech.logo" :alt="tech.name" />
                            <span>{{ tech.name }}</span>
                            <span class="pill-indicator" aria-hidden="true"></span>
                            <Transition name="splash">
                                <span v-if="activeSplash === i" class="tech-splash" aria-live="polite">
                                    {{ formatYears(tech.years) }}
                                </span>
                            </Transition>
                        </button>
                    </div>
                </div>

                <!-- CV interactive card (replaces Experience + Objectives) -->
                <div class="about-section reveal" style="--d: 220ms">
                    <div class="section-head">
                        <span class="eyebrow">Currículum</span>
                    </div>

                    <div class="flip-scene">
                        <button
                            type="button"
                            class="flip-card"
                            ref="flipCard"
                            :aria-pressed="isFlipped"
                            aria-label="Vista previa interactiva del CV"
                            @click="toggleFlip">
                            <!-- Front: dark resume preview with experience + goals -->
                            <div class="flip-face flip-front">
                                <div class="doc-paper" ref="docPaper">
                                    <div class="doc-header">
                                        <span class="doc-eyebrow">
                                            <span class="doc-eyebrow-dot"></span>
                                            Resumen
                                        </span>
                                        <div class="doc-badge">
                                            <FileText :size="12" :stroke-width="2" />
                                            <span>CV</span>
                                        </div>
                                    </div>

                                    <div class="doc-summary">
                                        <div class="doc-summary-row">
                                            <div class="doc-summary-icon">
                                                <Briefcase :size="14" :stroke-width="2" />
                                            </div>
                                            <div class="doc-summary-text">
                                                <span class="doc-summary-label">Experiencia</span>
                                                <p class="doc-summary-value">
                                                    +2.5 años desarrollando soluciones Full Stack con Laravel, Vue y MySQL en sistemas administrativos, APIs y módulos en producción.
                                                </p>
                                            </div>
                                        </div>
                                        <div class="doc-summary-row">
                                            <div class="doc-summary-icon">
                                                <Target :size="14" :stroke-width="2" />
                                            </div>
                                            <div class="doc-summary-text">
                                                <span class="doc-summary-label">Objetivos</span>
                                                <p class="doc-summary-value">
                                                    Crecer hacia arquitecturas escalables y equipos remotos, aportando a productos con impacto real y dominando nuevas tecnologías.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="doc-footer">
                                        <Sparkles :size="12" :stroke-width="2" />
                                        <span>Toca para girar y abrir el PDF</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Back: actions -->
                            <div class="flip-face flip-back">
                                <div class="back-content" ref="backContent">
                                    <div class="back-icon">
                                        <FileText :size="30" :stroke-width="1.75" />
                                    </div>
                                    <h3>Mi CV completo</h3>
                                    <p>Experiencia, formación, stack técnico y proyectos en un PDF actualizado.</p>
                                    <div class="back-actions" @click.stop>
                                        <button type="button" class="btn-neon" @click="openPdf">
                                            <Eye :size="14" :stroke-width="2" />
                                            Abrir CV
                                        </button>
                                        <a href="/cv.pdf" download="EdgarPech-CV.pdf" class="btn-ghost">
                                            <Download :size="14" :stroke-width="2" />
                                            Descargar
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- PDF Modal -->
        <Teleport to="body">
            <Transition name="pdf">
                <div v-if="isPdfOpen" class="pdf-overlay" @click.self="closePdf">
                    <div class="pdf-backdrop" @click="closePdf"></div>
                    <div class="pdf-modal">
                        <header class="pdf-header">
                            <div class="pdf-title">
                                <FileText :size="16" :stroke-width="2" />
                                <span>Currículum — Edgar Pech</span>
                            </div>
                            <div class="pdf-actions">
                                <a href="/cv.pdf" download="EdgarPech-CV.pdf" class="pdf-btn" title="Descargar PDF">
                                    <Download :size="16" :stroke-width="2" />
                                </a>
                                <button type="button" class="pdf-btn pdf-close" @click="closePdf" aria-label="Cerrar">
                                    <X :size="18" :stroke-width="2" />
                                </button>
                            </div>
                        </header>
                        <div class="pdf-body">
                            <iframe :src="`/cv.pdf#view=FitH&toolbar=0`" title="CV PDF"></iframe>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
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

    @media (max-width: 639px) {
        .about {
            padding-top: 1.5rem;
            padding-bottom: 4.5rem;
        }

        .about-title {
            font-size: 1.35rem;
        }

        .about-sub {
            font-size: 0.8125rem;
        }
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
        gap: 0.2rem;
    }

    .about-title {
        font-size: 1.625rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0.25rem 0 0;
    }

    .profile-wrapper {
        position: relative;
        padding: 2px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--neon-lime), rgba(255, 255, 255, 0.2));
    }

    .profile-img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        object-fit: cover;
        display: block;
        background: var(--bg-base);
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

    .section-head {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        margin-bottom: 0.25rem;
    }

    .section-hint {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        color: var(--text-muted);
        letter-spacing: 0.01em;
    }

    .hint-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--neon-lime);
        box-shadow: 0 0 0 0 rgba(163, 230, 53, 0.6);
        animation: hintPulse 2s ease-out infinite;
    }

    @keyframes hintPulse {
        0% { box-shadow: 0 0 0 0 rgba(163, 230, 53, 0.55); }
        70% { box-shadow: 0 0 0 8px rgba(163, 230, 53, 0); }
        100% { box-shadow: 0 0 0 0 rgba(163, 230, 53, 0); }
    }

    .pill-indicator {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--neon-lime);
        opacity: 0.55;
        margin-left: 0.15rem;
        transition: opacity 0.25s ease, transform 0.25s ease;
    }

    .tech-pill:hover .pill-indicator {
        opacity: 1;
        transform: scale(1.3);
    }

    .tech-pill.is-active .pill-indicator {
        opacity: 0;
    }

    .tech-pill.is-hint {
        animation: pillNudge 2.6s ease-in-out 1.2s 2;
    }

    @keyframes pillNudge {
        0%, 70%, 100% { transform: translateY(0); border-color: var(--border-subtle); }
        80% { transform: translateY(-3px); border-color: rgba(163, 230, 53, 0.5); }
        90% { transform: translateY(0); }
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

    /* ============================================
       CV FLIP CARD
    ============================================ */
    .flip-scene {
        perspective: 1600px;
        width: 100%;
        max-width: 20rem;
        margin: 0; /* left-aligned like the stack section */
        transition: filter 0.2s ease;
    }

    .flip-scene:hover {
        filter: drop-shadow(0 0 10px rgba(163, 230, 53, 0.25));
    }

    .flip-card {
        position: relative;
        width: 100%;
        aspect-ratio: 5 / 6;
        max-height: 20rem;
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        transform-style: preserve-3d;
        font: inherit;
        color: inherit;
        will-change: transform;
    }

    /* IMPORTANT: no overflow:hidden here — it would flatten the 3D context
       and break backface-visibility (would mirror the front instead of
       showing the back). Border-radius lives on the inner .doc-paper /
       .back-content nodes. */
    .flip-face {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform-style: preserve-3d;
    }

    .flip-back {
        transform: rotateY(180deg);
    }

    /* Front: dark themed resume preview */
    .doc-paper {
        position: relative;
        width: 100%;
        height: 100%;
        background:
            radial-gradient(120% 80% at 0% 0%, rgba(163, 230, 53, 0.10), transparent 55%),
            radial-gradient(120% 80% at 100% 100%, rgba(255, 255, 255, 0.04), transparent 55%),
            linear-gradient(160deg, rgba(22, 22, 24, 0.96) 0%, rgba(13, 13, 15, 0.96) 100%);
        color: var(--text-primary);
        padding: 1.1rem 1.1rem 0.9rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        border: 1px solid var(--border-soft);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04);
        text-align: left;
        border-radius: 1rem;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }

    .doc-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.75rem;
    }

    .doc-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--font-mono);
        font-size: 0.65rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--neon-lime);
    }

    .doc-eyebrow-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--neon-lime);
        box-shadow: 0 0 10px var(--neon-lime);
    }

    .doc-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        background: var(--neon-lime);
        color: #0a0a0f;
        padding: 0.22rem 0.5rem;
        border-radius: 0.4rem;
        font-family: var(--font-mono);
        font-size: 0.6rem;
        font-weight: 700;
        letter-spacing: 0.08em;
    }

    .doc-summary {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        flex: 1;
    }

    .doc-summary-row {
        display: flex;
        gap: 0.65rem;
        align-items: flex-start;
    }

    .doc-summary-icon {
        flex-shrink: 0;
        width: 1.85rem;
        height: 1.85rem;
        border-radius: 0.5rem;
        background: rgba(163, 230, 53, 0.1);
        border: 1px solid rgba(163, 230, 53, 0.25);
        color: var(--neon-lime);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .doc-summary-text {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        min-width: 0;
    }

    .doc-summary-label {
        font-family: var(--font-mono);
        font-size: 0.62rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .doc-summary-value {
        margin: 0;
        font-size: 0.74rem;
        line-height: 1.45;
        color: var(--text-secondary);
    }

    .doc-footer {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--font-mono);
        font-size: 0.62rem;
        color: var(--text-muted);
        margin-top: auto;
        padding-top: 0.5rem;
        border-top: 1px dashed var(--border-subtle);
    }

    /* Back: action panel */
    .flip-back .back-content {
        height: 100%;
        background:
            radial-gradient(circle at 50% 0%, rgba(163, 230, 53, 0.18), transparent 60%),
            linear-gradient(160deg, rgba(19, 19, 26, 0.96), rgba(10, 10, 15, 0.96));
        border: 1px solid rgba(163, 230, 53, 0.3);
        border-radius: 1rem;
        padding: 1.25rem 1.1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 0.65rem;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 50px rgba(163, 230, 53, 0.06);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }

    .back-icon {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(163, 230, 53, 0.12);
        color: var(--neon-lime);
        border: 1px solid rgba(163, 230, 53, 0.3);
    }

    .back-content h3 {
        font-size: 1.0625rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    }

    .back-content > p {
        font-size: 0.8125rem;
        color: var(--text-muted);
        margin: 0;
        max-width: 18rem;
        line-height: 1.5;
    }

    .back-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
        max-width: 14rem;
        margin-top: 0.5rem;
    }

    .back-actions :deep(.btn-neon),
    .back-actions :deep(.btn-ghost),
    .back-actions .btn-neon,
    .back-actions .btn-ghost {
        width: 100%;
        justify-content: center;
        padding: 0.6rem 1rem;
        font-size: 0.8125rem;
        gap: 0.4rem;
    }

    /* ============================================
       PDF MODAL
    ============================================ */
    .pdf-overlay {
        position: fixed;
        inset: 0;
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    .pdf-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(10px);
    }

    .pdf-modal {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 56rem;
        height: min(90vh, 50rem);
        background: var(--bg-surface);
        border: 1px solid var(--border-soft);
        border-radius: 1rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
    }

    .pdf-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        background: rgba(10, 10, 15, 0.6);
        border-bottom: 1px solid var(--border-subtle);
    }

    .pdf-title {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--neon-lime);
        font-family: var(--font-mono);
        font-size: 0.8125rem;
        font-weight: 600;
    }

    .pdf-actions {
        display: flex;
        gap: 0.4rem;
    }

    .pdf-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 0.5rem;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--border-subtle);
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .pdf-btn:hover {
        background: rgba(163, 230, 53, 0.1);
        color: var(--neon-lime);
        border-color: rgba(163, 230, 53, 0.3);
    }

    .pdf-close:hover {
        background: rgba(255, 255, 255, 0.08);
        color: var(--text-primary);
        border-color: var(--border-soft);
    }

    .pdf-body {
        flex: 1;
        background: #525659;
        overflow: hidden;
    }

    .pdf-body iframe {
        width: 100%;
        height: 100%;
        border: none;
        display: block;
    }

    .pdf-enter-active,
    .pdf-leave-active {
        transition: opacity 0.3s ease;
    }

    .pdf-enter-active .pdf-modal,
    .pdf-leave-active .pdf-modal {
        transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .pdf-enter-from,
    .pdf-leave-to {
        opacity: 0;
    }

    .pdf-enter-from .pdf-modal,
    .pdf-leave-to .pdf-modal {
        opacity: 0;
        transform: translateY(20px) scale(0.96);
    }
</style>

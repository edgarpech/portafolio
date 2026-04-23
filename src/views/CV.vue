<script setup>
    import { onMounted } from 'vue';
    import { gsap } from 'gsap';
    import { Download, FileText } from 'lucide-vue-next';

    const cvPath = '/cv.pdf';

    onMounted(() => {
        gsap.from('.cv-fade', {
            y: 24, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2
        });
    });
</script>

<template>
    <div class="page-content">
        <section class="cv">
            <div class="cv-container">
                <div class="cv-intro cv-fade">
                    <span class="eyebrow">Currículum</span>
                    <h1 class="cv-title">Mi CV</h1>
                    <p class="cv-sub">Descarga o consulta mi currículum completo.</p>
                </div>

                <div class="cv-actions cv-fade">
                    <a :href="cvPath" download class="btn-neon">
                        <Download :size="14" :stroke-width="2" />
                        Descargar CV
                    </a>
                    <a :href="cvPath" target="_blank" rel="noopener" class="btn-ghost">
                        <FileText :size="14" :stroke-width="2" />
                        Abrir en pestaña
                    </a>
                </div>

                <div class="cv-frame cv-fade">
                    <iframe :src="cvPath" title="CV de Edgar Pech"></iframe>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .cv {
        flex: 1;
        padding: 4.5rem 1rem 5.5rem;
        display: flex;
        justify-content: center;
    }

    .cv-container {
        width: 100%;
        max-width: 56rem;
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
    }

    .cv-intro {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .cv-title {
        font-size: 1.625rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    }

    .cv-sub {
        color: var(--text-muted);
        font-size: 0.875rem;
        margin: 0;
    }

    .cv-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .cv-frame {
        background: rgba(19, 19, 26, 0.6);
        backdrop-filter: blur(12px);
        border: 1px solid var(--border-subtle);
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    }

    .cv-frame iframe {
        display: block;
        width: 100%;
        height: 65vh;
        min-height: 480px;
        border: none;
        background: var(--bg-surface);
    }

    @media (min-width: 640px) {
        .cv {
            padding: 5rem 1.5rem 2.5rem;
        }

        .cv-title {
            font-size: 2.25rem;
        }
    }
</style>

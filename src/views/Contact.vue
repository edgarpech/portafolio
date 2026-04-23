<script setup>
    import { onMounted } from 'vue';
    import { gsap } from 'gsap';
    import { MapPin, Mail, Phone, Github, Linkedin, Twitter, Instagram, Send } from 'lucide-vue-next';

    onMounted(() => {
        gsap.from('.contact-fade', {
            y: 24, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2
        });
    });
</script>

<template>
    <div class="page-content">
        <section class="contact">
            <div class="contact-container">
                <div class="contact-intro contact-fade">
                    <span class="eyebrow">Contacto</span>
                    <h1 class="contact-title">Trabajemos juntos</h1>
                    <p class="contact-sub">¿Tienes un proyecto en mente? Hablemos.</p>
                    <div class="availability">
                        <span class="dot"></span>
                        <span>Disponible para proyectos</span>
                    </div>
                </div>

                <div class="contact-grid">
                    <!-- Info -->
                    <div class="contact-info contact-fade">
                        <h3>Información</h3>

                        <div class="info-list">
                            <div class="info-item">
                                <div class="info-icon"><MapPin :size="16" :stroke-width="1.75" /></div>
                                <div>
                                    <span class="info-label">Ubicación</span>
                                    <span class="info-value">Chabihau, Yucatán, México</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon"><Mail :size="16" :stroke-width="1.75" /></div>
                                <div>
                                    <span class="info-label">Correo</span>
                                    <span class="info-value">pechcupul.inf1gc@gmail.com</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon"><Phone :size="16" :stroke-width="1.75" /></div>
                                <div>
                                    <span class="info-label">Teléfono</span>
                                    <span class="info-value">+52 (991) 107-8633</span>
                                </div>
                            </div>
                        </div>

                        <div class="socials-block">
                            <span class="eyebrow">Redes</span>
                            <div class="socials">
                                <a href="https://github.com/edgarpech" target="_blank" rel="noopener" class="social" aria-label="GitHub">
                                    <Github :size="16" :stroke-width="1.75" />
                                </a>
                                <a href="https://linkedin.com/in/pechedgar" target="_blank" rel="noopener" class="social" aria-label="LinkedIn">
                                    <Linkedin :size="16" :stroke-width="1.75" />
                                </a>
                                <a href="https://twitter.com/_edgarpech" target="_blank" rel="noopener" class="social" aria-label="Twitter">
                                    <Twitter :size="16" :stroke-width="1.75" />
                                </a>
                                <a href="https://instagram.com/_edgarpech" target="_blank" rel="noopener" class="social" aria-label="Instagram">
                                    <Instagram :size="16" :stroke-width="1.75" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Form -->
                    <div class="contact-form-wrapper contact-fade">
                        <h3>Envíame un mensaje</h3>
                        <form action="https://formspree.io/f/mkgzjeoy" method="POST" class="contact-form">
                            <div class="form-row">
                                <div class="form-field">
                                    <label for="firstName">Nombre</label>
                                    <input name="firstName" type="text" id="firstName" required />
                                </div>
                                <div class="form-field">
                                    <label for="lastName">Apellido</label>
                                    <input name="lastName" type="text" id="lastName" required />
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="email">Correo</label>
                                <input name="email" type="email" id="email" autocomplete="email" required />
                            </div>
                            <div class="form-field">
                                <label for="message">Mensaje</label>
                                <textarea name="message" id="message" rows="4" required></textarea>
                            </div>
                            <button type="submit" class="btn-neon submit-btn">
                                Enviar mensaje
                                <Send :size="14" :stroke-width="2" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .contact {
        flex: 1;
        padding: 4.5rem 1rem 5.5rem;
        display: flex;
        justify-content: center;
    }

    .contact-container {
        width: 100%;
        max-width: 64rem;
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
    }

    .contact-intro {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .contact-title {
        font-size: 1.625rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
    }

    .contact-sub {
        color: var(--text-muted);
        font-size: 0.875rem;
        margin: 0;
    }

    .availability {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
        padding: 0.4rem 0.875rem;
        border-radius: 999px;
        background: rgba(163, 230, 53, 0.08);
        border: 1px solid rgba(163, 230, 53, 0.2);
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--neon-lime);
    }

    .availability .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: var(--neon-lime);
        box-shadow: 0 0 8px var(--neon-lime);
        animation: pulse-soft 2s ease-in-out infinite;
    }

    .contact-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.25rem;
    }

    .contact-info,
    .contact-form-wrapper {
        background: rgba(19, 19, 26, 0.6);
        backdrop-filter: blur(12px);
        border: 1px solid var(--border-subtle);
        border-radius: 1rem;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .contact-info h3,
    .contact-form-wrapper h3 {
        color: var(--text-primary);
        font-size: 1.0625rem;
        font-weight: 600;
        margin: 0;
    }

    .info-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .info-item {
        display: flex;
        align-items: flex-start;
        gap: 0.875rem;
    }

    .info-icon {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 0.625rem;
        background: rgba(163, 230, 53, 0.08);
        color: var(--neon-lime);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .info-label {
        display: block;
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.125rem;
    }

    .info-value {
        display: block;
        color: var(--text-primary);
        font-size: 0.8125rem;
        word-break: break-word;
        overflow-wrap: anywhere;
    }

    .socials-block {
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        padding-top: 0.5rem;
        border-top: 1px solid var(--border-subtle);
    }

    .socials {
        display: flex;
        gap: 0.5rem;
    }

    .social {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 0.625rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-subtle);
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.25s ease;
    }

    .social:hover {
        background: var(--neon-lime);
        color: var(--bg-base);
        border-color: var(--neon-lime);
        transform: translateY(-2px);
        box-shadow: 0 0 16px rgba(163, 230, 53, 0.4);
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }

    @media (min-width: 480px) {
        .form-row {
            grid-template-columns: 1fr 1fr;
        }
    }

    .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
    }

    .form-field label {
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .form-field input,
    .form-field textarea {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 0.5rem;
        padding: 0.625rem 0.875rem;
        color: var(--text-primary);
        font-family: inherit;
        font-size: 0.875rem;
        transition: all 0.2s ease;
        resize: vertical;
    }

    .form-field input:focus,
    .form-field textarea:focus {
        outline: none;
        border-color: var(--neon-lime);
        background: rgba(163, 230, 53, 0.03);
        box-shadow: 0 0 0 3px rgba(163, 230, 53, 0.1);
    }

    .submit-btn {
        margin-top: 0.5rem;
        width: 100%;
        justify-content: center;
    }

    @media (min-width: 640px) {
        .contact {
            padding: 5rem 1.5rem 2.5rem;
        }

        .contact-title {
            font-size: 2.25rem;
        }

        .contact-grid {
            grid-template-columns: 1fr 1.2fr;
            gap: 1.25rem;
        }

        .contact-info,
        .contact-form-wrapper {
            padding: 1.75rem;
        }

        .submit-btn {
            width: auto;
            align-self: flex-start;
        }
    }
</style>

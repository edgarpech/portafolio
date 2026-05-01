<script setup>
    import { ref, reactive, onMounted, nextTick } from 'vue';
    import { gsap } from 'gsap';
    import { TextPlugin } from 'gsap/TextPlugin';
    import { MapPin, Mail, Phone, Github, Linkedin, Twitter, Instagram, Check, AlertTriangle, RotateCcw } from 'lucide-vue-next';

    gsap.registerPlugin(TextPlugin);

    onMounted(() => {
        gsap.from('.contact-fade', {
            y: 24, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2
        });
    });

    const form = reactive({ firstName: '', lastName: '', email: '', message: '' });
    const status = ref('idle'); // idle | sending | sent | error
    const errorMsg = ref('');
    const btnTextRef = ref(null);

    const FORMSPREE_ERRORS = {
        "Can't send an empty form": 'El formulario no puede estar vacío.',
        'Please include an email address': 'Por favor incluye un correo válido.',
        'This field is required': 'Este campo es obligatorio.',
        'Please include a valid email address': 'Por favor incluye un correo válido.',
    };

    const translateError = (msg) => {
        if (!msg) return 'Error al enviar. Intenta de nuevo.';
        for (const [en, es] of Object.entries(FORMSPREE_ERRORS)) {
            if (msg.includes(en)) return es;
        }
        return 'Error al enviar. Intenta de nuevo.';
    };

    const handleSubmit = async () => {
        if (status.value === 'sending') return;
        status.value = 'sending';

        // ── Text morph animation (GSAP TextPlugin) ───────────────────
        const textTL = gsap.timeline();
        if (btnTextRef.value) {
            textTL
                .to(btnTextRef.value, {
                    duration: 0.9,
                    text: { value: 'Enviando...', type: 'diff' },
                    ease: 'sine.in'
                })
                .to(btnTextRef.value, {
                    duration: 0.55,
                    text: { value: 'Enviando', type: 'diff' },
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true
                });
        }

        // ── Delay so the animation is visible before the request fires ─
        await new Promise(resolve => setTimeout(resolve, 3500));

        // ── Submit to Formspree via AJAX (no redirect) ───────────────
        try {
            const data = new FormData();
            data.append('firstName', form.firstName);
            data.append('lastName', form.lastName);
            data.append('email', form.email);
            data.append('message', form.message);

            const res = await fetch('https://formspree.io/f/mkgzjeoy', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: data
            });

            textTL.kill();

            if (res.ok) {
                if (btnTextRef.value) {
                    await gsap.to(btnTextRef.value, { duration: 0.4, text: '¡Enviado!', ease: 'none' });
                }
                status.value = 'sent';
                form.firstName = '';
                form.lastName = '';
                form.email = '';
                form.message = '';
            } else {
                const json = await res.json().catch(() => ({}));
                errorMsg.value = translateError(json.error);
                if (btnTextRef.value) btnTextRef.value.textContent = 'Reintentar';
                status.value = 'error';
            }
        } catch {
            textTL.kill();
            errorMsg.value = 'Sin conexión. Intenta de nuevo.';
            if (btnTextRef.value) btnTextRef.value.textContent = 'Reintentar';
            status.value = 'error';
        }
    };

    const retry = () => {
        status.value = 'idle';
        errorMsg.value = '';
        nextTick(() => {
            if (btnTextRef.value) btnTextRef.value.textContent = 'Enviar mensaje';
        });
    };
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

                        <!-- ── Success state ── -->
                        <div v-if="status === 'sent'" class="form-success">
                            <div class="success-icon">
                                <Check :size="28" :stroke-width="2.5" />
                            </div>
                            <p class="success-title">¡Mensaje enviado!</p>
                            <p class="success-sub">Te responderé lo antes posible.</p>
                            <button type="button" class="btn-ghost retry-btn" @click="retry">
                                <RotateCcw :size="13" :stroke-width="2" />
                                Enviar otro
                            </button>
                        </div>

                        <!-- ── Form ── -->
                        <form v-else class="contact-form" @submit.prevent="handleSubmit" novalidate>
                            <div class="form-row">
                                <div class="form-field">
                                    <label for="firstName">Nombre</label>
                                    <input v-model="form.firstName" name="firstName" type="text" id="firstName" required :disabled="status === 'sending'" />
                                </div>
                                <div class="form-field">
                                    <label for="lastName">Apellido</label>
                                    <input v-model="form.lastName" name="lastName" type="text" id="lastName" required :disabled="status === 'sending'" />
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="email">Correo</label>
                                <input v-model="form.email" name="email" type="email" id="email" autocomplete="email" required :disabled="status === 'sending'" />
                            </div>
                            <div class="form-field">
                                <label for="message">Mensaje</label>
                                <textarea v-model="form.message" name="message" id="message" rows="4" required :disabled="status === 'sending'"></textarea>
                            </div>

                            <!-- Error banner -->
                            <div v-if="status === 'error'" class="form-error">
                                <AlertTriangle :size="14" :stroke-width="2" />
                                {{ errorMsg }}
                            </div>

                            <button type="submit" class="btn-neon submit-btn"
                                :disabled="status === 'sending'">
                                <span ref="btnTextRef" class="btn-text">Enviar mensaje</span>
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

    @media (max-width: 639px) {
        .contact {
            padding-top: 1.5rem;
            padding-bottom: 4.5rem;
        }

        .contact-title {
            font-size: 1.35rem;
        }

        .contact-sub {
            font-size: 0.8125rem;
        }
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
        gap: 0.2rem;
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
        min-width: 11rem;
        height: 2.75rem;
        white-space: nowrap;
        overflow: hidden;
        transition: background 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
    }

    .btn-text {
        display: inline-block;
        width: 100%;
        text-align: center;
        pointer-events: none;
    }

    /* ── Success state ── */
    .form-success {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        padding: 2.5rem 1rem;
        text-align: center;
    }

    .success-icon {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        background: var(--neon-lime-soft);
        border: 2px solid var(--neon-lime);
        color: var(--neon-lime);
        display: grid;
        place-items: center;
        animation: successPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    @keyframes successPop {
        from { transform: scale(0.4); opacity: 0; }
        to   { transform: scale(1);   opacity: 1; }
    }

    .success-title {
        font-weight: 700;
        font-size: 1.125rem;
        color: var(--text-primary);
        margin: 0;
    }

    .success-sub {
        font-size: 0.8125rem;
        color: var(--text-muted);
        margin: 0;
    }

    .retry-btn {
        font-size: 0.8125rem;
        padding: 0.5rem 1rem;
        min-height: 0;
        margin-top: 0.5rem;
    }

    /* ── Error banner ── */
    .form-error {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        background: rgba(239, 68, 68, 0.08);
        border: 1px solid rgba(239, 68, 68, 0.25);
        color: #f87171;
        font-size: 0.8125rem;
        font-family: var(--font-mono);
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

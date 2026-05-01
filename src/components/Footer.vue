<script setup>
    import { Github, Linkedin, Mail } from 'lucide-vue-next';
</script>

<template>
    <footer class="site-footer">
        <div class="footer-inner">
            <div class="footer-brand">
                <span class="footer-logo">EP</span>
                <span class="footer-tag">Edgar Pech · Full Stack Developer</span>
            </div>
            <div class="footer-socials">
                <a href="https://github.com/edgarpech" target="_blank" rel="noopener" aria-label="GitHub">
                    <Github :size="18" :stroke-width="1.75" />
                </a>
                <a href="https://linkedin.com/in/pechedgar" target="_blank" rel="noopener" aria-label="LinkedIn">
                    <Linkedin :size="18" :stroke-width="1.75" />
                </a>
                <a href="mailto:pechcupul.inf1gc@gmail.com" aria-label="Email">
                    <Mail :size="18" :stroke-width="1.75" />
                </a>
            </div>
            <p class="footer-copy">&copy; {{ new Date().getFullYear() }} · Hecho con Vue + GSAP</p>
        </div>
    </footer>
</template>

<style scoped>
    .site-footer {
        flex-shrink: 0;
        border-top: 1px solid var(--border-subtle);
        background: rgba(10, 10, 15, 0.7);
        backdrop-filter: blur(16px) saturate(160%);
        -webkit-backdrop-filter: blur(16px) saturate(160%);
        padding: 0.65rem 1rem;
    }

    .footer-inner {
        max-width: 64rem;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        text-align: left;
    }

    .footer-brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .footer-logo {
        font-family: var(--font-mono);
        font-weight: 600;
        color: var(--neon-lime);
        font-size: 0.875rem;
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--neon-lime-soft);
        border-radius: 0.375rem;
    }

    .footer-tag {
        color: var(--text-secondary);
        font-size: 0.875rem;
    }

    .footer-socials {
        display: flex;
        gap: 0.5rem;
    }

    .footer-socials a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 0.5rem;
        color: var(--text-secondary);
        border: 1px solid var(--border-subtle);
        transition: all 0.25s ease;
    }

    .footer-socials a:hover {
        color: var(--neon-lime);
        border-color: var(--neon-lime);
        transform: translateY(-2px);
    }

    .footer-copy {
        color: var(--text-muted);
        font-size: 0.7rem;
        font-family: var(--font-mono);
        margin: 0;
    }

    @media (max-width: 539px) {
        .footer-tag,
        .footer-copy {
            display: none;
        }
        .footer-inner {
            justify-content: space-between;
        }
    }

    @media (min-width: 640px) {
        .footer-inner {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
        }
    }
</style>

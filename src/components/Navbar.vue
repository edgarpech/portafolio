<template>
    <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
        <div class="navbar-inner">
            <router-link v-for="link in links" :key="link.path" :to="link.path" class="nav-link"
                :class="{ 'nav-active': isActive(link.path) }">
                <component :is="link.icon" class="nav-icon" :size="20" :stroke-width="1.75" />
                <span class="nav-label">{{ link.name }}</span>
            </router-link>
        </div>
    </nav>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { House, UserRound, FolderKanban, Send } from 'lucide-vue-next';

    const route = useRoute();
    const isScrolled = ref(false);

    const links = [
        { path: '/', name: 'Inicio', icon: House },
        { path: '/sobre-mi', name: 'Sobre mí', icon: UserRound },
        { path: '/proyectos', name: 'Proyectos', icon: FolderKanban },
        { path: '/contacto', name: 'Contacto', icon: Send }
    ];

    const isActive = (path) => {
        return (route.path.startsWith(path) && path !== '/') || route.path === path;
    };

    const handleScroll = () => {
        isScrolled.value = window.scrollY > 20;
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>

<style scoped>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        display: flex;
        justify-content: center;
        padding: 1rem;
        transition: all 0.3s ease;
    }

    .navbar-inner {
        display: flex;
        gap: 0.25rem;
        padding: 0.4rem;
        border-radius: 999px;
        background: rgba(19, 19, 26, 0.7);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }

    .navbar-scrolled .navbar-inner {
        background: rgba(10, 10, 15, 0.85);
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    }

    .nav-link {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.5rem 1.1rem;
        border-radius: 999px;
        color: #a1a1aa;
        text-decoration: none;
        transition: color 0.25s ease, background 0.25s ease;
        white-space: nowrap;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
    }

    .nav-link:hover {
        color: #f5f5f7;
    }

    .nav-active {
        color: #0a0a0f;
        background: #a3e635;
        box-shadow: 0 0 20px rgba(163, 230, 53, 0.4);
    }

    .nav-active:hover {
        color: #0a0a0f;
    }

    .nav-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .nav-label {
        font-size: 0.875rem;
        font-weight: 500;
    }

    /* Mobile: floating dock */
    @media (max-width: 639px) {
        .navbar {
            top: auto;
            bottom: max(0.75rem, env(safe-area-inset-bottom));
            padding: 0 0.75rem;
        }

        .navbar-inner {
            width: 100%;
            max-width: 22rem;
            border-radius: 1.25rem;
            justify-content: space-around;
            padding: 0.5rem;
            gap: 0.25rem;
            background: rgba(10, 10, 15, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5),
                        0 0 0 1px rgba(255, 255, 255, 0.02) inset;
        }

        .nav-link {
            flex-direction: column;
            gap: 0.25rem;
            padding: 0.5rem 0.4rem;
            flex: 1;
            border-radius: 0.875rem;
            color: var(--text-muted);
        }

        .nav-link .nav-icon {
            transition: transform 0.25s ease;
        }

        .nav-active,
        .nav-active:hover,
        .nav-active:focus,
        .nav-active:active {
            background: rgba(163, 230, 53, 0.1) !important;
            color: #a3e635 !important;
            box-shadow: inset 0 0 0 1px rgba(163, 230, 53, 0.25) !important;
        }

        .nav-active .nav-icon {
            color: #a3e635;
            transform: translateY(-1px);
        }

        .nav-active::after {
            content: '';
            position: absolute;
            bottom: -0.5rem;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 4px;
            background: #a3e635;
            border-radius: 50%;
            box-shadow: 0 0 10px #a3e635;
        }

        .nav-label {
            font-size: 0.6rem;
            font-weight: 600;
            letter-spacing: 0.02em;
        }
    }
</style>

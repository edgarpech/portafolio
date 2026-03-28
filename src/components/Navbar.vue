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
        padding: 0.75rem 1rem;
        transition: all 0.3s ease;
    }

    .navbar-inner {
        display: flex;
        gap: 0.25rem;
        padding: 0.4rem;
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .navbar-scrolled .navbar-inner {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    }

    .nav-link {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.5rem 1.1rem;
        border-radius: 0.75rem;
        color: #64748b;
        text-decoration: none;
        transition: all 0.25s ease;
        white-space: nowrap;
    }

    .nav-link:hover {
        color: #1e293b;
        background: rgba(0, 0, 0, 0.04);
    }

    .nav-active {
        color: #4f46e5;
        background: rgba(79, 70, 229, 0.1);
    }

    .nav-active:hover {
        background: rgba(79, 70, 229, 0.15);
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

    /* Mobile: bottom bar */
    @media (max-width: 639px) {
        .navbar {
            top: auto;
            bottom: 0;
            padding: 0;
        }

        .navbar-inner {
            width: 100%;
            border-radius: 0;
            justify-content: space-around;
            padding: 0.5rem 0.25rem;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            gap: 0;
            box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.08);
            border-bottom: none;
        }

        .nav-link {
            flex-direction: column;
            gap: 0.15rem;
            padding: 0.35rem 0.5rem;
            flex: 1;
        }

        .nav-label {
            font-size: 0.6rem;
            font-weight: 600;
            letter-spacing: 0.02em;
        }
    }
</style>

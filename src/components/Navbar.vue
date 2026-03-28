<template>
    <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
        <div class="navbar-inner">
            <router-link v-for="link in links" :key="link.path" :to="link.path" class="nav-link"
                :class="{ 'nav-active': isActive(link.path) }">
                <span class="nav-icon" v-html="link.icon"></span>
                <span class="nav-label">{{ link.name }}</span>
            </router-link>
        </div>
    </nav>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const isScrolled = ref(false);

    const links = [
        {
            path: '/',
            name: 'Inicio',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M213.3815,109.61945,133.376,36.88436a8,8,0,0,0-10.76339.00036l-79.9945,72.73477A8,8,0,0,0,40,115.53855V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V115.53887A8,8,0,0,0,213.3815,109.61945Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>`
        },
        {
            path: '/sobre-mi',
            name: 'Sobre mí',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="16"></circle><path d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>`
        },
        {
            path: '/proyectos',
            name: 'Proyectos',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 256 256" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"><path d="M224 88V200a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8h53.33a8 8 0 0 1 4.8 1.6l27.74 20.8a8 8 0 0 0 4.8 1.6H216A8 8 0 0 1 224 88Z"/></svg>`
        },
        {
            path: '/contacto',
            name: 'Contacto',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16v-4a8 8 0 1 0-16 0v4m16 0v2a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2ZM4 16v2a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 2Z"/></svg>`
        }
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
        width: 22px;
        height: 22px;
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

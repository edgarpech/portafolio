<template>
    <nav class="fixed w-full z-50 transition-all duration-300 px-4 mt-3">	
        <div class="max-w-6xl mx-auto flex flex-wrap justify-center h-auto items-center">
            <div class="menu w-full sm:w-auto flex justify-center">
                <router-link v-for="link in links" :key="link.path" :to="link.path" class="link"
                :class="{ 'menu-active': isActive(link.path) }">
                    <span class="link-icon" v-html="link.icon"></span>
                    <span class="link-title">{{ link.name }}</span>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const links = [
        {
            path: '/',
            name: 'Inicio',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M213.3815,109.61945,133.376,36.88436a8,8,0,0,0-10.76339.00036l-79.9945,72.73477A8,8,0,0,0,40,115.53855V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V115.53887A8,8,0,0,0,213.3815,109.61945Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>`
        },
        {
            path: '/sobre-mi',
            name: 'Sobre mí',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="16"></circle><path d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>`
        },
        {
            path: '/proyectos',
            name: 'Proyectos',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 256 256" stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
                <path d="M224 88V200a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V56a8 8 0 0 1 8-8h53.33a8 8 0 0 1 4.8 1.6l27.74 20.8a8 8 0 0 0 4.8 1.6H216A8 8 0 0 1 224 88Z"/>
            </svg>`
        },
        {
            path: '/contacto',
            name: 'Contacto',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 16v-4a8 8 0 1 0-16 0v4m16 0v2a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2ZM4 16v2a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 2Z"/>
            </svg>`
        }
    ];

    const isActive = (path) => {
        return route.path.startsWith(path) && path !== '/' || route.path === path;
    };
</script>

<style scoped>
    .menu {
        padding: 0.5rem;
        background-color: #fff;
        position: relative;
        display: flex;
        justify-content: center;
        border-radius: 15px;
        box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.075);
    }

    .link {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 50px;
        border-radius: 8px;
        position: relative;
        z-index: 1;
        overflow: hidden;
        transform-origin: center left;
        transition: width 0.2s ease-in;
        text-decoration: none;
        color: black;
        margin: 0 0.2rem;
    }

    .link:before {
        position: absolute;
        z-index: -1;
        content: "";
        display: block;
        border-radius: 8px;
        width: 100%;
        height: 100%;
        top: 0;
        transform: translateX(100%);
        transition: transform 0.2s ease-in;
        transform-origin: center right;
        background-color: #eee;
    }

    .link:hover,
    .link:focus,
    .link.menu-active {
        outline: 0;
        width: 160px;
    }

    .link:hover:before,
    .link:focus:before,
    .link.menu-active:before,
    .link:hover .link-title,
    .link:focus .link-title,
    .link.menu-active .link-title {
        transform: translateX(0);
        opacity: 1;
    }

    .link-icon {
        width: 24px;
        height: 24px;
        display: block;
        flex-shrink: 0;
        left: 18px;
        position: absolute;
    }

    .link-title {
        transform: translateX(100%);
        transition: transform 0.2s ease-in;
        transform-origin: center right;
        display: block;
        text-align: center;
        text-indent: 28px;
        width: 100%;
        font-size: 1rem;
    }

    @media (max-width: 640px) {
        .link-title {
            font-size: 0.7rem; 
        }
    }
</style>

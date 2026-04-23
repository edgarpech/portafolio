<script setup>
    import { RouterView } from 'vue-router';
    import Navbar from './components/Navbar.vue';
    import Footer from './components/Footer.vue';
    import Aurora from './components/Aurora.vue';
</script>

<template>
    <Aurora />
    <Navbar />
    <main class="app-content">
        <RouterView v-slot="{ Component, route }">
            <transition name="page" mode="out-in">
                <component :is="Component" :key="route.path" />
            </transition>
        </RouterView>
        <Footer />
    </main>
</template>

<style>
    .app-content {
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        padding-bottom: 4.5rem;
        position: relative;
        z-index: 1;
    }

    @media (min-width: 640px) {
        .app-content {
            padding-bottom: 0;
        }
    }

    /* Page transitions */
    .page-enter-active,
    .page-leave-active {
        transition: opacity 0.35s ease, transform 0.35s ease;
    }
    .page-enter-from {
        opacity: 0;
        transform: translateY(12px);
    }
    .page-leave-to {
        opacity: 0;
        transform: translateY(-8px);
    }
</style>
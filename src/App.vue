<script setup>
    import { RouterView } from 'vue-router';
    import Navbar from './components/Navbar.vue';
    import Footer from './components/Footer.vue';
    import Aurora from './components/Aurora.vue';
</script>

<template>
    <Aurora />
    <Navbar />
    <div class="app-shell">
        <main class="scroll-area">
            <RouterView v-slot="{ Component, route }">
                <transition name="page" mode="out-in">
                    <component :is="Component" :key="route.path" />
                </transition>
            </RouterView>
        </main>
        <Footer />
    </div>
</template>

<style>
    .app-shell {
        position: relative;
        z-index: 1;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .scroll-area {
        flex: 1 1 0;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        scroll-behavior: smooth;
    }

    /* Mobile: nav becomes a floating FAB (bottom-right). No top padding needed.
       Footer stays at the bottom; FAB is positioned above it. */

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
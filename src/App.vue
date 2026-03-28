<script setup>
    import { RouterView } from 'vue-router';
    import Navbar from './components/Navbar.vue';
    import Footer from './components/Footer.vue';
</script>

<template>
    <Navbar />
    <main class="app-content">
        <RouterView />
        <Footer />
    </main>
</template>

<style>
    .app-content {
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        padding-bottom: 4.5rem;
    }

    @media (min-width: 640px) {
        .app-content {
            padding-bottom: 0;
        }
    }
</style>
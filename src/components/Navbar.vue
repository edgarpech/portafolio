<template>
    <nav 
      :class="isTop ? 'bg-transparent' : 'bg-white shadow-md'"
      class="fixed w-full z-50 transition-all duration-300 px-4"
    >
      <div class="max-w-6xl mx-auto flex justify-between h-16 items-center">
        <router-link 
          to="/" 
          class="text-xl font-bold text-gray-800 hover:text-green-500 transition-colors"
        >
          Edgar Pech
        </router-link>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-6">
          <router-link 
            v-for="link in links" 
            :key="link.path"
            :to="link.path"
            class="text-gray-700 hover:text-green-500 transition-colors"
            :class="{'text-green-500 font-medium': isActive(link.path)}"
          >
            {{ link.name }}
          </router-link>
        </div>
        
        <!-- Mobile Button -->
        <button @click="isOpen = !isOpen" class="md:hidden text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        
        <!-- Mobile Menu -->
        <div 
          v-if="isOpen" 
          class="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-2 px-4"
        >
          <router-link 
            v-for="link in links" 
            :key="link.path"
            :to="link.path"
            class="block py-2 text-gray-700 hover:text-green-500"
            :class="{'text-green-500 font-medium': isActive(link.path)}"
            @click="isOpen = false"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const links = [
    { path: '/sobre-mi', name: 'Sobre mí' },
    { path: '/proyectos', name: 'Proyectos' },
    { path: '/cv', name: 'CV' },
    { path: '/contacto', name: 'Contacto' },
  ];
  
  const isTop = ref(true);
  const isOpen = ref(false);
  
  const isActive = (path) => {
    return route.path.startsWith(path) && path !== '/' || route.path === path;
  };
  
  const handleScroll = () => {
    isTop.value = window.scrollY < 50;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
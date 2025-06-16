<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const particlesLoaded = container => {};
const currentPage = ref(0)
const activeTooltip = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })
const isAnimating = ref(false)

const technologies = {
  programming: [
    { name: 'PHP', logo: '/logos/php.webp', years: '2 años', color: 'bg-blue-900/20' },
    { name: 'Laravel', logo: '/logos/laravel.webp', years: '1.5 años', color: 'bg-red-600/20' },
    { name: 'JavaScript', logo: '/logos/javascript.webp', years: '1.5 años', color: 'bg-yellow-400/20' }
  ],
  markup: [
    { name: 'HTML5', logo: '/logos/html.webp', years: '2 años', color: 'bg-orange-500/20' },
    { name: 'CSS3', logo: '/logos/css.webp', years: '2 años', color: 'bg-blue-500/20' }
  ],
  frameworks: [
    { name: 'Livewire', logo: '/logos/livewire.webp', years: '1 año', color: 'bg-purple-600/20' },
    { name: 'Vue.js', logo: '/logos/vuejs.webp', years: '3 meses', color: 'bg-green-500/20' },
    { name: 'Tailwind CSS', logo: '/logos/tailwindcss.webp', years: '3 meses', color: 'bg-cyan-400/20' },
    { name: 'Bootstrap', logo: '/logos/bootstrap.webp', years: '1.5 años', color: 'bg-purple-600/20' }
  ],
  databases: [
    { name: 'MySQL', logo: '/logos/mysql.webp', years: '1.5 años', color: 'bg-blue-600/20' },
    { name: 'SQL Server', logo: '/logos/sqlserver.webp', years: '6 meses', color: 'bg-red-700/20' }
  ],
  tools: [
    { name: 'Git', logo: '/logos/git.webp', years: '1.5 años', color: 'bg-orange-600/20' },
    { name: 'GitHub', logo: '/logos/github.webp', years: '1 año', color: 'bg-gray-800/20' },
    { name: 'Bitbucket', logo: '/logos/bitbucket.webp', years: '1 año', color: 'bg-blue-700/20' },
    { name: 'Jira', logo: '/logos/jira.webp', years: '1 año', color: 'bg-blue-500/20' },
    { name: 'API REST', logo: '/logos/restapi.webp', years: '6 meses', color: 'bg-green-600/20' },
    { name: 'Composer', logo: '/logos/composer.webp', years: '1 año', color: 'bg-gray-700/20' },
    { name: 'Figma', logo: '/logos/figma.webp', years: '3 meses', color: 'bg-purple-500/20' }
  ]
}

const pages = [
  {
    title: "Experiencia",
    content: `Ingeniero en Sistemas Computacionales apasionado por crear soluciones eficientes. Más de 1.5 años de experiencia desarrollando sistemas clave, alineando soluciones técnicas con necesidades administrativas y financieras.

              Logros destacados:

                  • Desarrollo de un ERP Web basado en Intelisis, automatizando flujos contables/operativos.
                  • Sistema de puntos con SQL Server, optimizando gestión de recompensas.
                  • Plataforma de cotización y simulación para SkyCapital, integrando requerimientos comerciales.`
  },
  {
    title: "Tecnologías",
    type: "tech-grid",
    sections: [
      { title: "Lenguajes de Programación", items: technologies.programming },
      { title: "Lenguajes de Marcado y Estilo", items: technologies.markup },
      { title: "Frameworks y Librerías", items: technologies.frameworks }
    ]
  },
  {
    title: "Herramientas",
    type: "tech-grid",
    sections: [
      { title: "Bases de datos", items: technologies.databases },
      { title: "Control de versiones y servicios de alojamiento", items: technologies.tools.slice(0, 3) },
      { title: "Otras herramientas", items: technologies.tools.slice(3) }
    ]
  },
  {
    title: "Objetivos",
    content: "Actualmente freelance, buscando nuevos desafíos para seguir creciendo profesionalmente. Comprometido con el aprendizaje continuo y las mejores prácticas de desarrollo."
  }
]

const nextPage = () => {
  if (currentPage.value < pages.length - 1 && !isAnimating.value) {
    animatePageTransition('left', () => {
      currentPage.value++
    })
  }
}

const prevPage = () => {
  if (currentPage.value > 0 && !isAnimating.value) {
    animatePageTransition('right', () => {
      currentPage.value--
    })
  }
}

const showTooltip = (event, item, section, index) => {
  activeTooltip.value = { item, section, index }
  
  const logoElement = event.currentTarget
  const logoRect = logoElement.getBoundingClientRect()
  const cardRect = document.querySelector('.book').getBoundingClientRect()
  
  // Calcular posición relativa al book
  const x = logoRect.left - cardRect.left + (logoRect.width / 2)
  const y = logoRect.top - cardRect.top
  
  tooltipPosition.value = {
    x: Math.max(10, Math.min(x, cardRect.width - 150)), // 150 = ancho estimado del tooltip
    y: y - 10 // 10px arriba del logo
  }
}

const hideTooltip = () => {
  activeTooltip.value = null
}

const animatePageTransition = (direction, callback) => {
  isAnimating.value = true
  const bookContent = document.querySelector('.book-content')
  const animProps = {
    duration: 0.5,
    ease: "power2.inOut"
  }
  
  // Animación de salida
  gsap.to(bookContent, {
    x: direction === 'left' ? -100 : 100,
    opacity: 0,
    ...animProps,
    onComplete: () => {
      // Cambiar el contenido antes de la animación de entrada
      callback()
      
      // Resetear posición antes de animar de vuelta
      gsap.set(bookContent, {
        x: direction === 'left' ? 100 : -100,
        opacity: 0
      })
      
      // Animación de entrada
      gsap.to(bookContent, {
        x: 0,
        opacity: 1,
        ...animProps,
        onComplete: () => {
          isAnimating.value = false
        }
      })
    }
  })
}

onMounted(() => {
  gsap.from(".book", {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power3.out",
    delay: 1
  });
});
</script>

<template>
  <div>
    <vue-particles 
      id="tsparticles" 
      @particles-loaded="particlesLoaded" 
      url="/particles.json" 
    />
    
    <section class="min-h-screen flex flex-col justify-center items-center pt-26 md:pt-20 sm:pt-16">
      <div class="container mx-auto px-4">
        
        <div class="relative">
          <!-- Book con altura fija y foto integrada -->
          <div class="book bg-slate-800/70 rounded-xl shadow-2xl border border-slate-700/50 w-full h-[32rem] relative overflow-hidden">
            <!-- Foto de perfil dentro del book -->
            <div class="absolute top-4 right-4 z-10">
              <img 
                src="/images/perfil.webp"
                alt="Edgar Pech" 
                class="profile-img rounded-full w-14 h-14 md:w-16 md:h-16 object-cover shadow-lg border-3 border-indigo-500/50"
              >
            </div>
            
            <!-- Contenido principal -->
            <div class="book-content text-gray-300 h-full flex flex-col p-6">
              <h3 class="text-xl font-semibold mb-4 text-indigo-400">{{ pages[currentPage].title }}</h3>
              
              <!-- Contenido de texto simple -->
              <div v-if="pages[currentPage].type !== 'tech-grid'" class="flex-grow overflow-y-auto pr-2 scrollbar-custom">
                <p class="text-base md:text-xl leading-relaxed whitespace-pre-line">{{ pages[currentPage].content }}</p>
              </div>
              
              <!-- Grid de tecnologías -->
              <div v-else class="flex-grow overflow-y-auto pr-2 scrollbar-custom">
                <div v-for="(section, sectionIndex) in pages[currentPage].sections" :key="sectionIndex" class="mb-6">
                  <h4 class="text-sm font-medium mb-3 text-slate-400 pl-2">{{ section.title }}</h4>
                  <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                    <div 
                      v-for="(item, index) in section.items" 
                      :key="index"
                      class="relative"
                      @mouseenter="showTooltip($event, item, section.title, index)"
                      @mouseleave="hideTooltip"
                      @click="showTooltip($event, item, section.title, index)"
                    >
                      <div 
                        class="tech-logo p-2 rounded-lg flex flex-col items-center justify-center h-full transition-all hover:scale-105"
                        :class="item.color"
                      >
                        <img :src="item.logo" :alt="item.name" class="h-8 w-8 md:h-10 md:w-10 object-contain mb-1">
                        <span class="text-xs text-center text-slate-300 truncate w-full px-1">{{ item.name }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Navegación entre páginas - Versión corregida -->
              <div class="flex justify-between items-center mt-auto pt-4 border-t border-slate-700/50">
                <div class="flex-1 min-w-0">
                  <button 
                    @click="prevPage"
                    :disabled="currentPage === 0 || isAnimating"
                    class="arrow-btn w-full px-2 py-2 rounded-md transition-all text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis"
                    :class="{
                      'opacity-50 cursor-not-allowed': currentPage === 0 || isAnimating,
                      'hover:bg-slate-700/50': currentPage > 0 && !isAnimating,
                      'hover:cursor-pointer': currentPage > 0 && !isAnimating
                    }"
                  >
                    ← Anterior
                  </button>
                </div>
                
                <div class="px-2 flex-shrink-0">
                  <span class="text-sm text-slate-400 whitespace-nowrap">
                    Página {{ currentPage + 1 }} de {{ pages.length }}
                  </span>
                </div>
                
                <div class="flex-1 min-w-0">
                  <button 
                    @click="nextPage"
                    :disabled="currentPage === pages.length - 1 || isAnimating"
                    class="arrow-btn w-full px-2 py-2 rounded-md transition-all text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis"
                    :class="{
                      'opacity-50 cursor-not-allowed': currentPage === pages.length - 1 || isAnimating,
                      'hover:bg-slate-700/50': currentPage < pages.length - 1 && !isAnimating,
                      'hover:cursor-pointer': currentPage < pages.length - 1 && !isAnimating
                    }"
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            </div>

            <!-- Tooltip posicionado correctamente -->
            <div 
              v-if="activeTooltip"
              class="fixed md:absolute z-20 bg-slate-900 border border-slate-700 rounded-lg shadow-lg p-3 max-w-xs transition-opacity duration-200 pointer-events-none"
              :style="{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`,
                transform: 'translate(-50%, -100%)'
              }"
            >
              <div class="text-sm text-gray-300 font-semibold">{{ activeTooltip.item.name }}</div>
              <div class="text-xs text-slate-400">{{ activeTooltip.item.years }} de experiencia</div>
              <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-slate-900 border-r border-b border-slate-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.profile-img {
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.7);
}

.profile-img:hover {
  transform: scale(1.15);
  box-shadow: 0 0 25px rgba(99, 102, 241, 0.9);
}

#tsparticles {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

.book {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.book-content {
  backface-visibility: hidden;
  transform-origin: left center;
}

.arrow-btn:not(:disabled):hover {
  transform: translateY(-2px);
  text-shadow: 0 0 8px rgba(165, 180, 252, 0.6);
}

.tech-logo {
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 5.5rem;
}

.tech-logo:hover {
  transform: scale(1.08);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

/* Estilos para el scrollbar personalizado */
.scrollbar-custom {
  scrollbar-width: thin;
  scrollbar-color: #6366f1 #1e293b;
}

/* Para navegadores WebKit (Chrome, Safari, Edge) */
.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: #1e293b;
  border-radius: 4px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #6366f1;
  border-radius: 4px;
  border: 1px solid #1e293b;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background-color: #818cf8;
}

/* Ajustes responsivos mejorados */
@media (max-width: 1024px) {
  .book {
    height: 34rem;
  }
}

@media (max-width: 768px) {
  .book {
    height: 36rem;
  }
  
  .profile-img {
    width: 3.5rem;
    height: 3.5rem;
  }
  
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .book {
    height: 38rem;
  }
  
  .grid-cols-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .tech-logo {
    min-height: 5rem;
  }
  
  .tech-logo img {
    height: 1.75rem;
    width: 1.75rem;
  }
  
  /* Ajustes específicos para la paginación en móviles */
  .arrow-btn {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .profile-img {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  /* Más ajustes para pantallas muy pequeñas */
  .book-content {
    padding: 1rem;
  }
  
  .arrow-btn {
    padding: 0.25rem;
    font-size: 0.75rem;
  }
}
</style>
<script setup>
    import { ref, onMounted, nextTick } from 'vue'
    import { gsap } from 'gsap'
    import { Draggable } from 'gsap/Draggable'
    
    const particlesLoaded = container => {};

    // Registrar plugins GSAP
    gsap.registerPlugin(Draggable);

    // Refs para elementos DOM
    const bookContent = ref(null);
    const itemList = ref(null);
    const spacer = ref(document.createElement("div"));
    const items = ref([]);
    let itemIndex = ref(null);

    // Datos de los proyectos
    const projects = [
        {
            title: "Construcciones Luna",
            image: "/logos/projects/construccionesluna.webp",
            url: "https://construccionesluna.com.mx",
            description: "Sitio web personalizado para un ingeniero eléctrico independiente, especializado en diseño y construcción de instalaciones eléctricas.",
            workType: "Freelance",
            client: "Gerardo Bernal",
            tech: [
                { logo: "/logos/html.webp", name: "HTML" },
                { logo: "/logos/css.webp", name: "CSS" },
                { logo: "/logos/javascript.webp", name: "JavaScript" },
                { logo: "/logos/vuejs.webp", name: "Vue.js" },
                { logo: "/logos/tailwindcss.webp", name: "Tailwind CSS" }
            ]
        },
        {
            title: "Simulador SkyCapital",
            image: "/logos/projects/simulacion.webp",
            url: "https://cotiza.skycapital.mx/simulador",
            description: "Plataforma de simulación de inversiones con cálculo de rendimientos y generación de reportes PDF.",
            workType: "Netlancers (empresa anterior)",
            client: "SkyCapital (cliente de Netlancers)",
            tech: [
                { logo: "/logos/html.webp", name: "HTML" },
                { logo: "/logos/css.webp", name: "CSS" },
                { logo: "/logos/javascript.webp", name: "JavaScript" },
                { logo: "/logos/php.webp", name: "PHP" },
                { logo: "/logos/mysql.webp", name: "MySQL" },
                { logo: "/logos/bootstrap.webp", name: "Bootstrap" },
                { logo: "/logos/laravel.webp", name: "Laravel" },
                { logo: "/logos/livewire.webp", name: "Livewire" }
            ]
        }
    ];

    function activate(index) {
        if (!items.value[index] || itemIndex.value !== null) return;
        
        const item = items.value[index];
        const img = item.querySelector(".item-img");
        const content = item.querySelector(".item-content");
        const originalRect = item.getBoundingClientRect();
        
        // Crear spacer si no existe
        if (!spacer.value.parentNode) {
            spacer.value.style.cssText = window.getComputedStyle(item).cssText;
            item.parentNode.insertBefore(spacer.value, item);
        }
        
        // Mover el item al contenedor principal
        bookContent.value.appendChild(item);
        item.classList.add("active");
        
        // Ocultar imagen principal
        gsap.set(img, { opacity: 0 });
        
        // Guardar posición original
        item._originalRect = originalRect;
        
        // Configurar estado inicial para animación
        gsap.set(item, {
            position: 'fixed',
            top: originalRect.top,
            left: originalRect.left,
            width: originalRect.width,
            height: originalRect.height,
            margin: 0,
            zIndex: 1000,
            transformOrigin: 'center center'
        });
        
        // Animación de agrandamiento
        gsap.to(item, {
            duration: 0.7,
            ease: "power2.inOut",
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 0,
            onComplete: () => {
                gsap.set(content, { opacity: 1 });
            }
        });
        
        itemIndex.value = index;
    }

    function deactivate() {
        if (itemIndex.value === null) return;
        
        const item = items.value[itemIndex.value];
        const img = item.querySelector(".item-img");
        const content = item.querySelector(".item-content");
        const originalRect = item._originalRect;
        
        if (!originalRect) return;
        
        // Ocultar contenido primero
        gsap.to(content, { 
            opacity: 0, 
            duration: 0.3,
            ease: "power2.in"
        });
        
        // Mostrar imagen principal
        gsap.set(img, { opacity: 1 });
        
        // Animación de achicamiento
        gsap.to(item, {
            duration: 0.7,
            ease: "power2.inOut",
            top: originalRect.top,
            left: originalRect.left,
            width: originalRect.width,
            height: originalRect.height,
            borderRadius: '12px',
            onComplete: () => {
                // Mover el item de vuelta a su posición original
                if (spacer.value && spacer.value.parentNode) {
                    spacer.value.parentNode.insertBefore(item, spacer.value);
                    spacer.value.parentNode.removeChild(spacer.value);
                }
                
                item.classList.remove("active");
                gsap.set(item, { clearProps: "all" });
                gsap.set(img, { clearProps: "all" });
                gsap.set(content, { clearProps: "all", opacity: 0 });
            }
        });
        
        itemIndex.value = null;
    }

    // Función para calcular los límites del draggable
    function calculateBounds() {
        if (!bookContent.value || !itemList.value) return;
        
        const containerWidth = bookContent.value.offsetWidth;
        const listWidth = itemList.value.scrollWidth;
        
        return {
            minX: containerWidth - listWidth,
            maxX: 0
        };
    }

    // Función para animación de entrada
    function animatePageIn() {
        gsap.from(".itemList", {
            duration: 1.2,
            y: 40,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.3
        });
    }

    onMounted(async () => {
        await nextTick();
        
        // Inicializar elementos
        items.value = gsap.utils.toArray(".item");
        
        // Función para inicializar/actualizar Draggable
        const initDraggable = () => {
            if (bookContent.value && itemList.value && items.value.length > 0) {
                // Eliminar Draggable existente si hay uno
                if (itemList.value._gsap) {
                    Draggable.get(itemList.value).kill();
                }
                
                try {
                    Draggable.create(itemList.value, {
                        type: "x",
                        edgeResistance: 0.5,
                        zIndexBoost: false,
                        onClick(e) {
                            const item = e.target.closest(".item");
                            if (item && !e.target.closest(".close-btn")) {
                                activate(items.value.indexOf(item));
                            }
                        },
                        inertia: true,
                        allowContextMenu: false,
                        bounds: calculateBounds(),
                        onDragEnd: function() {
                            this.updateBounds(calculateBounds());
                        }
                    });
                } catch (error) {
                    console.error("Draggable initialization error:", error);
                }
            }
        };
        
        // Inicializar Draggable
        initDraggable();
        
        // Actualizar en caso de redimensionamiento
        window.addEventListener('resize', initDraggable);

        animatePageIn();
    });
</script>

<template>
    <div>
        <vue-particles id="tsparticles" @particles-loaded="particlesLoaded" url="/particles.json"/>
        
        <section class="min-h-screen flex flex-col justify-center items-center pt-26 md:pt-20 sm:pt-16 px-4">
            <div class="container mx-auto">
                <div class="relative">
                    <div ref="bookContent" class="w-full h-[32rem] relative overflow-hidden">
                        <div class="h-full flex flex-col justify-center sm:p-6">
                            <ul ref="itemList" class="itemList flex p-0 m-0 list-none gap-2 cursor-grab touch-action-pan-y justify-evenly">
                                <li class="item flex flex-col justify-between items-center relative w-60 h-80 rounded-xl bg-white shadow-md shrink-0 transition-transform duration-200 will-change-transform overflow-hidden p-6 box-border"
                                v-for="(project, index) in projects" 
                                :key="index">
                                    <img class="item-img w-full h-40 object-contain mb-4 transition-opacity duration-300" 
                                    :src="project.image" 
                                    :alt="project.title">

                                    <div class="item-description w-full text-center text-gray-800 flex flex-col items-center justify-center flex-grow">
                                        <h1 class="uppercase text-sm sm:text-base m-0 mb-4 leading-tight">
                                            {{ project.title.split(' ')[0] }}<br v-if="project.title.split(' ').length > 1">{{ project.title.split(' ').slice(1).join(' ') }}
                                        </h1>
                                    </div>

                                    <div class="item-content opacity-0 w-full h-full hidden flex-col relative">
                                        <button class="close-btn absolute top-6 right-6 w-10 h-10 border-none bg-gray-400 bg-opacity-10 rounded-full cursor-pointer z-10 transition-all duration-200 flex items-center justify-center p-0 m-0"
                                        @click="deactivate">
                                            <span class="close-icon flex items-center justify-center w-full h-full text-3xl leading-none relative -top-1">×</span>
                                        </button>

                                        <div class="content-wrapper flex flex-col h-full gap-8 pt-12 md:pt-0 md:flex-row md:items-center md:justify-between">
                                            <img class="content-img w-full max-h-[40vh] object-contain rounded-lg mt-8 md:mt-0 md:w-[45%] md:max-h-[70vh] md:order-2 md:ml-8" 
                                            :src="project.image" 
                                            :alt="project.title">

                                            <div class="content-info flex-1 flex flex-col gap-6 pt-4">
                                                <h2 class="text-2xl sm:text-3xl m-0 text-gray-800 text-left">
                                                    {{ project.title }}
                                                </h2>

                                                <div class="project-meta flex flex-col gap-1 text-left">
                                                    <span class="text-gray-600" v-if="project.workType">
                                                        <strong>Tipo:</strong> {{ project.workType }}
                                                    </span>
                                                    <span class="text-gray-600" v-if="project.client">
                                                        <strong>Cliente:</strong> {{ project.client }}
                                                    </span>
                                                </div>

                                                <a class="project-url text-blue-600 no-underline break-all text-left text-lg hover:underline"
                                                v-if="project.url" 
                                                :href="project.url" 
                                                target="_blank">
                                                    Visitar sitio web <span class="text-blue-500">→</span>
                                                </a>

                                                <p class="project-description text-gray-600 leading-relaxed m-0 text-left text-lg">
                                                    {{ project.description }}
                                                </p>

                                                <div class="content-tech mb-2">
                                                    <h3 class="text-xl m-0 mb-2 text-gray-800 text-left">
                                                        Tecnologías utilizadas:
                                                    </h3>
                                                    <div class="tech-logos flex flex-wrap gap-4 justify-start">
                                                        <img class="h-7 max-w-8 object-contain"
                                                        v-for="(tech, techIndex) in project.tech" 
                                                        :key="techIndex"
                                                        :src="tech.logo" 
                                                        :alt="tech.name" 
                                                        :title="tech.name">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>  
                </div>  
            </div>
        </section>
    </div>  
</template>

<style>
    /* Scrollbar personalizada para el item activo */
    .item.active::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    .item.active::-webkit-scrollbar-track {
        background: #1e293b;
        border-radius: 4px;
    }

    .item.active::-webkit-scrollbar-thumb {
        background-color: #6366f1;
        border-radius: 4px;
        border: 1px solid #1e293b;
    }

    .item.active::-webkit-scrollbar-thumb:hover {
        background-color: #818cf8;
    }

    /* Estados activos e hover */
    .item:not(.active):hover {
        transform: translateY(-5px);
    }

    .item.active {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        cursor: default;
        overflow-y: auto;
        padding: 2rem;
        transform: none !important;
        border-radius: 0;
        scrollbar-width: thin;
        scrollbar-color: #6366f1 #1e293b;
    }

    /* Ocultar elementos cuando el item está activo */
    .item.active .item-img {
        display: none;
    }

    .item.active .item-description {
        display: none;
    }

    .item.active .item-content {
        display: flex;
    }

    /* Efecto hover para el botón de cerrar */
    .close-btn:hover {
        background: rgba(0,0,0,0.2);
    }

    /* Responsive para móviles */
    @media (max-width: 639px) {
        .book {
            height: 28rem;
        }
        
        .item-list {
            gap: 1rem;
            padding: 0 1rem;
        }
        
        .item {
            width: 200px;
            height: 280px;
            padding: 1rem;
        }
        
        .item.active {
            padding: 1.5rem;
        }
        
        .content-wrapper {
            gap: 1.5rem;
            padding-top: 3rem;
        }
        
        .content-info h2 {
            font-size: 1.8rem;
        }
        
        .project-description {
            font-size: 1rem;
        }
        
        .close-btn {
            top: 1rem;
            right: 1rem;
        }
        
        .content-img {
            margin-top: 1rem;
        }
    }
</style>
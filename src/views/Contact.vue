<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const particlesLoaded = container => {}

// Form data ref
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

// Form submission
const submitForm = () => {
  // Animation when submitting
  const tl = gsap.timeline()
  tl.to('.submit-btn', {
    scale: 0.9,
    duration: 0.1,
    ease: 'power2.in'
  })
  tl.to('.submit-btn', {
    scale: 1,
    duration: 0.3,
    ease: 'elastic.out(1, 0.5)'
  })
  
  // Here you would normally send the form data to your backend
  console.log('Form submitted:', formData.value)
  
  // Reset form
  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
}

// Initialize animations when component mounts
onMounted(() => {
  // Initial animation
  gsap.from('.contact-card', {
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  
  gsap.from('.contact-form', {
    x: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.2
  })
  
  // Hover animations for contact info items
  const contactItems = document.querySelectorAll('.contact-item')
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        x: 5,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })
  
  // Input focus animations
  const inputs = document.querySelectorAll('.form-input')
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out'
      })
    })
    input.addEventListener('blur', () => {
      gsap.to(input, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      })
    })
  })
})
</script>

<template>
  <div>
    <vue-particles id="tsparticles" @particles-loaded="particlesLoaded" url="/particles.json"/>
    
    <section class="min-h-screen flex flex-col justify-center items-center pt-26 md:pt-24 sm:pt-20 px-4">
      <div class="container mx-auto">
        <div class="relative">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <!-- Contact Info Card (Left) -->
            <div class="contact-card bg-white/10 backdrop-blur-xs rounded-xl p-8 shadow-lg border border-white/20">
              <h3 class="text-2xl font-semibold mb-6 text-white">Contáctame</h3>
              
              <div class="space-y-5">
                <div class="contact-item flex items-start gap-4">
                  <div class="bg-blue-500/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-300">Dirección</h4>
                    <p class="text-white">97426, Chabihau, Yucatán, Méx.</p>
                  </div>
                </div>
                
                <div class="contact-item flex items-start gap-4">
                  <div class="bg-purple-500/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-300">Correo</h4>
                    <p class="text-white">pechcupul.inf1gc@gmail.com</p>
                  </div>
                </div>
                
                <div class="contact-item flex items-start gap-4">
                  <div class="bg-green-500/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-300">Teléfono móvil</h4>
                    <p class="text-white">+52 (991) 107-8633</p>
                  </div>
                </div>
                
                <div class="pt-4">
                  <h4 class="font-medium text-gray-300 mb-4">Redes Sociales</h4>
                  <div class="flex flex-wrap gap-4">
                    <a href="https://github.com/edgarpech" target="_blank" class="social-icon bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    
                    <a href="https://linkedin.com/in/pechedgar" target="_blank" class="social-icon bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    
                    <a href="https://twitter.com/_edgarpech" target="_blank" class="social-icon bg-blue-400 hover:bg-blue-500 p-3 rounded-full transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    
                    <a href="https://instagram.com/_edgarpech" target="_blank" class="social-icon bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    
                    <a href="https://facebook.com/edgarp3ch" target="_blank" class="social-icon bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Contact Form (Right) -->
            <div class="contact-form backdrop-blur-xs rounded-xl p-8 shadow-lg border border-white/20">
              <h3 class="text-2xl font-semibold mb-6 text-white">Envíame un mensaje</h3>
              
              <form @submit.prevent="submitForm" class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                    <input 
                      v-model="formData.firstName"
                      type="text" 
                      id="firstName" 
                      class="form-input w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                  </div>
                  
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-300 mb-1">Apellido</label>
                    <input 
                      v-model="formData.lastName"
                      type="text" 
                      id="lastName" 
                      class="form-input w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                  </div>
                </div>
                
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Correo</label>
                  <input 
                    v-model="formData.email"
                    type="email" 
                    id="email" 
                    autocomplete="email"
                    class="form-input w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                </div>
                
                <div>
                  <label for="message" class="block text-sm font-medium text-gray-300 mb-1">Mensaje</label>
                  <textarea 
                    v-model="formData.message"
                    id="message" 
                    rows="4"
                    class="form-input w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  class="submit-btn w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
/* Additional custom styles */
.contact-item {
  transition: all 0.3s ease;
}

.social-icon {
  transition: transform 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px) scale(1.1);
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
</style>
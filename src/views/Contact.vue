<template>
    <section class="pt-16 min-h-screen">
      <h2 
        class="text-4xl font-bold mb-4 text-center text-gray-800 hover:text-green-500 transition-colors"
        @mouseover="animateText"
      >
        Contáctame
      </h2>
      
    </section>
  </template>
  
  <script setup>
  const animateText = (e) => {
    if (typeof window !== 'undefined') {
      const letters = e.target.textContent.split('');
      e.target.innerHTML = letters.map(letter => 
        `<span class="hover-letter">${letter}</span>`
      ).join('');
    }
  };
  </script>
  
  <style>
  .hover-letter {
    display: inline-block;
    transition: transform 0.3s ease;
  }
  .hover-letter:hover {
    transform: translateY(-10px) rotate(10deg);
    color: #42b883;
  }
  </style>
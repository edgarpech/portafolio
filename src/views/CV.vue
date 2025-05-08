<template>
  <section class="pt-16 min-h-screen">
    <h2 class="text-4xl font-bold mb-8 text-center">Mi CV</h2>
    <div class="flex justify-center">
      <a 
        :href="cvPath" 
        download
        class="btn bg-blue-500 hover:bg-blue-600 mb-8"
      >
        Descargar CV
      </a>
    </div>
    <div class="shadow-xl rounded-lg overflow-hidden">
      <iframe 
        :src="cvPath" 
        class="w-full h-[600px] border-none"
        data-aos="zoom-in"
      ></iframe>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cvPath: null // Initialize cvPath as null
    };
  },
  created() {
    this.cvPath = '/cv.pdf'; // Use the public folder path for the CV
  }
};
</script>
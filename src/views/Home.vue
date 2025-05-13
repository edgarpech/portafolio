<template>
  <main class="min-h-screen flex flex-col justify-center items-center pt-16 bg-white">
    <h1 
    class="text-6xl font-bold mb-4 text-gray-800"
    data-aos="fade-up"
    >
    Hola, soy Edgar Pech
    </h1>
    <p 
    class="text-2xl mb-8 text-gray-600"
    data-aos="fade-up"
    data-aos-delay="200"
    >
    Desarrollador Web 
    </p>
    <router-link 
    to="/proyectos"
    class="button"
    style="--clr: #7808d0"
    data-aos="fade-up"
    data-aos-delay="400"
    >
    <span class="button__icon-wrapper">
      <svg
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="button__icon-svg"
      width="10"
      >
      <path
        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
        fill="currentColor"
      ></path>
      </svg>

      <svg
      viewBox="0 0 14 15"
      fill="none"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
      class="button__icon-svg button__icon-svg--copy"
      >
      <path
        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
        fill="currentColor"
      ></path>
      </svg>
    </span>
    Mis proyectos
    </router-link>
  </main>
</template>

<style scoped>
.button {
  line-height: 1;
  text-decoration: none;
  display: inline-flex;
  border: none;
  cursor: pointer;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--clr);
  color: #fff;
  border-radius: 10rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  padding-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s;
}

.button__icon-wrapper {
  flex-shrink: 0;
  width: 25px;
  height: 25px;
  position: relative;
  color: var(--clr);
  background-color: #fff;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.button:hover {
  background-color: #000;
}

.button:hover .button__icon-wrapper {
  color: #000;
}

.button__icon-svg--copy {
  position: absolute;
  transform: translate(-150%, 150%);
}

.button:hover .button__icon-svg:first-child {
  transition: transform 0.3s ease-in-out;
  transform: translate(150%, -150%);
}

.button:hover .button__icon-svg--copy {
  transition: transform 0.3s ease-in-out 0.1s;
  transform: translate(0);
}
</style>
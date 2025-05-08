<template>
  <!-- Categories -->
  <section class="container mx-auto flex flex-wrap flex-col sm:flex-row pb-5 mb-3 gap-4">
    <!-- Accommodation -->
    <NuxtLink
      to="/catalog"
      class="flex items-center rounded-full py-3 px-6 mb-2 sm:mb-0 shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-auto min-w-[180px]"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bed-double-icon lucide-bed-double"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/></svg>
      </div>
      <h3 class="text-sm font-medium">Alojamiento</h3>
    </NuxtLink>

    <!-- Food & Drink (opción con tenedor y cuchillo simplificada) -->
<NuxtLink
  to="/catalog"
  class="flex items-center rounded-full py-3 px-6 mb-2 sm:mb-0 shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-auto min-w-[180px]"
>
  <div class="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 mr-3">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils-crossed-icon lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/></svg>
  </div>
  <h3 class="text-sm font-medium">Restaurante y Bar</h3>
</NuxtLink>

    <!-- Shopping -->
    <NuxtLink
      to="/catalog"
      class="flex items-center rounded-full py-3 px-6 mb-2 sm:mb-0 shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-auto min-w-[180px]"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </div>
      <h3 class="text-sm font-medium">Compras</h3>
    </NuxtLink>

    <!-- Art & History -->
    <NuxtLink
      to="/catalog"
      class="flex items-center rounded-full py-3 px-6 mb-2 sm:mb-0 shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-auto min-w-[180px]"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark-icon lucide-landmark"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
      </div>
      <h3 class="text-sm font-medium">Arte e Historia</h3>
    </NuxtLink>

    <!-- Entertainment -->
    <NuxtLink
      to="/catalog"
      class="flex items-center rounded-full py-3 px-6 mb-2 sm:mb-0 shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-auto min-w-[180px]"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket-icon lucide-ticket"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
      </div>
      <h3 class="text-sm font-medium">Entretenimiento</h3>
    </NuxtLink>

    <!-- More (Dropdown) -->
    <div class="relative mb-2 sm:mb-0">
      <button
        @click="toggleDropdown"
        class="flex items-center rounded-full py-3 px-6 shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-auto min-w-[180px]"
      >
        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-sm font-medium">Más</h3>
      </button>

      <!-- Dropdown Menu -->
      <div
        v-show="isDropdownOpen"
        class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-10"
      >
        
<!-- Medicine con un icono mejorado -->
<NuxtLink to="/catalog" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase-medical-icon lucide-briefcase-medical"><path d="M12 11v4"/><path d="M14 13h-4"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M18 6v14"/><path d="M6 6v14"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
  <span class="font-medium">Salud</span>
</NuxtLink>
        <NuxtLink to="/catalog" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          <span class="font-medium">Belleza</span>
        </NuxtLink>
        <NuxtLink to="/catalog" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car-front-icon lucide-car-front"><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>
          <span class="font-medium">Alquiler de Vehículos</span>
        </NuxtLink>
        <NuxtLink to="/catalog" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dumbbell-icon lucide-dumbbell"><path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/></svg>
          <span class="font-medium">Deporte y Fitness</span>
        </NuxtLink>
        <NuxtLink to="/catalog" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-martini-icon lucide-martini"><path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/></svg>
          <span class="font-medium">Vida Nocturna</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    closeDropdown() {
      this.isDropdownOpen = false
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const dropdown = this.$el.querySelector('.relative')
      if (dropdown && !dropdown.contains(e.target)) {
        this.closeDropdown()
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown)
  }
}
</script>
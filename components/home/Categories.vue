<template>
  <!-- Categories -->
  <section class="container mx-auto flex flex-wrap flex-col sm:flex-row pb-5 mb-3 gap-4">
    <!-- Accommodation -->
    <NuxtLink
      to="/catalog"
      class="flex items-center rounded-full py-3 px-6 mb-2 sm:mb-0 shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-auto min-w-[180px]"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      </div>
      <h3 class="text-sm font-medium">Accommodation</h3>
    </NuxtLink>

    <!-- Food & Drink -->
    <NuxtLink
      to="/catalog"
      class="flex items-center rounded-full py-3 px-6 mb-2 sm:mb-0 shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-auto min-w-[180px]"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.38a48.474 48.474 0 0 0-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1 .739 0L13 3.16l-.754 7.54a48.57 48.57 0 0 1 6.75 1.07l.75-7.5a.375.375 0 1 1 .75.074l-.742 7.426a48.524 48.524 0 0 1 3.242 1.122V12.9a48.644 48.644 0 0 0-3.27-1.107l.52-5.19a.375.375 0 1 1 .748.076l-.517 5.168c1.105.392 2.187.82 3.238 1.293v.666a49.068 49.068 0 0 0-3.267-1.277l.166-1.661a.375.375 0 1 1 .748.075l-.27 2.686A47.954 47.954 0 0 0 18 14.317v1.576a49.89 49.89 0 0 0-5.4-1.211l.415-4.152a.375.375 0 1 1 .748.075l-.415 4.14c1.797.243 3.557.589 5.277 1.035v.639a50.325 50.325 0 0 0-5.4-.967l.286-2.851a.375.375 0 1 1 .748.075l-.286 2.855c1.84.216 3.64.55 5.4 1.004v-.031a54.276 54.276 0 0 0-5.4-.993l.293-2.918a.375.375 0 1 1 .747.075l-.293 2.929a53.678 53.678 0 0 1 5.401 1.118l.327-3.264A.375.375 0 0 1 23 12.75v5.17c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 17.92v-5.17a2.25 2.25 0 0 1 1.793-2.202A48.562 48.562 0 0 1 7.5 10.012v2.306c-1.12.281-2.237.591-3.349.93a.668.668 0 0 0-.53.654v5.169c0 .1.082.181.181.181h17.44c.1 0 .18-.082.18-.181v-5.17a.678.678 0 0 0-.443-.639 49.132 49.132 0 0 0-4.3-.97l.74-7.383a.375.375 0 1 1 .75.075l-.734 7.345a48.88 48.88 0 0 1 4.955 1.182c.075.022.152.025.228.008v-3.817a52.063 52.063 0 0 0-5.29-1.223l.691-6.912a.375.375 0 1 1 .75.075L18 13.713a53.846 53.846 0 0 1 5.25 1.366v-5.461a.375.375 0 1 1 .75 0v4.95a48.563 48.563 0 0 0-8.5-1.999V9.997c2.968.164 5.894.613 8.75 1.344V6.633a50.296 50.296 0 0 0-8.75-1.213V3.466a53.151 53.151 0 0 0-7.5.326v4.049a52.936 52.936 0 0 1 7.5-.339v2.138a49.806 49.806 0 0 0-7.5.871v4.893c2.071-.715 4.37-1.223 6.75-1.486V9.575c-2.636.267-5.189.851-7.5 1.688v2.014a45.1 45.1 0 0 1 7.5-1.736v-6.39a.375.375 0 1 1 .75 0v6.39a46.398 46.398 0 0 1 6.75 1.046l.246-2.46a.375.375 0 1 1 .75.075l-.246 2.464a45.397 45.397 0 0 1 7.5 1.895V8.555a45.17 45.17 0 0 0-7.5-1.247l.345-3.454a.375.375 0 1 1 .75.075L21 7.297a45.05 45.05 0 0 1 3 .539v-.805a41.595 41.595 0 0 0-6.245-1.287l.515-5.15a.375.375 0 1 1 .75.074l-.515 5.152a40.864 40.864 0 0 1 6.245 1.434V5.36a53.11 53.11 0 0 0-12-1.86A53.114 53.114 0 0 0 3 5.36v4.106a49.207 49.207 0 0 1 9-1.051V9.94c-2 .108-3.976.35-5.9.722v1.761a43.113 43.113 0 0 1 5.9-.771V9.06a47.29 47.29 0 0 0-5.9.887V11.5c.948-.272 1.931-.507 2.935-.7a.75.75 0 1 0-.234-1.48 27.552 27.552 0 0 0-2.701.654V5.362a53.535 53.535 0 0 1 9-.902l.265-2.656a.375.375 0 1 1 .748.075L12 4.45a54.035 54.035 0 0 1 9 .905v.677a52.99 52.99 0 0 0-9-1.23V3.11Z" />
        </svg>
      </div>
      <h3 class="text-sm font-medium">Food & Drink</h3>
    </NuxtLink>

    <!-- Shopping -->
    <NuxtLink
      to="/catalog"
      class="flex items-center rounded-full py-3 px-6 mb-2 sm:mb-0 shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-auto min-w-[180px]"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clip-rule="evenodd" />
        </svg>
      </div>
      <h3 class="text-sm font-medium">Shopping</h3>
    </NuxtLink>

    <!-- Art & History -->
    <NuxtLink
      to="/catalog"
      class="flex items-center rounded-full py-3 px-6 mb-2 sm:mb-0 shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-auto min-w-[180px]"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
          <path fill-rule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clip-rule="evenodd" />
          <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
        </svg>
      </div>
      <h3 class="text-sm font-medium">Art & History</h3>
    </NuxtLink>

    <!-- Entertainment -->
    <NuxtLink
      to="/catalog"
      class="flex items-center rounded-full py-3 px-6 mb-2 sm:mb-0 shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full sm:w-auto min-w-[180px]"
    >
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
        </svg>
      </div>
      <h3 class="text-sm font-medium">Entertainment</h3>
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
        <h3 class="text-sm font-medium">More</h3>
      </button>

      <!-- Dropdown Menu -->
      <div
        v-show="isDropdownOpen"
        class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-10"
      >
        <NuxtLink to="/catalog" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
            <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H1.5v-6A2.25 2.25 0 013.75 3h7.5zM12.75 3v4.011a3 3 0 014.239 4.239H22.5v-6A2.25 2.25 0 0020.25 3h-7.5zM22.5 12.75h-8.983a4.125 4.125 0 004.108 3.75.75.75 0 010 1.5 5.623 5.623 0 01-4.875-2.817V21h7.5a2.25 2.25 0 002.25-2.25v-6zM11.25 21v-5.817A5.623 5.623 0 016.375 18a.75.75 0 010-1.5 4.126 4.126 0 004.108-3.75H1.5v6A2.25 2.25 0 003.75 21h7.5z" />
            <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 01-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 012.122-2.12c.517.517.759 1.36.842 2.194zM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0013.72 8.16c-.518.518-.76 1.362-.843 2.194z" />
          </svg>
          <span class="font-medium">Medicine</span>
        </NuxtLink>
        <NuxtLink to="/catalog" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          <span class="font-medium">Beauty</span>
        </NuxtLink>
        <NuxtLink to="/catalog" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          <span class="font-medium">Car Rental</span>
        </NuxtLink>
        <NuxtLink to="/catalog" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <span class="font-medium">Fitness & Sport</span>
        </NuxtLink>
        <NuxtLink to="/catalog" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          <span class="font-medium">Night Club</span>
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
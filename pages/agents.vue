<template>
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center text-sm text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-500">Home</a>
        <span class="mx-2">›</span>
        <span class="text-blue-500">Agents</span>
      </div>
  
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-black mb-2">Our Real Estate Agents</h1>
        <p class="text-gray-700">Professional agents to help you find your perfect property</p>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Agent Card 1 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <div class="flex flex-col items-center text-center">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Agent" class="w-32 h-32 object-cover rounded-full mb-4" />
              <h3 class="text-xl font-bold text-black mb-1">Kristin Watson</h3>
              <p class="text-gray-600 mb-2">Imperial Property Group Agent</p>
              <div class="flex text-yellow-400 mb-3">
                <span>★★★★★</span>
              </div>
              <p class="text-sm text-gray-700 mb-4">"I help clients find their dream homes with personalized service and extensive market knowledge."</p>
              <div class="flex space-x-3 mb-4">
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">f</a>
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">t</a>
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-pink-600">i</a>
              </div>
              <div class="flex space-x-4">
                <a href="tel:3025550107" class="text-gray-700 hover:text-black flex items-center">
                  <span class="mr-2">📞</span>
                  (302) 555-0107
                </a>
                <a href="mailto:kristin@example.com" class="text-gray-700 hover:text-black flex items-center">
                  <span class="mr-2">📧</span>
                  Email
                </a>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-4 flex justify-between items-center">
            <div>
              <span class="text-gray-700">45 reviews</span>
            </div>
            <a href="/agents/1" class="text-blue-600 hover:text-blue-800">View Profile</a>
          </div>
        </div>
  
        <!-- Agent Card 2 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <div class="flex flex-col items-center text-center">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Agent" class="w-32 h-32 object-cover rounded-full mb-4" />
              <h3 class="text-xl font-bold text-black mb-1">Floyd Miles</h3>
              <p class="text-gray-600 mb-2">Imperial Property Group Agent</p>
              <div class="flex text-yellow-400 mb-3">
                <span>★★★★★</span>
              </div>
              <p class="text-sm text-gray-700 mb-4">"Specializing in luxury properties and investment opportunities with over 10 years of experience in the market."</p>
              <div class="flex space-x-3 mb-4">
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">f</a>
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">t</a>
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-pink-600">i</a>
              </div>
              <div class="flex space-x-4">
                <a href="tel:3025550108" class="text-gray-700 hover:text-black flex items-center">
                  <span class="mr-2">📞</span>
                  (302) 555-0108
                </a>
                <a href="mailto:floyd@example.com" class="text-gray-700 hover:text-black flex items-center">
                  <span class="mr-2">📧</span>
                  Email
                </a>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-4 flex justify-between items-center">
            <div>
              <span class="text-gray-700">37 reviews</span>
            </div>
            <a href="/agents/2" class="text-blue-600 hover:text-blue-800">View Profile</a>
          </div>
        </div>
  
        <!-- Agent Card 3 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <div class="flex flex-col items-center text-center">
              <img src="https://randomuser.me/api/portraits/women/86.jpg" alt="Agent" class="w-32 h-32 object-cover rounded-full mb-4" />
              <h3 class="text-xl font-bold text-black mb-1">Esther Howard</h3>
              <p class="text-gray-600 mb-2">Imperial Property Group Agent</p>
              <div class="flex text-yellow-400 mb-3">
                <span>★★★★☆</span>
              </div>
              <p class="text-sm text-gray-700 mb-4">"I believe in building relationships with clients and providing exceptional service throughout the buying or selling process."</p>
              <div class="flex space-x-3 mb-4">
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">f</a>
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">t</a>
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-pink-600">i</a>
              </div>
              <div class="flex space-x-4">
                <a href="tel:3025550109" class="text-gray-700 hover:text-black flex items-center">
                  <span class="mr-2">📞</span>
                  (302) 555-0109
                </a>
                <a href="mailto:esther@example.com" class="text-gray-700 hover:text-black flex items-center">
                  <span class="mr-2">📧</span>
                  Email
                </a>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-4 flex justify-between items-center">
            <div>
              <span class="text-gray-700">29 reviews</span>
            </div>
            <a href="/agents/3" class="text-blue-600 hover:text-blue-800">View Profile</a>
          </div>
        </div>
  
        <!-- Agent Card 4 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <div class="flex flex-col items-center text-center">
              <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="Agent" class="w-32 h-32 object-cover rounded-full mb-4" />
              <h3 class="text-xl font-bold text-black mb-1">Darrell Steward</h3>
              <p class="text-gray-600 mb-2">Imperial Property Group Agent</p>
              <div class="flex text-yellow-400 mb-3">
                <span>★★★★☆</span>
              </div>
              <p class="text-sm text-gray-700 mb-4">"Expert in residential properties with a focus on family homes and investment opportunities in growing neighborhoods."</p>
              <div class="flex space-x-3 mb-4">
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">f</a>
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">t</a>
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-pink-600">i</a>
              </div>
              <div class="flex space-x-4">
                <a href="tel:3025550110" class="text-gray-700 hover:text-black flex items-center">
                  <span class="mr-2">📞</span>
                  (302) 555-0110
                </a>
                <a href="mailto:darrell@example.com" class="text-gray-700 hover:text-black flex items-center">
                  <span class="mr-2">📧</span>
                  Email
                </a>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 p-4 flex justify-between items-center">
            <div>
              <span class="text-gray-700">31 reviews</span>
            </div>
            <a href="/agents/4" class="text-blue-600 hover:text-blue-800">View Profile</a>
          </div>
        </div>
  
        <!-- Agent Card 5 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6">
            <div class="flex flex-col items-center text-center">
              <img src="https://randomuser.me/api/portraits/women/54.jpg" alt="Agent" class="w-32 h-32 object-cover rounded-full mb-4" />
            <h3 class="text-xl font-bold text-black mb-1">Courtney Henry</h3>
            <p class="text-gray-600 mb-2">Imperial Property Group Agent</p>
            <div class="flex text-yellow-400 mb-3">
              <span>★★★★★</span>
            </div>
            <p class="text-sm text-gray-700 mb-4">"Helping clients find their perfect home or investment property with personalized attention to detail and market insights."</p>
            <div class="flex space-x-3 mb-4">
              <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">f</a>
              <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">t</a>
              <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-pink-600">i</a>
            </div>
            <div class="flex space-x-4">
              <a href="tel:3025550111" class="text-gray-700 hover:text-black flex items-center">
                <span class="mr-2">📞</span>
                (302) 555-0111
              </a>
              <a href="mailto:courtney@example.com" class="text-gray-700 hover:text-black flex items-center">
                <span class="mr-2">📧</span>
                Email
              </a>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 p-4 flex justify-between items-center">
          <div>
            <span class="text-gray-700">24 reviews</span>
          </div>
          <a href="/agents/5" class="text-blue-600 hover:text-blue-800">View Profile</a>
        </div>
      </div>

      <!-- Agent Card 6 -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <div class="flex flex-col items-center text-center">
            <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="Agent" class="w-32 h-32 object-cover rounded-full mb-4" />
            <h3 class="text-xl font-bold text-black mb-1">Ralph Edwards</h3>
            <p class="text-gray-600 mb-2">Imperial Property Group Agent</p>
            <div class="flex text-yellow-400 mb-3">
              <span>★★★★☆</span>
            </div>
            <p class="text-sm text-gray-700 mb-4">"Specialized in luxury properties and commercial real estate with a track record of successful transactions."</p>
            <div class="flex space-x-3 mb-4">
              <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">f</a>
              <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">t</a>
              <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-pink-600">i</a>
            </div>
            <div class="flex space-x-4">
              <a href="tel:3025550112" class="text-gray-700 hover:text-black flex items-center">
                <span class="mr-2">📞</span>
                (302) 555-0112
              </a>
              <a href="mailto:ralph@example.com" class="text-gray-700 hover:text-black flex items-center">
                <span class="mr-2">📧</span>
                Email
              </a>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 p-4 flex justify-between items-center">
          <div>
            <span class="text-gray-700">33 reviews</span>
          </div>
          <a href="/agents/6" class="text-blue-600 hover:text-blue-800">View Profile</a>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <nav class="inline-flex rounded-md shadow-sm" aria-label="Pagination">
        <a href="#" class="px-3 py-2 border border-gray-300 bg-white rounded-l-md text-sm">Previous</a>
        <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-blue-800 text-white text-sm">1</a>
        <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm">2</a>
        <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm">3</a>
        <a href="#" class="px-3 py-2 border border-gray-300 bg-white rounded-r-md text-sm">Next</a>
      </nav>
    </div>
  </div>
</template>

<script setup>
// Aquí puedes agregar la lógica necesaria
// Como cargar agentes desde una API o store
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>
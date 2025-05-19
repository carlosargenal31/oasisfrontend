<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section con Fondo Degradado -->
    <section>
     
    </section>

    <!-- Lo que ofrecemos - Turismo -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Descubre La Ceiba</h2>
        <p class="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Nuestra plataforma está dedicada a promover el turismo y las experiencias únicas que La Ceiba ofrece a sus visitantes.
        </p>
        
        <!-- Grid centrado con 3 elementos -->
        <div class="flex justify-center">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="bg-orange-50 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div class="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <ShoppingBagIcon :size="24" />
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">Comercios</h3>
              <p class="text-gray-600">
                Restaurantes, alojamientos y lugares de entretenimiento para disfrutar tu estadía.
              </p>
            </div>
            
            <div class="bg-orange-50 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div class="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon :size="24" />
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">Eventos</h3>
              <p class="text-gray-600">
                Calendario actualizado con actividades culturales durante todo el año.
              </p>
            </div>
            
            <div class="bg-orange-50 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div class="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <BookOpenIcon :size="24" />
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">Blog</h3>
              <p class="text-gray-600">
                Artículos, historias y recomendaciones de locales y visitantes sobre La Ceiba.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Misión y Visión con Iconos -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div class="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                <TargetIcon :size="28" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Misión</h3>
              <p class="text-gray-600">
                Conectar a residentes y viajeros con lo mejor de La Ceiba a través de una plataforma web completa, actualizada y fácil de usar, fomentando el turismo sostenible y el orgullo local.
              </p>
            </div>
            
            <div class="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div class="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                <EyeIcon :size="28" />
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Visión</h3>
              <p class="text-gray-600">
                Ser el sitio de referencia para quienes buscan explorar festividades, naturaleza y cultura en Honduras, inspirando un intercambio auténtico entre comunidad y visitante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Equipo de desarrolladores - Primera fila -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Nuestro Equipo</h2>
        <p class="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Un grupo de desarrolladores apasionados por mostrar lo mejor de nuestra ciudad al mundo.
        </p>
        
        <!-- Grid de desarrolladores - Primera fila -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-10">
          <!-- Miembro 1 - Gerson Rivera -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Gerson Rivera" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800">Gerson Rivera</h3>
              <p class="text-gray-500 text-sm mb-2">Ingeniero de Desarrollo Full Stack</p>
              <div class="flex items-center justify-between">
                <a href="mailto:griveram27@gmail.com" class="flex items-center text-gray-600 hover:text-orange-600 transition">
                  <MailIcon :size="16" class="mr-1" />
                  <span class="text-sm">Email</span>
                </a>
                <div class="flex space-x-2">
                  <a href="https://www.linkedin.com/in/gerson-rivera-4a0571186" target="_blank" class="text-gray-600 hover:text-blue-600 transition">
                    <LinkedinIcon :size="18" />
                  </a>
                  <a href="https://www.instagram.com/gerson.rivera27?igsh=MXEzeGtwYXg2YXpkdA%3D%3D&utm_source=qr" target="_blank" class="text-gray-600 hover:text-pink-600 transition">
                    <InstagramIcon :size="18" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Miembro 2 - Carlos Argeñal -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Carlos Argueñal" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800">Carlos Argeñal</h3>
              <p class="text-gray-500 text-sm mb-2">Arquitecto de Software Web</p>
              <div class="flex items-center justify-between">
                <a href="mailto:carlos.arg@descubrelaceiba.hn" class="flex items-center text-gray-600 hover:text-orange-600 transition">
                  <MailIcon :size="16" class="mr-1" />
                  <span class="text-sm">Email</span>
                </a>
                <div class="flex space-x-2">
                  <a href="https://www.linkedin.com/in/carlos-arge%C3%B1al-9482892a9/" target="_blank" class="text-gray-600 hover:text-blue-600 transition">
                    <LinkedinIcon :size="18" />
                  </a>
                  <a href="https://www.instagram.com/carlos_mauricio31?igsh=aGN1eXV1dmdqdWdn" target="_blank" class="text-gray-600 hover:text-pink-600 transition">
                    <InstagramIcon :size="18" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Miembro 3 - Axxel Arteaga -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Axxel Arteaga" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800">Axxel Arteaga</h3>
              <p class="text-gray-500 text-sm mb-2">Ingeniero de Desarrollo Full Stack</p>
              <div class="flex items-center justify-between">
                <a href="mailto:axxel@descubrelaceiba.hn" class="flex items-center text-gray-600 hover:text-orange-600 transition">
                  <MailIcon :size="16" class="mr-1" />
                  <span class="text-sm">Email</span>
                </a>
                <div class="flex space-x-2">
                  <a href="http://linkedin.com/in/axel-arteaga-16463a31b" target="_blank" class="text-gray-600 hover:text-blue-600 transition">
                    <LinkedinIcon :size="18" />
                  </a>
                  <a href="https://instagram.com/axxelarteaga" target="_blank" class="text-gray-600 hover:text-pink-600 transition">
                    <InstagramIcon :size="18" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Miembro 4 - Denuar Hernandez -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Denuar Hernandez" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800">Denuar Hernandez</h3>
              <p class="text-gray-500 text-sm mb-2">Desarrollador Web y Móvil Senior</p>
              <div class="flex items-center justify-between">
                <a href="mailto:denuar@descubrelaceiba.hn" class="flex items-center text-gray-600 hover:text-orange-600 transition">
                  <MailIcon :size="16" class="mr-1" />
                  <span class="text-sm">Email</span>
                </a>
                <div class="flex space-x-2">
                  <a href="https://www.linkedin.com/in/denuarhndz" target="_blank" class="text-gray-600 hover:text-blue-600 transition">
                    <LinkedinIcon :size="18" />
                  </a>
                  <a href="https://instagram.com/denuarhernandez" target="_blank" class="text-gray-600 hover:text-pink-600 transition">
                    <InstagramIcon :size="18" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Miembro 5 - Marcos Rodriguez -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="Marcos Rodriguez" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800">Marcos Rodriguez</h3>
              <p class="text-gray-500 text-sm mb-2">Ingeniero de Aplicaciones Móviles</p>
              <div class="flex items-center justify-between">
                <a href="mailto:marcos@descubrelaceiba.hn" class="flex items-center text-gray-600 hover:text-orange-600 transition">
                  <MailIcon :size="16" class="mr-1" />
                  <span class="text-sm">Email</span>
                </a>
                <div class="flex space-x-2">
                  <a href="https://linkedin.com/in/marcosrodriguezhn" target="_blank" class="text-gray-600 hover:text-blue-600 transition">
                    <LinkedinIcon :size="18" />
                  </a>
                  <a href="https://instagram.com/marcosrodriguezhn" target="_blank" class="text-gray-600 hover:text-pink-600 transition">
                    <InstagramIcon :size="18" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Grid de desarrolladores - Segunda fila -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          <!-- Miembro 6 - Greco Pavon -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Greco Pavon" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800">Greco Pavon</h3>
              <p class="text-gray-500 text-sm mb-2">Especialista UX/UI - Error 404</p>
              <div class="flex items-center justify-between">
                <a href="mailto:greco@descubrelaceiba.hn" class="flex items-center text-gray-600 hover:text-orange-600 transition">
                  <MailIcon :size="16" class="mr-1" />
                  <span class="text-sm">Email</span>
                </a>
                <div class="flex space-x-2">
                  <a href="https://linkedin.com/in/grecopavon" target="_blank" class="text-gray-600 hover:text-blue-600 transition">
                    <LinkedinIcon :size="18" />
                  </a>
                  <a href="https://instagram.com/grecopavon" target="_blank" class="text-gray-600 hover:text-pink-600 transition">
                    <InstagramIcon :size="18" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Miembro 7 - Carlos Alvarez -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Carlos Alvarez" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800">Carlos Alvarez</h3>
              <p class="text-gray-500 text-sm mb-2">Apoyo en Geolocalización</p>
              <div class="flex items-center justify-between">
                <a href="mailto:carlos.alv@descubrelaceiba.hn" class="flex items-center text-gray-600 hover:text-orange-600 transition">
                  <MailIcon :size="16" class="mr-1" />
                  <span class="text-sm">Email</span>
                </a>
                <div class="flex space-x-2">
                  <a href="https://linkedin.com/in/carlosalvarezhn" target="_blank" class="text-gray-600 hover:text-blue-600 transition">
                    <LinkedinIcon :size="18" />
                  </a>
                  <a href="https://instagram.com/carlosalvarezhn" target="_blank" class="text-gray-600 hover:text-pink-600 transition">
                    <InstagramIcon :size="18" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Miembro 8 - Jorge Cerna -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="Jorge Cerna" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800">Jorge Cerna</h3>
              <p class="text-gray-500 text-sm mb-2">Apoyo en Fotografía</p>
              <div class="flex items-center justify-between">
                <a href="mailto:jorge@descubrelaceiba.hn" class="flex items-center text-gray-600 hover:text-orange-600 transition">
                  <MailIcon :size="16" class="mr-1" />
                  <span class="text-sm">Email</span>
                </a>
                <div class="flex space-x-2">
                  <a href="https://linkedin.com/in/jorgecerna" target="_blank" class="text-gray-600 hover:text-blue-600 transition">
                    <LinkedinIcon :size="18" />
                  </a>
                  <a href="https://instagram.com/jorgecerna" target="_blank" class="text-gray-600 hover:text-pink-600 transition">
                    <InstagramIcon :size="18" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Miembro 9 - Jenci Lemus -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Jenci Lemus" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800">Jenci Lemus</h3>
              <p class="text-gray-500 text-sm mb-2">Apoyo en Geolocalización</p>
              <div class="flex items-center justify-between">
                <a href="mailto:jenci@descubrelaceiba.hn" class="flex items-center text-gray-600 hover:text-orange-600 transition">
                  <MailIcon :size="16" class="mr-1" />
                  <span class="text-sm">Email</span>
                </a>
                <div class="flex space-x-2">
                  <a href="https://linkedin.com/in/jencilemus" target="_blank" class="text-gray-600 hover:text-blue-600 transition">
                    <LinkedinIcon :size="18" />
                  </a>
                  <a href="https://instagram.com/jencilemus" target="_blank" class="text-gray-600 hover:text-pink-600 transition">
                    <InstagramIcon :size="18" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Miembro 10 - Carlos Sosa -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group">
            <div class="h-56 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Carlos Sosa" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-800">Carlos Sosa</h3>
              <p class="text-gray-500 text-sm mb-2">Apoyo en Descripciones</p>
              <div class="flex items-center justify-between">
                <a href="mailto:carlos.sosa@descubrelaceiba.hn" class="flex items-center text-gray-600 hover:text-orange-600 transition">
                  <MailIcon :size="16" class="mr-1" />
                  <span class="text-sm">Email</span>
                </a>
                <div class="flex space-x-2">
                  <a href="https://linkedin.com/in/carlossosahn" target="_blank" class="text-gray-600 hover:text-blue-600 transition">
                    <LinkedinIcon :size="18" />
                  </a>
                  <a href="https://instagram.com/carlossosahn" target="_blank" class="text-gray-600 hover:text-pink-600 transition">
                    <InstagramIcon :size="18" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contacto -->
    <section>
      
    </section>
  </div>
</template>

<script setup>
import { 
  Calendar as CalendarIcon,
  Landmark as LandmarkIcon,
  Map as MapIcon,
  Users as UsersIcon,
  Store as StoreIcon,
  Target as TargetIcon,
  Eye as EyeIcon,
  Mail as MailIcon,
  Music as MusicIcon,
  PartyPopper as PartyPopperIcon,
  Mic as MicrophoneIcon,
  ShoppingBag as ShoppingBagIcon,
  BookOpen as BookOpenIcon,
  Linkedin as LinkedinIcon,
  Instagram as InstagramIcon
} from 'lucide-vue-next';
</script>

<style>
/* Transiciones suaves */
.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
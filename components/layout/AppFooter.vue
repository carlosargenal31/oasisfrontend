<template>
  <!-- Footer-->
  <footer class="footer bg-secondary pt-5">
    <div class="container pt-lg-4 pb-4">
      <!-- Links-->
      <div class="row mb-5 pb-md-3 pb-lg-4">
        <div class="col-lg-6 mb-lg-0 mb-4">
          <div class="d-flex flex-sm-row flex-column justify-content-between mx-n2">
            <div class="mb-sm-0 mb-4 px-2">
              <NuxtLink class="d-inline-block mb-4" to="/">
                <h1 class="text-xl font-bold text-blue-600 dark:text-blue-400">OASIS</h1>
              </NuxtLink>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Your trusted partner in finding the perfect property. We make real estate simple, transparent, and enjoyable.
              </p>
              <ul class="nav flex-column mb-sm-4 mb-2">
                <li class="nav-item mb-2">
                  <a class="nav-link p-0 fw-normal" href="mailto:info@oasis-realestate.com">
                    <i class="fi-mail mt-n1 me-2 align-middle opacity-70"></i>info@oasis-realestate.com</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link p-0 fw-normal" href="tel:5551234567">
                    <i class="fi-device-mobile mt-n1 me-2 align-middle opacity-70"></i>(555) 123-4567</a>
                </li>
              </ul>
              <div class="pt-2">
                <a class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2 mb-2" href="javascript:void(0);">
                  <i class="fi-facebook"></i>
                </a>
                <a class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2 mb-2" href="javascript:void(0);">
                  <i class="fi-twitter"></i>
                </a>
                <a class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2 mb-2" href="javascript:void(0);">
                  <i class="fi-instagram"></i>
                </a>
                <a class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2 mb-2" href="javascript:void(0);">
                  <i class="fi-linkedin"></i>
                </a>
              </div>
            </div>
            <div class="mb-sm-0 mb-4 px-2">
              <h4 class="h5">Quick Links</h4>
              <ul class="nav flex-column">
                <li class="nav-item mb-2">
                  <NuxtLink class="nav-link p-0 fw-normal" to="/">Home</NuxtLink>
                </li>
                <li class="nav-item mb-2">
                  <NuxtLink class="nav-link p-0 fw-normal" to="/properties">Properties</NuxtLink>
                </li>
                <li class="nav-item mb-2">
                  <NuxtLink class="nav-link p-0 fw-normal" to="/about">About Us</NuxtLink>
                </li>
                <li class="nav-item mb-2">
                  <NuxtLink class="nav-link p-0 fw-normal" to="/contact">Contact</NuxtLink>
                </li>
                <li class="nav-item mb-2">
                  <NuxtLink class="nav-link p-0 fw-normal" to="/blog">Blog</NuxtLink>
                </li>
              </ul>
            </div>
            <div class="px-2">
              <h4 class="h5">Services</h4>
              <ul class="nav flex-column">
                <li class="nav-item mb-2">
                  <NuxtLink class="nav-link p-0 fw-normal" to="/services/buying">Buying Property</NuxtLink>
                </li>
                <li class="nav-item mb-2">
                  <NuxtLink class="nav-link p-0 fw-normal" to="/services/selling">Selling Property</NuxtLink>
                </li>
                <li class="nav-item mb-2">
                  <NuxtLink class="nav-link p-0 fw-normal" to="/services/renting">Property Rental</NuxtLink>
                </li>
                <li class="nav-item mb-2">
                  <NuxtLink class="nav-link p-0 fw-normal" to="/services/management">Property Management</NuxtLink>
                </li>
                <li class="nav-item mb-2">
                  <NuxtLink class="nav-link p-0 fw-normal" to="/services/consultation">Real Estate Consultation</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-lg-6 offset-xl-1">
          <h4 class="h5">Contact Us</h4>
          <div class="d-flex align-items-start mb-3">
            <div class="flex-shrink-0 me-3">
              <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="mb-2 fs-sm">
                123 Main Street, Suite 200<br>
                Springfield, ST 12345
              </p>
            </div>
          </div>
          
          <h4 class="h5 pt-2">Recent Posts</h4>
          <article class="d-flex align-items-start" style="max-width: 640px">
            <NuxtLink class="d-none d-sm-block flex-shrink-0 me-sm-4 mb-sm-0 mb-3" to="/blog/single">
              <img class="rounded-3" src="https://via.placeholder.com/100x80" width="100" alt="Blog post" />
            </NuxtLink>
            <div>
              <h6 class="mb-1 fs-xs fw-normal text-uppercase text-primary">Home improvement</h6>
              <h5 class="mb-2 fs-base">
                <NuxtLink class="nav-link" to="/blog/single">Your Guide to a Smart Apartment Searching</NuxtLink>
              </h5>
              <p class="mb-2 fs-sm">
                Mi justo, varius vitae cursus ipsum sem massa amet pellentesque. Ipsum enim sit
                nulla ridiculus semper nam...
              </p>
              <a class="nav-link nav-link-muted d-inline-block me-3 p-0 fs-xs fw-normal" href="javascript:void(0);">
                <i class="fi-calendar mt-n1 me-1 fs-sm align-middle opacity-70"></i>Dec 4</a>
              <a class="nav-link nav-link-muted d-inline-block me-3 p-0 fs-xs fw-normal" href="javascript:void(0);">
                <i class="fi-chat-circle mt-n1 me-1 fs-sm align-middle opacity-70"></i>2 comments</a>
            </div>
          </article>
          <hr class="text-dark opacity-10 my-4" />
          <article class="d-flex align-items-start" style="max-width: 640px">
            <NuxtLink class="d-none d-sm-block flex-shrink-0 me-sm-4 mb-sm-0 mb-3" to="/blog/single">
              <img class="rounded-3" src="https://via.placeholder.com/100x80" width="100" alt="Blog post" />
            </NuxtLink>
            <div>
              <h6 class="mb-1 fs-xs fw-normal text-uppercase text-primary">Tips &amp; advice</h6>
              <h5 class="mb-2 fs-base">
                <NuxtLink class="nav-link" to="/blog/single">Top 10 Ways to Refresh Your Space</NuxtLink>
              </h5>
              <p class="mb-2 fs-sm">
                Volutpat, orci, vitae arcu feugiat vestibulum ultricies nisi, aenean eget. Vitae
                enim, tellus tempor consequat mi vitae...
              </p>
              <a class="nav-link nav-link-muted d-inline-block me-3 p-0 fs-xs fw-normal" href="javascript:void(0);">
                <i class="fi-calendar mt-n1 me-1 fs-sm align-middle opacity-70"></i>Nov 23</a>
                <a class="nav-link nav-link-muted d-inline-block me-3 p-0 fs-xs fw-normal" href="javascript:void(0);">
                  <i class="fi-chat-circle mt-n1 me-1 fs-sm align-middle opacity-70"></i>No comments</a>
            </div>
          </article>
        </div>
      </div>
      
      <!-- App Download Banner-->
      <div class="bg-dark rounded-3">
        <div class="col-xxl-10 col-md-11 col-10 d-flex flex-md-row flex-column-reverse align-items-md-end align-items-center mx-auto px-0">
          <img class="flex-shrink-0 mt-md-n5 me-md-5" src="https://via.placeholder.com/240x300" width="240" alt="OASIS mobile app" />
          <div class="align-self-center d-flex flex-lg-row flex-column align-items-lg-center pt-md-3 pt-5 ps-xxl-4 text-md-start text-center">
            <div class="me-md-5">
              <h4 class="text-light">Download Our App</h4>
              <p class="mb-lg-0 text-light">
                Find everything you need for buying, selling &amp; renting property in our new
                OASIS App!
              </p>
            </div>
            <div class="flex-shrink-0">
              <a class="btn-market mx-2 ms-sm-0 me-sm-4 mb-3" href="javascript:void(0);" role="button">
                <span class="btn-market-subtitle">Download on the</span>
                <span class="btn-market-title">App Store</span>
              </a>
              <a class="btn-market mb-3" href="javascript:void(0);" role="button">
                <span class="btn-market-subtitle">Download on</span>
                <span class="btn-market-title">Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center fs-sm pt-4 mt-3 pb-2">
        &copy; {{ new Date().getFullYear() }} OASIS Real Estate. All rights reserved.
        <div class="mt-3">
          <NuxtLink to="/privacy" class="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white mx-2">
            Privacy Policy
          </NuxtLink>
          <NuxtLink to="/terms" class="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white mx-2">
            Terms of Service
          </NuxtLink>
          <NuxtLink to="/cookies" class="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white mx-2">
            Cookie Policy
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No special logic needed for the footer
</script>

<style scoped>
/* Footer styles */
.footer {
  color: #6b7280;
}

.bg-secondary {
  background-color: #f8f9fa;
}

.nav-link {
  color: #6b7280;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #1d4ed8;
}

.dark .nav-link {
  color: #9ca3af;
}

.dark .nav-link:hover {
  color: #60a5fa;
}

/* Blog post styles */
.rounded-3 {
  border-radius: 0.5rem;
}

/* App download section */
.btn-market {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.06);
  color: #fff;
  text-decoration: none;
  text-align: left;
  min-width: 142px;
}

.btn-market:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.btn-market-subtitle {
  display: block;
  font-size: 0.6875rem;
  font-weight: normal;
  opacity: 0.65;
}

.btn-market-title {
  display: block;
  font-size: 1.125rem;
  font-weight: semibold;
}
</style>
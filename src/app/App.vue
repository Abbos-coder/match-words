<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref<boolean>(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <transition
      enter-active-class="transition-opacity ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        @click="closeMobileMenu"
      ></div>
    </transition>

    <!-- Navbar -->
    <nav class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link 
              to="/" 
              class="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer flex items-center space-x-2"
              @click="closeMobileMenu"
            >
              <span class="text-2xl sm:text-3xl">🎯</span>
              <span class="hidden sm:inline">Match Words</span>
              <span class="sm:hidden">Match Words</span>
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-2 lg:space-x-4">
            <router-link
              to="/"
              :class="[
                'px-3 lg:px-4 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200',
                route.path === '/'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              ]"
            >
              🏠 Home
            </router-link>
            <router-link
              to="/upload"
              :class="[
                'px-3 lg:px-4 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200',
                route.path === '/upload'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              ]"
            >
              📤 Upload
            </router-link>
            <router-link
              to="/match"
              :class="[
                'px-3 lg:px-4 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200',
                route.path === '/match'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              ]"
            >
              🎮 Play
            </router-link>
          </div>

          <div class="md:hidden flex items-center">
            <button
              @click="toggleMobileMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                v-if="!isMobileMenuOpen"
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                v-else
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <div 
          v-if="isMobileMenuOpen" 
          class="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40"
        >
          <div class="px-2 pt-2 pb-3 space-y-1">
            <router-link
              to="/"
              :class="[
                'block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                route.path === '/'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              ]"
              @click="closeMobileMenu"
            >
              <span class="flex items-center space-x-3">
                <span class="text-xl">🏠</span>
                <span>Home</span>
              </span>
            </router-link>
            <router-link
              to="/upload"
              :class="[
                'block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                route.path === '/upload'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              ]"
              @click="closeMobileMenu"
            >
              <span class="flex items-center space-x-3">
                <span class="text-xl">📤</span>
                <span>Upload Words</span>
              </span>
            </router-link>
            <router-link
              to="/match"
              :class="[
                'block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                route.path === '/match'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              ]"
              @click="closeMobileMenu"
            >
              <span class="flex items-center space-x-3">
                <span class="text-xl">🎮</span>
                <span>Match Game</span>
              </span>
            </router-link>
          </div>
        </div>
      </transition>
    </nav>

    <main>
      <router-view />
    </main>
  </div>
</template>

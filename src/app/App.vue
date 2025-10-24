<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link 
              to="/" 
              class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer flex items-center space-x-2"
            >
              <span class="text-2xl">🎯</span>
              <span>Match Words</span>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              to="/"
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                route.path === '/'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              ]"
            >
              Home
            </router-link>
            <router-link
              to="/upload"
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                route.path === '/upload'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              ]"
            >
              Upload Words
            </router-link>
            <router-link
              to="/match"
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                route.path === '/match'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              ]"
            >
              Match Game
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="py-8">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* Component specific styles if needed */
</style>

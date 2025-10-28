<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useWordStore } from '../entities'
import { parseTextFile } from '../shared/lib/parseFile'

const router = useRouter()
const store = useWordStore()

interface Level {
  id: string
  name: string
  title: string
  description: string
  wordCount: number
  color: string
  icon: string
  file: string
}

const levels: Level[] = [
  {
    id: 'a1',
    name: 'A1',
    title: 'Beginner',
    description: 'Basic words and phrases for everyday situations',
    wordCount: 500,
    color: 'from-green-400 to-green-600',
    icon: '🌱',
    file: '/src/app/assets/dictionaries/A1_English_to_Russian_500.txt'
  },
  {
    id: 'a2',
    name: 'A2',
    title: 'Elementary',
    description: 'Common expressions and frequent vocabulary',
    wordCount: 500,
    color: 'from-blue-400 to-blue-600',
    icon: '📚',
    file: '/src/app/assets/dictionaries/A2_English_to_Russian_500.txt'
  }
]

async function selectLevel(level: Level) {
  try {
    const response = await fetch(level.file)
    const text = await response.text()
    
    const blob = new Blob([text], { type: 'text/plain' })
    const file = new File([blob], `${level.name}_dictionary.txt`, { type: 'text/plain' })
    
    const words = await parseTextFile(file)
    store.setWords(words)
    
    router.push({
      path: '/words',
      query: {
        level: level.name,
        title: level.title,
        icon: level.icon
      }
    })
  } catch (error) {
    console.error('Error loading dictionary:', error)
    alert('Error loading dictionary. Please try again.')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">
          🎯 Match Words Game
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn English vocabulary by matching words with their Russian translations.
          Choose your level and start practicing!
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        <div
          v-for="level in levels"
          :key="level.id"
          class="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          @click="selectLevel(level)"
        >
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div :class="['bg-gradient-to-r p-8 text-white', level.color]">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <div class="text-6xl mb-2">{{ level.icon }}</div>
                  <h2 class="text-3xl font-bold">{{ level.name }}</h2>
                  <p class="text-lg opacity-90">{{ level.title }}</p>
                </div>
                <div class="text-right">
                  <div class="text-4xl font-bold">{{ level.wordCount }}</div>
                  <div class="text-sm opacity-90">words</div>
                </div>
              </div>
            </div>

            <div class="p-6">
              <p class="text-gray-600 text-lg mb-4">
                {{ level.description }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 text-sm text-gray-500">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Quick Start</span>
                </div>
                
                <div class="text-blue-600 font-semibold group-hover:text-blue-700 flex items-center">
                  Start Learning
                  <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="text-4xl mb-3">🎮</div>
          <h4 class="font-semibold text-lg mb-2">Interactive Learning</h4>
          <p class="text-gray-600">Match words in a fun and engaging game format</p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-3">📊</div>
          <h4 class="font-semibold text-lg mb-2">Track Progress</h4>
          <p class="text-gray-600">Monitor your accuracy and improve over time</p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-3">⚡</div>
          <h4 class="font-semibold text-lg mb-2">Quick Practice</h4>
          <p class="text-gray-600">Learn 10 words at a time for efficient studying</p>
        </div>
      </div>
    </div>
  </div>
</template>

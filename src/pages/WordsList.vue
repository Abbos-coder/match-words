<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWordStore } from '../entities'
import { Button, Card } from '../shared/ui'

const router = useRouter()
const route = useRoute()
const store = useWordStore()

// Get level info from route query
const levelName = computed(() => route.query.level as string || 'Unknown')
const levelTitle = computed(() => route.query.title as string || '')
const levelIcon = computed(() => route.query.icon as string || '📚')

// If no words, redirect to home
if (store.words.length === 0) {
  router.push('/')
}

const words = computed(() => store.words)
const totalWords = computed(() => words.value.length)

function startMatching() {
  router.push('/match')
}

function goHome() {
  router.push('/')
}

// Group words by first letter for better organization
const groupedWords = computed(() => {
  const groups: { [key: string]: typeof words.value } = {}
  
  words.value.forEach(word => {
    const firstLetter = word.en.charAt(0).toUpperCase()
    if (!groups[firstLetter]) {
      groups[firstLetter] = []
    }
    groups[firstLetter].push(word)
  })
  
  return Object.keys(groups).sort().map(letter => ({
    letter,
    words: groups[letter]
  }))
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-8">
        <Card>
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div class="flex items-center space-x-4">
              <div class="text-5xl">{{ levelIcon }}</div>
              <div>
                <h1 class="text-3xl font-bold text-gray-900">
                  {{ levelName }} - {{ levelTitle }}
                </h1>
                <p class="text-gray-600 mt-1">
                  {{ totalWords }} words to learn
                </p>
              </div>
            </div>
            
            <div class="flex space-x-3 w-full md:w-auto">
              <Button variant="secondary" @click="goHome" class="flex-1 md:flex-none">
                ← Home
              </Button>
              <Button variant="primary" @click="startMatching" class="flex-1 md:flex-none">
                Start Matching 🎮
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow-md p-4 text-center">
          <div class="text-3xl font-bold text-blue-600">{{ totalWords }}</div>
          <div class="text-sm text-gray-600 mt-1">Total Words</div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4 text-center">
          <div class="text-3xl font-bold text-green-600">{{ Math.ceil(totalWords / 10) }}</div>
          <div class="text-sm text-gray-600 mt-1">Lessons</div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4 text-center">
          <div class="text-3xl font-bold text-purple-600">{{ groupedWords.length }}</div>
          <div class="text-sm text-gray-600 mt-1">Letter Groups</div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4 text-center">
          <div class="text-3xl font-bold text-orange-600">{{ levelName }}</div>
          <div class="text-sm text-gray-600 mt-1">Level</div>
        </div>
      </div>

      <!-- Words List -->
      <Card>
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">Complete Word List</h2>
            <Button variant="primary" @click="startMatching" size="sm">
              Start Learning →
            </Button>
          </div>
        </template>

        <div class="space-y-8">
          <!-- Grouped by Letter -->
          <div v-for="group in groupedWords" :key="group.letter" class="space-y-4">
            <!-- Letter Header -->
            <div class="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md z-10">
              <h3 class="text-xl font-bold">{{ group.letter }}</h3>
            </div>

            <!-- Words in this letter group -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="(word, index) in group.words"
                :key="index"
                class="bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 border border-gray-200"
              >
                <div class="flex flex-col space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-lg font-bold text-gray-900">{{ word.en }}</span>
                    <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">EN</span>
                  </div>
                  <div class="h-px bg-gradient-to-r from-blue-200 to-purple-200"></div>
                  <div class="flex items-center justify-between">
                    <span class="text-lg text-gray-700">{{ word.ru }}</span>
                    <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">RU</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-center space-x-4">
            <Button variant="secondary" @click="goHome">
              ← Back to Home
            </Button>
            <Button variant="success" @click="startMatching" class="px-8">
              Start Matching Game 🎯
            </Button>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

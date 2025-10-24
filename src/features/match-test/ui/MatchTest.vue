<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWordStore } from '../../../entities'
import { Button, Card } from '../../../shared/ui'

const router = useRouter()
const store = useWordStore()

if (store.words.length === 0) {
  router.push('/upload')
}

const currentPage = ref(0)
const wordsPerPage = 10

const pairs = computed(() => {
  const start = currentPage.value * wordsPerPage
  const end = start + wordsPerPage
  return store.words.slice(start, end)
})

const shuffledRussian = computed(() => [...pairs.value].sort(() => Math.random() - 0.5))

const hasMoreWords = computed(() => {
  return (currentPage.value + 1) * wordsPerPage < store.words.length
})

const selectedEn = ref<string | null>(null)
const selectedRu = ref<string | null>(null)
const matched = ref<{ en: string; ru: string }[]>([])
const incorrect = ref<{ en: string; ru: string }[]>([])
const score = ref<number>(0)
const attempts = ref<number>(0)

function selectEn(word: string) {
  if (matched.value.some(m => m.en === word)) return
  selectedEn.value = selectedEn.value === word ? null : word
  checkMatch()
}

function selectRu(word: string) {
  if (matched.value.some(m => m.ru === word)) return
  selectedRu.value = selectedRu.value === word ? null : word
  checkMatch()
}

function checkMatch() {
  if (selectedEn.value && selectedRu.value) {
    attempts.value++
    const match = pairs.value.find(p => p.en === selectedEn.value && p.ru === selectedRu.value)
    
    if (match) {
      matched.value.push(match)
      score.value++
      incorrect.value = incorrect.value.filter(i => !(i.en === match.en && i.ru === match.ru))
    } else {
      const incorrectPair = { en: selectedEn.value, ru: selectedRu.value }
      if (!incorrect.value.some(i => i.en === incorrectPair.en && i.ru === incorrectPair.ru)) {
        incorrect.value.push(incorrectPair)
      }
    }
    
    selectedEn.value = null
    selectedRu.value = null
  }
}

function resetGame() {
  matched.value = []
  incorrect.value = []
  selectedEn.value = null
  selectedRu.value = null
  score.value = 0
  attempts.value = 0
  shuffledRussian.value.sort(() => Math.random() - 0.5)
}

function nextPage() {
  currentPage.value++
  matched.value = []
  incorrect.value = []
  selectedEn.value = null
  selectedRu.value = null
  score.value = 0
  attempts.value = 0
}

function goBack() {
  router.push('/')
}

const accuracy = computed(() => {
  return attempts.value > 0 ? Math.round((score.value / attempts.value) * 100) : 0
})

const isGameComplete = computed(() => matched.value.length === pairs.value.length)
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <Card>
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Match Words Game</h1>
            <p class="text-gray-600 mt-1">Match English words with their Russian translations</p>
          </div>
          <Button variant="secondary" @click="goBack">
            ← Back to Home
          </Button>
        </div>
      </template>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-blue-600">{{ score }}</div>
          <div class="text-sm text-blue-600">Correct</div>
        </div>
        <div class="bg-red-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-red-600">{{ attempts - score }}</div>
          <div class="text-sm text-red-600">Incorrect</div>
        </div>
        <div class="bg-green-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-green-600">{{ accuracy }}%</div>
          <div class="text-sm text-green-600">Accuracy</div>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-purple-600">{{ pairs.length - matched.length }}</div>
          <div class="text-sm text-purple-600">Remaining</div>
        </div>
      </div>

      <div v-if="isGameComplete" class="text-center mb-6">
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          <h3 class="text-lg font-semibold">🎉 Congratulations!</h3>
          <p>You've matched all word pairs with {{ accuracy }}% accuracy!</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 md:gap-8">
        <div>
          <h3 class="font-bold text-lg mb-4 text-gray-800">English Words</h3>
          <div class="space-y-2">
            <button
              v-for="item in pairs"
              :key="item.en"
              :disabled="matched.some(m => m.en === item.en)"
              class="w-full p-3 rounded-lg border text-left transition-all duration-200 font-medium"
              :class="{
                'bg-green-200 border-green-400 text-green-800': matched.some(m => m.en === item.en),
                'bg-blue-100 border-blue-400 text-blue-800 shadow-md': selectedEn === item.en,
                'bg-red-100 border-red-300 text-red-700': incorrect.some(i => i.en === item.en),
                'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400': 
                  !matched.some(m => m.en === item.en) && selectedEn !== item.en && !incorrect.some(i => i.en === item.en),
                'opacity-50 cursor-not-allowed': matched.some(m => m.en === item.en)
              }"
              @click="selectEn(item.en)"
            >
              {{ item.en }}
            </button>
          </div>
        </div>

        <!-- Russian Words -->
        <div>
          <h3 class="font-bold text-lg mb-4 text-gray-800">Russian Words</h3>
          <div class="space-y-2">
            <button
              v-for="item in shuffledRussian"
              :key="item.ru"
              :disabled="matched.some(m => m.ru === item.ru)"
              class="w-full p-3 rounded-lg border text-left transition-all duration-200 font-medium"
              :class="{
                'bg-green-200 border-green-400 text-green-800': matched.some(m => m.ru === item.ru),
                'bg-blue-100 border-blue-400 text-blue-800 shadow-md': selectedRu === item.ru,
                'bg-red-100 border-red-300 text-red-700': incorrect.some(i => i.ru === item.ru),
                'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400': 
                  !matched.some(m => m.ru === item.ru) && selectedRu !== item.ru && !incorrect.some(i => i.ru === item.ru),
                'opacity-50 cursor-not-allowed': matched.some(m => m.ru === item.ru)
              }"
              @click="selectRu(item.ru)"
            >
              {{ item.ru }}
            </button>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-center space-x-4">
          <Button variant="secondary" @click="resetGame">
            Reset Game
          </Button>
          <Button v-if="isGameComplete && hasMoreWords" variant="primary" @click="nextPage">
            Next Page →
          </Button>
          <Button v-if="isGameComplete && !hasMoreWords" variant="success" @click="goBack">
            Play Again
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWordStore } from '../../../entities'
import { parseTextFile } from '../../../shared/lib/parseFile'
import { Button, Card } from '../../../shared/ui'

const router = useRouter()
const store = useWordStore()

const isDragOver = ref(false)
const isProcessing = ref(false)
const uploadedWords = ref<{en: string, ru: string}[]>([])
const fileInput = ref<HTMLInputElement>()

function goHome() {
  router.push('/')
}

function onDragEnter(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = true
}

function onDragLeave(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = false
}

function onDragOver(event: DragEvent) {
  event.preventDefault()
}

async function onDrop(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    if (file) {
      await processFile(file)
    }
  }
}

function onFileSelect() {
  fileInput.value?.click()
}

async function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    await processFile(file)
  }
}

async function processFile(file: File) {
  if (!file.type.includes('text')) {
    alert('Please upload a text file')
    return
  }

  isProcessing.value = true
  
  try {
    const words = await parseTextFile(file)
    uploadedWords.value = words
    store.setWords(words)
  } catch (error) {
    alert('Error processing file: ' + error)
  } finally {
    isProcessing.value = false
  }
}

function startMatching() {
  if (uploadedWords.value.length === 0) {
    alert('Please upload words first')
    return
  }
  
  router.push('/match')
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <Card>
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Upload Word Pairs</h1>
            <p class="text-gray-600 mt-2">
              Upload a text file with English-Russian word pairs. Format: "english - russian" (one pair per line)
            </p>
          </div>
          <Button variant="secondary" @click="goHome">
            ← Back to Home
          </Button>
        </div>
      </template>
      
      <!-- File Upload Area -->
      <div
        :class="[
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        ]"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover="onDragOver"
        @drop="onDrop"
      >
        <div class="space-y-4">
          <div class="flex justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div>
            <p class="text-lg text-gray-600">
              Drag and drop your text file here, or
            </p>
            <Button @click="onFileSelect" :disabled="isProcessing" class="mt-2">
              {{ isProcessing ? 'Processing...' : 'Choose File' }}
            </Button>
          </div>
          
          <p class="text-sm text-gray-500">
            Supported format: TXT files with "english - russian" pairs
          </p>
        </div>
      </div>

      <input
        ref="fileInput"
        type="file"
        accept=".txt"
        class="hidden"
        @change="onFileChange"
      />

      <!-- Preview -->
      <div v-if="uploadedWords.length > 0" class="mt-6">
        <h3 class="text-lg font-semibold mb-4">
          Uploaded Words ({{ uploadedWords.length }} pairs)
        </h3>
        
        <div class="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
          <div class="grid gap-2">
            <div
              v-for="(pair, index) in uploadedWords.slice(0, 10)"
              :key="index"
              class="flex justify-between py-2 px-3 bg-white rounded border"
            >
              <span class="font-medium">{{ pair.en }}</span>
              <span class="text-gray-600">-</span>
              <span>{{ pair.ru }}</span>
            </div>
            <div v-if="uploadedWords.length > 10" class="text-center text-gray-500 py-2">
              ... and {{ uploadedWords.length - 10 }} more pairs
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <Button
            variant="success"
            :disabled="uploadedWords.length === 0"
            @click="startMatching"
          >
            Start Matching Game
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>
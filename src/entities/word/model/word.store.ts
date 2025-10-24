import { defineStore } from 'pinia'

export interface WordPair {
  en: string
  ru: string
}

export const useWordStore = defineStore('word', {
  state: () => ({
    words: [] as WordPair[],
  }),
  actions: {
    setWords(newWords: WordPair[]) {
      this.words = newWords
    },
  },
})
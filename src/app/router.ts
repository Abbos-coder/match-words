import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MatchTest from '../features/match-test/ui/MatchTest.vue'
import UploadWords from '../features/upload-words/ui/UploadWords.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/upload'
  },
  {
    path: '/upload',
    name: 'Upload',
    component: UploadWords
  },
  {
    path: '/match',
    name: 'Match',
    component: MatchTest
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
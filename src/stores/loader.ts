import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', () => {
  const loading = ref(false)

  function start() {
    loading.value = true
  }

  function stop() {
    loading.value = false
  }

  return { loading, start, stop }
})

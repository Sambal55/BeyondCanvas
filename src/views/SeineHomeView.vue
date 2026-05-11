<!--HomeView-->

<script setup lang="ts">
import { useTTSStore } from '@/stores/useTTSStore'
import { useGuideStore } from '@/stores/useGuideStore'
import { useRouter } from 'vue-router'
const tts = useTTSStore()
const guide = useGuideStore()
const router = useRouter()

function startAudiobeleving() {
  guide.openGuide()
  router.push('/painting/seine')
}
</script>

<template>
  <div class="center-wrapper">
    <button class="btn" @click="startAudiobeleving">Audiobeleving van La Grenouillère</button>
    <a
      class="btn"
      href="https://chatgpt.com/share/69e8cb17-947c-8329-b4e6-b8c2d505d709"
      target="_blank"
      rel="noopener noreferrer"
      role="button"
      >AI-assistent</a
    >
    <button class="btn" @click="tts.toggle" :aria-pressed="tts.enabled">
      TTS {{ tts.enabled ? 'Aan' : 'Uit' }}
    </button>
  </div>
</template>

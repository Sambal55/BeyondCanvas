<!--HomeView-->

<script setup lang="ts">
import { useTTSStore } from '@/stores/useTTSStore'

const tts = useTTSStore()
</script>

<template>
  <div class="center-wrapper">
    <RouterLink class="btn" to="/painting/seine"> Audiobeleving van La Grenouillère</RouterLink>

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
    </button>  </div>
</template>

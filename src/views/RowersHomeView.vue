<!--HomeView
Where you come only if you remove URL part of Seine or Rowers-->

<script setup lang="ts">
import { useTTSStore } from '@/stores/useTTSStore'

const tts = useTTSStore()
</script>

<template>
  <div class="center-wrapper">
    <RouterLink class="btn" to="/painting/rowers"
      >Audiobeleving van Lunch van de roeiers
    </RouterLink>
    <a
      class="btn"
      role="button"
      href="https://chatgpt.com/share/69e8cbbe-eb98-832b-8c8f-bd457c30165d"
      target="_blank"
      rel="noopener noreferrer"
      >AI-assistent</a
    >
    <button class="btn" @click="tts.toggle" :aria-pressed="tts.enabled">
      TTS {{ tts.enabled ? 'Aan' : 'Uit' }}
    </button>
  </div>
</template>
<style></style>

<!--HomeView-->

<script setup lang="ts">
// import { ref } from 'vue'
// import { useSfxStore } from '@/stores/useSfxStore'
// import { useAmbienceStore } from '@/stores/useAmbienceStore'
import { useTTSStore } from '@/stores/useTTSStore'

// useAmbienceStore().stop()
// useSfxStore().stopAll()
const tts = useTTSStore()

// const showChat = ref(false)

// function openChat() {
//   showChat.value = true
// }

// function closeChat() {
//   showChat.value = false
// }
</script>

<template>
  <div class="center-wrapper">
    <!-- AI-assistent button -->
    <!--    <button class="btn" @click.prevent="showChat = true"> AI-assistent </button>-->

    <!-- ChatAssistant appears after click -->
    <!--    <ChatAssistant-->
    <!--      personality="seine"-->
    <!--      :isOpen="showChat"-->
    <!--      @close="closeChat"-->
    <!--    />-->
    <RouterLink class="btn" to="/painting/seine"> Audiobeleving van La Grenouillère</RouterLink>

    <button
      class="btn"
      href="https://chatgpt.com/share/69e8cb17-947c-8329-b4e6-b8c2d505d709"
      target="_blank"
      rel="noopener noreferrer"
      >AI-assistent</button
    >
    <button class="btn" @click="tts.toggle"> TTS {{ tts.enabled ? 'Aan' : 'Uit' }} </button>
  </div>
</template>

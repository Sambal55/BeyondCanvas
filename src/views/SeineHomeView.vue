<!--HomeView-->

<script setup lang="ts">
// import { ref } from 'vue'
import { useSfxStore } from '@/stores/useSfxStore'
import { useAmbienceStore } from '@/stores/useAmbienceStore'

useAmbienceStore().stop()
useSfxStore().stopAll()

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
    <a
      class="btn"
      href="https://chatgpt.com/share/69e8cb17-947c-8329-b4e6-b8c2d505d709"
      target="_blank"
      rel="noopener noreferrer"
      >AI-assistent</a
    >

    <RouterLink class="btn" to="/painting/seine"> Audiobeleving van La Grenouillère</RouterLink>
  </div>
</template>

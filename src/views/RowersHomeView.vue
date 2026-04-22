<!--HomeView
Where you come only if you remove URL part of Seine or Rowers-->

<script setup lang="ts">
import { useSfxStore } from '@/stores/useSfxStore'
import { useAmbienceStore } from '@/stores/useAmbienceStore'
// import { ref } from 'vue'
// no grid, because no painting
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
      href="https://chatgpt.com/share/69e8cbbe-eb98-832b-8c8f-bd457c30165d"
      target="_blank"
      rel="noopener noreferrer"
      >AI-assistent</a
    >

    <RouterLink class="btn" to="/painting/rowers"
      >Audiobeleving van Lunch van de roeiers
    </RouterLink>
  </div>
</template>
<style></style>

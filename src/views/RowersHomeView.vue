<!--HomeView
Where you come only if you remove URL part of Seine or Rowers-->

<script setup lang="ts">
import { useSfxStore } from '@/stores/useSfxStore'
import { useAmbienceStore } from '@/stores/useAmbienceStore'
// no grid, because no painting
useAmbienceStore().stop()
useSfxStore().stopAll()
</script>

<template>
  <div class="center-wrapper">
    <!--  Specific AI for La Grenouillère-->
      <a
        class="btn"
        href="https://copilot.microsoft.com/chats/mX8dtse5iZwJzu6LE8Rkv"
        target="_blank"
        rel="noopener noreferrer"
      >AI-assistent</a>

    <RouterLink class="btn" to="/painting/rowers">Audiobeleving van Lunch van de roeiers</RouterLink>
  </div>
</template>
<style></style>

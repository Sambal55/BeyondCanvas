<script setup>
import { RouterView, RouterLink } from 'vue-router'
import AudioManager from '@/system/AudioManager.vue'
</script>

<template>
  <AudioManager/>
  <RouterLink to="/">Home</RouterLink>
  <br />
  <RouterView />
</template>

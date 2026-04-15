<script setup>
import { storeToRefs } from 'pinia'
import { useImportantStore } from '@/stores/useImportantStore'

const store = useImportantStore()
const { activeCube: cube, isVisible } = storeToRefs(store)

function closePopup() {
  store.clearImportantCube()
}
</script>

<template>
  <div v-if="isVisible" class="important-popup">
    <button class="close-btn" @click="closePopup">×</button>
    <h2 style="border: 1px solid greenyellow">Informatie</h2>
    <p style="border: 1px solid blueviolet">{{ cube?.importantCubeInfo }}</p>
  </div>
</template>

<style scoped>
.important-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: white;
  padding: 2px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);

  max-width: 80%;
  z-index: 99999;

  animation: fadeIn 0.2s ease-out;
}


.close-btn {
  position: absolute;
  top: 8px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 22px;
  cursor: pointer;

}
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useImportantStore } from '@/stores/useImportantStore'
import { onMounted, onUnmounted, ref } from 'vue'

const store = useImportantStore()
const { activeCube: cube, isVisible } = storeToRefs(store)

const popupRef = ref(null)

function closePopup() {
  store.clearImportantCube()
}

function handleClickOutside(event) {
  if (popupRef.value && !popupRef.value.contains(event.target)) {
    closePopup()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div v-if="isVisible" class="important-popup" ref="popupRef">
    <div class="header-row">
      <h1>{{ cube?.importantCubeInfo?.title || 'Informatie' }}</h1>
      <button class="btn close-btn" @click="closePopup">Sluiten</button>
    </div>
    <div class="description-container">
      <p class="popupText">
        {{ cube?.importantCubeInfo?.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.important-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: black;
  padding: 2px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px black;

  max-width: 80%;
  z-index: 95;
  color: yellow;
  animation: fadeIn 0.2s ease-out;
}

.description-container {
  max-height: 50vh;
  overflow-y: auto;
  padding-right: 10px;
}
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
</style>

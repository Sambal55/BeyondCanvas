<script setup>
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
    <button class="close-btn" @click="closePopup">×</button>

    <h2>{{ cube?.importantCubeInfo?.title || 'Informatie' }}</h2>

    <div class="description-container">
      <p class="description">
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

  background: yellow;
  padding: 2px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px black;

  max-width: 80%;
  z-index: 95;

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

.description-container {
  max-height: 50vh; /* of 40vh, wat jij wilt */
  overflow-y: auto;
  padding-right: 10px; /* ruimte voor scrollbar */
}
</style>

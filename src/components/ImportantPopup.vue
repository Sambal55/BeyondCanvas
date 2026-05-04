<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useImportantStore } from '@/stores/useImportantStore'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const store = useImportantStore()
const { activeCube: cube, isVisible } = storeToRefs(store)

const popupRef = ref<HTMLElement | null>(null)
let previouslyFocusedElement: HTMLElement | null = null

function closePopup() {
  store.clearImportantCube()

  // Focus terugzetten naar waar de gebruiker was
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus()
  }
}

function handleClickOutside(event: Event) {
  if (popupRef.value && !popupRef.value.contains(event.target as Node)) {
    closePopup()
  }
}

// ESC sluit popup
function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && isVisible.value) {
    closePopup()
  }
}

watch(isVisible, (visible) => {
  if (visible) {
    previouslyFocusedElement = document.activeElement as HTMLElement

    requestAnimationFrame(() => {
      popupRef.value?.focus()
    })
  }
})

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div
    v-if="isVisible"
    class="important-popup"
    ref="popupRef"
    tabindex="0"
    role="dialog"
    aria-modal="true"
    aria-labelledby="important-title"
  >
    <div class="header-row">
      <h1 id="important-title">
        {{ cube?.importantCubeInfo?.title || 'Informatie' }}
      </h1>

      <button class="btn close-btn" @click="closePopup">
        Sluiten
      </button>
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

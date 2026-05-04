<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGuideStore } from '@/stores/useGuideStore'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { speak } from '@/utils/TTShelper'
import { useTTSStore } from '@/stores/useTTSStore'

const store = useGuideStore()
const { isVisible } = storeToRefs(store)

const popupRef = ref<HTMLElement | null>(null)
let previouslyFocusedElement: HTMLElement | null = null

const guideText = `
Welkom bij de audiobeleving. Dit is de handleiding die in het kort vertelt hoe u door deze
audiobeleving kunt navigeren. U hoort geluiden zodra de audiobeleving start. Deze audiogeluiden
beschrijven de omgeving van het schilderij, alsof u zich in het schilderij bevindt. Door te scrollen
(boven, beneden, links, rechts), kunt u over het schilderij bewegen, u kunt niet verder in- of uitzoomen. Zodra u een vibratie van de
telefoon voelt, betekent dat dat er informatie te lezen is op het scherm, over iets wat op het
schilderij plaatsvindt. Als u zich aan het einde van het schilderij bevindt, hoort u "Eind" en
vervolgens de kant van het schilderij waarvan u het einde hebt bereikt. Bovenaan de pagina is een
terugknop te vinden, die u terugbrengt naar het hoofdmenu. Daarnaast een progressiebalk om aan te geven hoeveel informatie pop-ups u al heeft gezien.
Veel plezier!
`

function closePopup() {
  speechSynthesis.cancel()
  store.closeGuide()

  // reset focus to where user previously was
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus()
  }
}

function handleClickOutside(e: Event) {
  if (popupRef.value && !popupRef.value.contains(e.target as Node)) {
    closePopup()
  }
}

watch(isVisible, (visible) => {
  if (visible) {
    previouslyFocusedElement = document.activeElement as HTMLElement

    const tts = useTTSStore()
    if (tts.enabled) {
      speak('Handleiding. ' + guideText)
    }

    requestAnimationFrame(() => {
      popupRef.value?.focus()
    })
  } else {
    speechSynthesis.cancel()
  }
})

onMounted(() => {
  const container = document.querySelector('.scroll-container') as HTMLElement

  document.addEventListener('mousedown', handleClickOutside)
  if (container instanceof HTMLElement) {
    container.addEventListener('scroll', handleClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  speechSynthesis.cancel()
})
</script>

<template>
  <div
    v-if="isVisible"
    class="guide-popup"
    ref="popupRef"
    tabindex="0"
    role="dialog"
    aria-modal="true"
    aria-labelledby="guide-title"
  >
    <section>
      <div class="header-row">
        <h1 id="guide-title">Handleiding</h1>
        <button class="btn close-btn" @click="closePopup">Sluiten</button>
      </div>

      <div class="content popupText">
        <p>{{ guideText }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.guide-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: black;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px black;
  max-width: 80%;
  z-index: 95;
  color: yellow;
  animation: fadeIn 0.2s ease-out;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.close-btn {
  all: unset;
  font-family: inherit;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 6px 12px;
  color: blue;
  background: yellow;
  border-radius: 8px;
}

.close-btn:hover {
  background: blue;
  color: yellow;
}

.content {
  margin-top: 1rem;
  max-height: 50vh;
  overflow-y: auto;
}
</style>

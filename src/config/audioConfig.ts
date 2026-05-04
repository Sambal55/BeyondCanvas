import { AmbienceZone } from '@/types/grid'

export const audioConfig = {
  ambienceDuckedVolume: 0.3,

  sfxBaseVolume: 1,

  fadeDuration: {
    crossfade: 400,
    duckDuration: 150,
    restoreDuration: 300,
    sfxFadeOut: 300,
  },

  ambienceVolume: {
    sky: 0.4,
    leaves: 0.9,
    water: 1,
    people: 0.4,
  } satisfies Record<AmbienceZone, number>,
} as const

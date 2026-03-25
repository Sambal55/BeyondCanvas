import { writeFileSync } from 'fs'
import rowerGridLabels from '../data/rowerGridLabels.json'

const audioMap: Record<string, string[]> = {
  sky: [
    'bike_breeze.mp3',
    'morningbreeze_birds.mp3',
    'outside_terrace.mp3',
    'sky1.mp3',
    'wind_leaves.mp3',
  ],
  leaves: ['rustling_leaves.mp3', 'rustling_leaves2.mp3', 'tree_branch.mp3', 'wind_leaves.mp3'],
  drinkingGirl: ['sipping_wine.mp3'],
  personTogether: ['crowd_background.mp3', 'people_chatter_with_baby.mp3', 'terrace_chatter.mp3'],
  personAlone: ['male_slow_breathing.mp3'],
  clothing: ['clothing_rustle.mp3'],
  dog: ['dog_barking.mp3', 'dog_breathing.mp3'],
  food: [],
  drink: [
    'clinking_bottles.mp3',
    'glass_clink.mp3',
    'wine_glass.mp3',
    'wine_glass_clink.mp3',
    'wine_opening.mp3',
  ],
  wood: [],
  sunshade: ['flag_flapping.mp3', ' flag_flapping_with_metal.mp3'],
  tablecloth: ['tablecloth_underside.mp3'],
}

function getAudio(label: string): string | null {
  const sounds = audioMap[label]
  if (!sounds || sounds.length === 0) return null
  return sounds[Math.floor(Math.random() * sounds.length)]
}

function generateGridJson(
  painting: any,
  cubeSize: number,
  gridLabels: { x: number; y: number; label: string }[],
) {
  const columns = Math.floor(painting.dimensions.width / cubeSize)
  const rows = Math.floor(painting.dimensions.height / cubeSize)
  const totalCubes = columns * rows

  const cubes = Array.from({ length: totalCubes }, (_, index) => {
    const x = index % columns
    const y = Math.floor(index / columns)
    const labelEntry = gridLabels.find((l) => l.x === x && l.y === y)
    const label = labelEntry?.label ?? null
    const audio = label ? getAudio(label) : null

    return {
      id: index + 1,
      isImportant: false,
      importantCubeInfo: null,
      label,
      audio,
      position: { x, y },
    }
  })

  return { painting, cubeSize: { width: cubeSize, height: cubeSize }, columns, rows, cubes }
}

const rowersGrid = generateGridJson(
  {
    id: 1,
    name: 'La Grenouillère',
    dimensions: { width: 2000, height: 1441 },
  },
  100,
  rowerGridLabels,
)

// const seineGrid = generateGridJson(
//   {
//     id: 2,
//     name: 'Luncheon of the Boating Party',
//     dimensions: { width: 2000, height: 1612 },
//   },
//   100,
//
// )

writeFileSync('src/data/rowerGrid.json', JSON.stringify(rowersGrid, null, 2))
// writeFileSync('src/data/seine.json', JSON.stringify(seineGrid, null, 2))

console.log('✅ JSON bestanden aangemaakt!')

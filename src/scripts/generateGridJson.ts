/**
 * @author  Lisa Welling
 *
 * Script that generates grid for painting in JSON format
 * See README on how to use this script
 */
import { writeFileSync } from 'fs'
import { Painting } from '../types/painting'
import { Grid, GridCube } from '../types/grid'
import rowerGridLabels from '../data/rowerGridLabels.json'
// import seineGridLabels from '../data/seineGridLabels.json'

const paintingPath = 'public/assets/images/rowers.jpg'
// const paintingPath = 'public/assets/images/seine.jpg'

const audioMap: Record<string, string[]> = {
  sky: [
    'bike_breeze.mp3',
    'morningbreeze_birds.mp3',
    'outside_terrace.mp3',
    'sky1.mp3',
    'wind_leaves.mp3'
  ],
  leaves: ['rustling_leaves.mp3', 'rustling_leaves2.mp3', 'tree_branch.mp3', 'wind_leaves.mp3'],
  drinkingGirl: ['sipping_wine.mp3'],
  dogGirl: ['pss_pssst.mp3'],
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
    'wine_opening.mp3'
  ],
  glass: ['wine_glass_clink.mp3', 'wine_glass.mp3', 'glass_clink.mp3'],
  wood: [],
  sunshade: ['flag_flapping.mp3', ' flag_flapping_with_metal.mp3'],
  tablecloth: ['tablecloth_underside.mp3'],
  water: [],
  // TODO same sound as leaves?
  tree: [],
  // TODO a bit of a dumb label
  shadow: [],
  // TODO probably just water reflections
  reflection: [],
  boat: [],
  hat: [],
  swimmer: [],
  dock: [],
  cafe: [],
  sign: [],
  // TODO make this personTogether or personAlone
  person: [],
  nothing: []
}
// Saves which sounds have already been chosen for certain labels
const fixedSoundCache: Record<string, string> = {}

// TODO
// Adjoning gridCubbes should have same sound for all
// this could mean that the fixedcache is not nessacary because sky is always touching other skyblock
// if no adjoning same box/sound then random
function getAudio(label: string): string | null {
  const sounds = audioMap[label]
  if (!sounds || sounds.length === 0) return null

  // Labels which always require same sounds for consistency
  const fixedLabels = ['sky', 'sunshade', 'dog', 'leaves']

  if (fixedLabels.includes(label)) {
    // If a sound is already picked, then use that sound
    if (fixedSoundCache[label]) {
      return fixedSoundCache[label]
    }

    // For sounds with fixedLabel and no chosen sound yet
    const chosen = sounds[Math.floor(Math.random() * sounds.length)]
    fixedSoundCache[label] = chosen
    return chosen
  }

  // For all other labels choose random sound, possible every time diff sound
  return sounds[Math.floor(Math.random() * sounds.length)]
}

function generateGridJson(
  painting: Painting,
  cubeSize: number,
  gridLabels: { x: number; y: number; label: string }[]
): Grid {
  const columns = Math.floor(painting.paintingSize.width / cubeSize)
  const rows = Math.floor(painting.paintingSize.height / cubeSize)
  const totalCubes = columns * rows

  const cubes: GridCube[] = Array.from({ length: totalCubes }, (_, index) => {
    const x = index % columns
    const y = Math.floor(index / columns)
    const labelEntry = gridLabels.find((l) => l.x === x && l.y === y)
    const label = labelEntry?.label ?? null
    const audio = label ? getAudio(label) : null

    return {
      id: index + 1,
      isImportant: false,
      importantCubeInfo: null,
      audio,
      cubeSize: { width: cubeSize, height: cubeSize },
      position: { x, y }
    }
  })

  return {
    painting,
    columns,
    rows,
    cubeSize: { width: cubeSize, height: cubeSize },
    cubes
  }
}

//
const generation = generateGridJson(
  {
    id: 1,
    year: null,
    artform: null,
    imagePath: paintingPath,
    name: 'La Grenouillère',
    paintingSize: { width: 2000, height: 1441 },
  },
  100,
  rowerGridLabels,
)
// const generationSeine = generateGridJson(
//   {
//     id: 1,
//     year: null,
//     artform: null,
//     imagePath: paintingPath,
//     name: 'Luncheon of the Boating Party',
//     paintingSize: { width: 2000, height: 1441 }
//   },
//   100,
//   seineGridLabels
// )

writeFileSync('src/data/rowerGrid.json', JSON.stringify(generation, null, 2))
// writeFileSync('src/data/seineGrid.json', JSON.stringify(generationSeine, null, 2))

console.log('JSON FILES MADE')

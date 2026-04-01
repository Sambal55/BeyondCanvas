import { writeFileSync } from 'fs'
import { Painting } from '../types/painting'
import { Grid, GridCube } from '../types/grid'
import rowerGridLabels from '../data/rowerGridLabels.json'

/**
 * Plan for making this work:
 * 1. create a json with AI (claud epreferably) and use this prompt
 * Describe this painting in 280 short labels (no sentences), in a 20×14 grid.
 * Use exact coordinates (x,y).
 * Use only categories such as: water, leaves, tree, sky, boat, person, clothing, wood, grass, reflection, shadow, wind, food, drink, dog, animal
 * and put this in JSON format
 *  as attachment put the painting img
 *
 *  2. you recieve json in this format
 *    {
 *     "x": 0,
 *     "y": 0,
 *     "label": "sunshade"
 *   },
 *
 *   3. import the label JSON file (not vue path but normal path) and put it in the format of the generation const
 *  4. Adjust const paintingPath to path of the image you are trying to grid
 * 4. Add new labels which don't exist yet (but do exist in labelJSON) to the audioMap Record
 * 5. You could also add new sounds to existing labels
 * 6. Run script with     node scripts/generateGrid.js
 */

const paintingPath = 'public/assets/images/rowers.jpg'

// TODO use one random sound for objects such as sunshade and sky, so the object dont change sound when entering diff cube
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
// Saves which sounds have already been chosen for certain labels
const fixedSoundCache: Record<string, string> = {}

function getAudio(label: string): string | null {
  const sounds = audioMap[label]
  if (!sounds || sounds.length === 0) return null

  // Labels which always require same sounds for consistency
  const fixedLabels = ['sky', 'sunshade', 'dog']

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
  gridLabels: { x: number; y: number; label: string }[],
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
      position: { x, y },
    }
  })

  return {
    painting,
    columns,
    rows,
    cubeSize: { width: cubeSize, height: cubeSize },
    cubes,
  }
}

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

// const seineGrid = generateGridJson(
//   {
//     id: 2,
//     name: 'Luncheon of the Boating Party',
//     dimensions: { width: 2000, height: 1612 },
//   },
//   100,
//
// )

// make files
writeFileSync('src/data/rowerGrid.json', JSON.stringify(generation, null, 2))
// writeFileSync('src/data/seine.json', JSON.stringify(seineGrid, null, 2))

console.log('JSON FILES MADE')

/**
 * @author Lisa Welling
 *
 * Script that generates grid for a painting in JSON format
 * Based on label → zone mapping
 */

import { writeFileSync } from 'fs'
import { Painting } from '@/types/painting'
import { Grid, GridCube, Size } from '@/types/grid'
import rowerGridLabels from '../data/json/rowerGridLabels.json'
import { getZoneForLabel } from '../utils/zoneHelper'

const paintingPath = 'public/assets/images/rowers.jpg'

function generateGridJson(
  painting: Painting,
  cubeSize: Size,
  gridLabels: { x: number; y: number; label: string }[],
): Grid {
  const columns = Math.floor(painting.paintingSize.width / cubeSize.width)
  const rows = Math.floor(painting.paintingSize.height / cubeSize.height)
  const totalCubes = columns * rows

  const cubes: GridCube[] = Array.from({ length: totalCubes }, (_, index) => {
    const x = index % columns
    const y = Math.floor(index / columns)

    const labelEntry = gridLabels.find((l) => l.x === x && l.y === y)
    const label = labelEntry?.label ?? null
    const zone = getZoneForLabel(label)

    return {
      id: index + 1,
      isImportant: false,
      importantCubeInfo: null,
      label: label ?? 'nothing',
      zone: zone ?? 'none',
      position: { x, y },
    }
  })

  return {
    painting,
    columns,
    rows,
    cubeSize,
    cubes,
  }
}

// Generate JSON for rowers
const generation = generateGridJson(
  {
    id: 1,
    year: null,
    artform: null,
    imagePath: paintingPath,
    name: 'Luncheon of the Boating Party',
    paintingSize: { width: 2000, height: 1441 },
  },
  {width: 100, height: 100},
  rowerGridLabels,
)

writeFileSync('src/data/json/rowerGrid.json', JSON.stringify(generation, null, 2))

console.log('JSON FILES MADE')

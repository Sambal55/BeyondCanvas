/**
 * @author Lisa Welling
 *
 * Script that generates grid for a painting in JSON format
 * Based on label → zone mapping
 *
 * You first have to have a Label JSON which you can generate via AI
 * For instructions on how to do so, see the README file.
 *
 * importantCubeInfo is preserved from the override files:
 *   - rowerImportantCubes.json
 *   - seineImportantCubes.json
 * Edit those files to add/update important cube descriptions.
 * Re-running this script will never overwrite that data.
 */

import { writeFileSync } from 'fs'
import { Painting } from '@/types/painting'
import { Grid, GridCube, Size } from '@/types/grid'
import rowerGridLabels from '../data/json/rowerGridLabels.json'
import seineGridLabels from '../data/json/seineGridLabels.json'
import rowerImportantCubes from '../data/json/rowerImportantCubes.json'
import seineImportantCubes from '../data/json/seineImportantCubes.json'
import { getZoneForLabel } from '../utils/zoneHelper'

const rowersPath = './assets/images/rowers.jpg'
const seinePath = './assets/images/seine.jpg'

type ImportantCubeOverride = {
  position: { x: number; y: number }
  importantCubeInfo: { title: string; description: string }
}

function applyImportantCubeOverrides(
  cubes: GridCube[],
  overrides: ImportantCubeOverride[],
): GridCube[] {
  return cubes.map((cube) => {
    const override = overrides.find(
      (o) => o.position.x === cube.position.x && o.position.y === cube.position.y,
    )
    if (override) {
      return { ...cube, importantCubeInfo: override.importantCubeInfo }
    }
    return cube
  })
}

function generateGridJson(
  painting: Painting,
  cubeSize: Size,
  gridLabels: { x: number; y: number; label: string }[],
  importantCubeOverrides: ImportantCubeOverride[],
): Grid {
  const columns = Math.floor(painting.paintingSize.width / cubeSize.width)
  const rows = Math.floor(painting.paintingSize.height / cubeSize.height)
  const totalCubes = columns * rows

  const cubes: GridCube[] = Array.from({ length: totalCubes }, (_, index) => {
    const x = index % columns
    const y = Math.floor(index / columns)

    const labelEntry = gridLabels.find((l) => l.x === x && l.y === y)
    const label = labelEntry?.label ?? null
    const zone = getZoneForLabel(label) ?? null

    return {
      id: index + 1,
      importantCubeInfo: null,

      // If accidentally there is no label connected to zone or no label in mapping
      label: label ?? null,
      zone: zone ?? null,
      position: { x, y },
    }
  })

  const cubesWithOverrides = applyImportantCubeOverrides(cubes, importantCubeOverrides)

  return {
    painting,
    columns,
    rows,
    cubeSize,
    cubes: cubesWithOverrides,
  }
}

// Generate JSON for rowers
const generateRowersGrid = generateGridJson(
  {
    id: 1,
    year: null,
    artform: null,
    imagePath: rowersPath,
    name: 'Lunch van de roeiers',
    paintingSize: { width: 2000, height: 1400 },
  },
  { width: 100, height: 100 },
  rowerGridLabels,
  rowerImportantCubes,
)

const generateSeineGrid = generateGridJson(
  {
    id: 1,
    year: null,
    artform: null,
    imagePath: seinePath,
    name: 'La Grenouillèrey',
    paintingSize: { width: 2000, height: 1400 },
  },
  { width: 100, height: 100 },
  seineGridLabels,
  seineImportantCubes,
)

writeFileSync('src/data/json/rowerGrid.json', JSON.stringify(generateRowersGrid, null, 2))
writeFileSync('src/data/json/seineGrid.json', JSON.stringify(generateSeineGrid, null, 2))

console.log('JSON FILES MADE')

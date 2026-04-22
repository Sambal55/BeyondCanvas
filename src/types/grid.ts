import { Painting } from '@/types/painting'
import { ambienceMap } from '@/data/mappings/ambienceMap'
export interface GridCube {
  id: number
  importantCubeInfo: ImportantCubeInfo | null
  label: string | null // Map eventSound based on zone
  zone: AmbienceZone | null // Map ambienceSound based on zone
  position: Position
}

export interface Position {
  x: number
  y: number
}

export interface ImportantCubeInfo {
  title: string
  description: string
}

export interface Grid {
  painting: Painting
  columns: number // number of cubes in width
  rows: number // number of cubes in height
  cubes: GridCube[]
  cubeSize: Size
}

// size in pixels
export interface Size {
  width: number // number of pixels in width
  height: number // number of pixels in height
}
export type AmbienceZone = keyof typeof ambienceMap

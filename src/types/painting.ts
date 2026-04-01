import { Size } from '@/types/grid'

export interface Painting {
  id: number
  name: string
  year: string | null
  paintingSize: Size
  artform: string | null
  imagePath: string
}

export interface Painter {
  id: number
  name: string
  dateOfBirth: string | null
}

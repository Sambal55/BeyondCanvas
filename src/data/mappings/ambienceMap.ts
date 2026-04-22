/**
 * @author Lisa Welling
 *
 * Here we choose the ambience sound which belongs to the zone.
 * We also have a mapping of which labels of sounds belong to which zone.
 * So the flow is:
 * Label --> zone --> Ambient sound
 *
 * This way the ambient sound src does not have to exist in the gridCube
 */
export const zoneLabelsMap: Record<string, string[]> = {
  sky: ['sky', 'sunshade'],
  leaves: ['leaves', 'tree'],
  people: [
    'personTogether',
    'personTogether',
    'personAlone',
    'drinkingGirl',
    'dogGirl',
    'dog',
    'drink',
    'glass',
    'tablecloth',
    'clothing',
    'dress',
    'food',
    'wood',
    'cafe',
    'woman',
  ],
  water: ['water', 'boat', 'swimmer', 'jetty', 'sail'],
}

// As AmbienceZone types in @types/grid.ts
export const ambienceMap = {
  sky: 'morningbreeze_birds.mp3',
  leaves: 'rustling_leaves.mp3',
  people: 'crowd_backgrond.mp3',
  water: 'lakesound.mp3',
} as const




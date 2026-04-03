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
    'food',
    'wood',
    'cafe'
  ],
  water: ['water', 'waterTogether', 'boat'],
}

export const ambienceMap: Record<string, string> = {
  sky: 'ambience_sky.mp3',
  leaves: 'ambience_leaves.mp3',
  people: 'ambience_people.mp3'
}

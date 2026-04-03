/**
 * @author Lisa Welling
 *
 * Choose eventSound based on label in GridCube.
 *
 */

const eventSoundMap: Record<string, string[]> = {
  sky: [
    'bike_breeze.mp3',
    'morningbreeze_birds.mp3',
    'outside_terrace.mp3',
    'sky1.mp3',
    'wind_leaves.mp3',
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
    'wine_opening.mp3',
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
  signature: [],
  jetty: [],
  building: [],
  foliage: [],
  dress: [],
  sign: [],
  // TODO make this personTogether or personAlone
  person: [],
  simmer: [],
}

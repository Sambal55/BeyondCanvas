/**
 * @author Lisa Welling
 *
 * Choose SFX sound based on label in GridCube.
 *
 * Add new labels to SFXSoundMap, with the corresponding audio. in the brackets.
 * The audiofile must be placed inside public/assets/audio.
 *
 * Example new labels:
 * You created a new zone in ambienceMap and zoneLabelsMap called city.
 * City has 2 corresponding labels: taxi and plane.
 * Add taxi and plane to the SFXSoundMap record like this:
 * taxi: ['taxi_honk.mp3'],
 * plane: ['overhead_plane.mp3']
 *
 * Then go to the ambienceMap and add the labels to the zone, see instructions in ambienceMap.ts.
 */

export const SFXSoundMap: Record<string, string[]> = {
  sky: [],
  leaves: [],
  drinkingGirl: ['sipping_wine.mp3'],
  dogGirl: ['pss_pssst.mp3'],
  personTogether: [],
  personAlone: ['male_slow_breathing.mp3'],
  clothing: [],
  dog: ['dog_barking.mp3', 'dog_breathing.mp3'],
  food: [],
  drink: ['clinking_bottles.mp3', 'wine_opening.mp3'],
  glass: ['wine_glass_clink.mp3', 'wine_glass.mp3', 'glass_clink.mp3'],
  wood: [],
  sunshade: ['flag_flapping_with_metal.mp3'],
  tablecloth: ['flag_flapping.mp3'],
  water: [],
  tree: [],
  boat: ['boat_creak.mp3'],
  swimmer: ['swimmer.mp3'],
  signature: [],
  jetty: [],
  building: [],
  dress: [],
  sign: [],
  sail: ['flag_flapping_with_metal.mp3', 'flag_flapping.mp3'],
  woman: ['womanlaugh.mp3'],
  splash: ['water_splash.mp3'],
}

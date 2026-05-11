import { zoneLabelsMap } from '../data/mappings/ambienceMap'
import { AmbienceZone } from '../types/grid'

/**
 * @author Lisa Welling
 * Matches each zone to a corresponding label using zoneLabelsMap
 * @param label for which a zone must be found
 */
export function getZoneForLabel(label: string | null): AmbienceZone | null {
  if (!label) return null

  for (const zone of Object.keys(zoneLabelsMap) as AmbienceZone[]) {
    if (zoneLabelsMap[zone].includes(label)) {
      return zone
    }
  }

  return null
}

import {zoneLabelsMap} from '../data/mappings/ambienceMap'

export function getZoneForLabel(label: string | null): string | null {
  if (!label) return null

  for (const zone in zoneLabelsMap) {
    if (zoneLabelsMap[zone].includes(label)) {
      return zone
    }
  }

  return null
}

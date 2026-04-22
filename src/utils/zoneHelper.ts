import { zoneLabelsMap } from '@/data/mappings/ambienceMap'
import { AmbienceZone } from '@/types/grid'

export function getZoneForLabel(label: string | null): AmbienceZone | null {
  if (!label) return null

  for (const zone of Object.keys(zoneLabelsMap) as AmbienceZone[]) {
    if (zoneLabelsMap[zone].includes(label)) {
      return zone
    }
  }

  return null
}

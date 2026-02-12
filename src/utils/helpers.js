import { HORSE_NAMES, CONDITION_MIN, HORSE_COUNT } from '@/utils/constants.js'
import { cloneDeep } from 'lodash'

const GET_RANDOM_COLOR = () => {
  const min = 50
  const max = 200

  const r = Math.floor(Math.random() * (max - min) + min)
  const g = Math.floor(Math.random() * (max - min) + min)
  const b = Math.floor(Math.random() * (max - min) + min)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
const GET_ROUND_TITLE = (idx) => {
  switch (idx) {
    case 0:
      return '1st Lap'
    case 1:
      return '2nd Lap'
    case 2:
      return '3rd Lap'
    case 3:
    case 4:
    case 5:
      return `${idx + 1}th Lap`
    default:
      return 'Unknown Lap'
  }
}


export const SELECT_RANDOM_HORSES = (HORSE_LIST) => {
  const shuffled = cloneDeep(HORSE_LIST).sort(() => 0.5 - Math.random())?.map((i, idx) => ({ ...i, position: idx + 1 }))
  return shuffled.slice(0, HORSE_COUNT)
}

export const SELECT_HORSES_WITH_RANDOM_CONDITION = (HORSE_LIST) => {
  const randomizedCondition = cloneDeep(HORSE_LIST)?.map((i, idx) => ({ ...i, condition: GENERATE_RANDOM_CONDITION(CONDITION_MIN, 90)}))
  return randomizedCondition.slice(0, HORSE_COUNT)
}

export const GENERATE_RANDOM_HORSES = () => {
  return Array.from({ length: HORSE_COUNT }, (_, i) => ({
    id: i + 1,
    name: HORSE_NAMES[i],
    color: GET_RANDOM_COLOR(),
    condition: GENERATE_RANDOM_CONDITION(CONDITION_MIN, 90)
  }))
}

export const GENERATE_RANDOM_CONDITION = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const GENERATE_ROUNDS_OF_PROGRAM = (HORSE_LIST) => {
  return Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: GET_ROUND_TITLE(i),
    distance: 1200 + (i * 200),
    isFinished: false,
    isActive: i === 0, 
    horses: SELECT_HORSES_WITH_RANDOM_CONDITION(HORSE_LIST)
  }))
}


export const CALCULATE_DURATION = (distance, containerWidth, speed) => {
  const scalingFactor = containerWidth / 1000 
  const duration = (distance / speed) * scalingFactor
  return Math.round(duration)
}

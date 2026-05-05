import type { GameState } from './types'
export const getMeleeBonus = (state:GameState, crewId:string) => state.runtimeCards.some(c=>c.id==='assault-marine'&&c.crewId===crewId)?1:0

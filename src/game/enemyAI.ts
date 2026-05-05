import type { GameState, PlannedAction } from './types'
import { buildAction } from './actions'

export function generateEnemyActions(state: GameState): PlannedAction[] {
  const actions: PlannedAction[] = []
  const enemy = state.ships.enemy
  const playerRooms = Object.values(state.ships.player.rooms)
  const damaged = playerRooms.filter(r=>r.hp<r.maxHp)
  const target = (damaged[0] ?? playerRooms[Math.floor(Math.random()*playerRooms.length)])?.id
  Object.values(enemy.crew).forEach((c,i)=>{
    if (c.hp < c.maxHp && i===0) actions.push(buildAction('enemy', c.id, 'repair', c.roomId))
    else if (target) actions.push(buildAction('enemy', c.id, i===0?'weapon':'melee', target))
  })
  return actions
}

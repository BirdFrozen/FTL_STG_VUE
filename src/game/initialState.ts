import type { GameState, PlayerId, ShipState } from './types'

const mkShip = (owner: PlayerId): ShipState => {
  const prefix = owner === 'player' ? 'p' : 'e'
  return {
    id: `${prefix}-ship`, owner, name: owner === 'player' ? '玩家舰船' : '敌方舰船', hull: 8,
    rooms: {
      [`${prefix}-bridge`]: { id: `${prefix}-bridge`, name: '驾驶舱', x: 0, y: 0, width: 1, height: 1, hp: 4, maxHp: 4, oxygen: 4, maxOxygen: 4, systemIds:[`${prefix}-shield`], crewIds:[] },
      [`${prefix}-weapon`]: { id: `${prefix}-weapon`, name: '武器舱', x: 1, y: 0, width: 1, height: 1, hp: 4, maxHp: 4, oxygen: 4, maxOxygen: 4, systemIds:[`${prefix}-laser`], crewIds:[] },
      [`${prefix}-engine`]: { id: `${prefix}-engine`, name: '引擎室', x: 0, y: 1, width: 2, height: 1, hp: 5, maxHp: 5, oxygen: 4, maxOxygen: 4, systemIds:[`${prefix}-gen`], crewIds:[] }
    },
    crew: {
      [`${prefix}-crew-a`]: { id:`${prefix}-crew-a`, name:'船员A', owner, hp:3, maxHp:3, roomId:`${prefix}-bridge`, actionsPerTurn:1, usedMainAction:false, usedMinorAction:false, tags:['assault'] },
      [`${prefix}-crew-b`]: { id:`${prefix}-crew-b`, name:'船员B', owner, hp:3, maxHp:3, roomId:`${prefix}-engine`, actionsPerTurn:1, usedMainAction:false, usedMinorAction:false }
    },
    systems: {
      [`${prefix}-shield`]: { id:`${prefix}-shield`, name:'护盾发生器', type:'shield', roomId:`${prefix}-bridge`, hp:3, maxHp:3, enabled:true },
      [`${prefix}-gen`]: { id:`${prefix}-gen`, name:'发电机', type:'power', roomId:`${prefix}-engine`, hp:3, maxHp:3, enabled:true }
    },
    weapons: { [`${prefix}-laser`]: { id:`${prefix}-laser`, name:'基础激光炮', roomId:`${prefix}-weapon`, damage:1, charge:1, maxCharge:1 } }
  }
}

export function createInitialGameState(): GameState {
  const playerShip = mkShip('player'); const enemyShip = mkShip('enemy')
  Object.values(playerShip.crew).forEach(c=>playerShip.rooms[c.roomId].crewIds.push(c.id))
  Object.values(enemyShip.crew).forEach(c=>enemyShip.rooms[c.roomId].crewIds.push(c.id))
  return { id: crypto.randomUUID(), turn:1, phase:'planning', ships:{ player:playerShip, enemy:enemyShip }, activePlayer:'player', plannedActions:[], actionQueue:[], messageQueue:[], commandHistory:[], log:['游戏开始，进入规划阶段'], winner:null, modifiers:[], runtimeCards:[{id:'shield-generator',owner:'player'},{id:'repair-bot',owner:'player',crewId:'p-crew-b'},{id:'assault-marine',owner:'player',crewId:'p-crew-a'},{id:'emergency-doors',owner:'player'}] }
}

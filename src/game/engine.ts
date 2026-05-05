import { actionPriority } from './actions'
import { cardRegistry } from '../cards'
import { applyCommand } from './commands'
import { generateEnemyActions } from './enemyAI'
import { messageFromAction } from './messages'
import { getMeleeBonus } from './modifiers'
import { findCrew, findRoom, opponentOf } from './selectors'
import type { GameMessage, GameState } from './types'

function emitCardMessage(state: GameState, msg: GameMessage) {
  state.runtimeCards.forEach((rc)=>{ const def=cardRegistry[rc.id]; if(def?.onMessage){ def.onMessage({state}, rc, msg).forEach(c=>applyCommand(state,c)) } })
}

export function resolveTurn(input: GameState): GameState {
  const state = structuredClone(input)
  applyCommand(state,{type:'SetPhase',payload:{phase:'resolve'}}); applyCommand(state,{type:'AddLog',payload:{text:`第 ${state.turn} 回合开始结算`}})
  state.plannedActions.push(...generateEnemyActions(state))
  state.actionQueue = [...state.plannedActions].sort((a,b)=>actionPriority[a.type]-actionPriority[b.type])
  state.actionQueue.forEach(a=>state.messageQueue.push(messageFromAction(a)))
  while(state.messageQueue.length && !state.winner){
    const msg = state.messageQueue.shift()!
    if(msg.type==='MoveCrew'&&msg.actorId&&msg.targetId){ applyCommand(state,{type:'MoveCrewToRoom',payload:{crewId:msg.actorId,roomId:msg.targetId}}); applyCommand(state,{type:'AddLog',payload:{text:`${msg.actorId} 移动到 ${msg.targetId}`}}) }
    if(msg.type==='ShieldProtectRoom'&&msg.targetId){ applyCommand(state,{type:'SetRoomShielded',payload:{roomId:msg.targetId,shielded:true}}); applyCommand(state,{type:'AddLog',payload:{text:`房间 ${msg.targetId} 获得护盾保护`}}) }
    if((msg.type==='WeaponAttackDeclared'||msg.type==='MeleeAttackDeclared')&&msg.targetId){ const room=findRoom(state,msg.targetId); if(room){ let dmg=1; if(msg.type==='MeleeAttackDeclared'&&msg.actorId) dmg+=getMeleeBonus(state,msg.actorId); if(room.shielded&&!room.shieldUsed){ dmg=Math.max(0,dmg-1); room.shieldUsed=true; state.log.push(`护盾发生器使 ${room.name} 伤害 -1`) } if(dmg>0) applyCommand(state,{type:'DamageRoom',payload:{roomId:room.id,amount:dmg}}); state.log.push(`${msg.type==='WeaponAttackDeclared'?'武器':'近战'}对 ${room.name} 造成 ${dmg} 伤害`) } }
    if(msg.type==='RepairRoom'&&msg.targetId){ applyCommand(state,{type:'RepairRoomHp',payload:{roomId:msg.targetId,amount:1}}); state.log.push(`维修 ${msg.targetId} 1 点`) }
    emitCardMessage(state,msg)
  }
  Object.values(state.ships).forEach(ship=>Object.values(ship.rooms).forEach(r=>{ const prev=r.oxygen; r.oxygen=Math.max(0,r.oxygen-1); if(prev!==r.oxygen){ emitCardMessage(state,{id:crypto.randomUUID(), type:'OxygenReduced', targetId:r.id}); if(r.oxygen===0){ r.crewIds.forEach(cid=>applyCommand(state,{type:'DamageCrew',payload:{crewId:cid,amount:1}})) } } }))
  emitCardMessage(state,{id:crypto.randomUUID(),type:'TurnEnded'})
  const deadShip = (p:'player'|'enemy')=>Object.values(state.ships[p].rooms).every(r=>r.hp<=0)||state.ships[p].hull<=0
  if(deadShip('enemy')) applyCommand(state,{type:'SetWinner',payload:{winner:'player'}})
  if(deadShip('player')) applyCommand(state,{type:'SetWinner',payload:{winner:'enemy'}})
  if(state.winner){ state.log.push(`胜利方: ${state.winner}`); return state }
  applyCommand(state,{type:'ClearTurnFlags'}); state.turn+=1; state.phase='planning'; state.plannedActions=[]; state.actionQueue=[]; state.messageQueue=[]
  state.log.push(`第 ${state.turn} 回合规划开始`)
  return state
}

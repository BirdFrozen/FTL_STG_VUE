import type { GameCommand, GameMessage, GameState } from './types'
import { findCrew, findRoom } from './selectors'

export function applyCommand(state: GameState, cmd: GameCommand) {
  state.commandHistory.push(cmd)
  const p = cmd.payload ?? {}
  if (cmd.type==='SetPhase') state.phase = p.phase as any
  if (cmd.type==='AddLog') state.log.push(String(p.text))
  if (cmd.type==='MoveCrewToRoom') { const crew=findCrew(state,String(p.crewId)); const to=findRoom(state,String(p.roomId)); if(!crew||!to)return; const from=findRoom(state,crew.roomId); if(from) from.crewIds=from.crewIds.filter(i=>i!==crew.id); crew.roomId=to.id; to.crewIds.push(crew.id) }
  if (cmd.type==='DamageRoom') { const room=findRoom(state,String(p.roomId)); if(room){ room.hp=Math.max(0, room.hp-Number(p.amount??0)); if(room.hp===0) state.log.push(`${room.name} 被摧毁`) }}
  if (cmd.type==='DamageCrew') { const crew=findCrew(state,String(p.crewId)); if(crew){ crew.hp=Math.max(0, crew.hp-Number(p.amount??0)); }}
  if (cmd.type==='RepairRoomHp') { const room=findRoom(state,String(p.roomId)); if(room) room.hp=Math.min(room.maxHp, room.hp+Number(p.amount??0)) }
  if (cmd.type==='SetRoomShielded') { const room=findRoom(state,String(p.roomId)); if(room){ room.shielded=Boolean(p.shielded); if(p.shielded) room.shieldUsed=false } }
  if (cmd.type==='ClearTurnFlags') { for (const s of Object.values(state.ships)) { for (const c of Object.values(s.crew)){ c.usedMainAction=false; c.usedMinorAction=false } for (const r of Object.values(s.rooms)){ r.shielded=false; r.shieldUsed=false } } }
  if (cmd.type==='SetWinner') state.winner = p.winner as any
  if (cmd.type==='QueueMessage') state.messageQueue.push(p.message as GameMessage)
  if (cmd.type==='SetRoomOxygen') { const room=findRoom(state,String(p.roomId)); if(room) room.oxygen=Math.max(0,Math.min(room.maxOxygen, Number(p.value))) }
}

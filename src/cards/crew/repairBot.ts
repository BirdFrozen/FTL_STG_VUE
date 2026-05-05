import type { CardDefinition } from '../types'
import { findCrew, findRoom } from '../../game/selectors'
export default { id:'repair-bot', name:'维修机器人', type:'crew', text:'回合结束若位于受损房间，修复1点。', onMessage:(ctx, card, msg)=>{ if(msg.type!=='TurnEnded'||!card.crewId) return []; const c=findCrew(ctx.state,card.crewId); if(!c) return []; const room=findRoom(ctx.state,c.roomId); if(!room||room.hp>=room.maxHp) return []; return [{type:'RepairRoomHp',payload:{roomId:room.id,amount:1}},{type:'AddLog',payload:{text:`维修机器人修复 ${room.name} 1点`}}] } } satisfies CardDefinition

export type PlayerId = 'player' | 'enemy'
export type Phase = 'prepare' | 'planning' | 'resolve' | 'end'
export type ActionType = 'move' | 'melee' | 'weapon' | 'repair' | 'shield'
export type MessageType =
  | 'TurnStarted' | 'PlanningStarted' | 'ActionDeclared' | 'MoveCrew' | 'MeleeAttackDeclared' | 'WeaponAttackDeclared'
  | 'BeforeDamage' | 'ApplyDamage' | 'AfterDamage' | 'RoomDestroyed' | 'SystemDestroyed' | 'CrewDamaged' | 'CrewKilled'
  | 'RepairRoom' | 'ShieldProtectRoom' | 'TurnEnded' | 'CheckVictory' | 'OxygenReduced'
export type CommandType = 'SetPhase'|'AddLog'|'MoveCrewToRoom'|'DamageRoom'|'DamageCrew'|'DamageSystem'|'RepairRoomHp'|'SetRoomShielded'|'ClearTurnFlags'|'SetWinner'|'QueueMessage'|'SetRoomOxygen'

export interface RoomState { id:string; name:string; x:number; y:number; width:number; height:number; hp:number; maxHp:number; oxygen:number; maxOxygen:number; systemIds:string[]; crewIds:string[]; shielded?:boolean; shieldUsed?:boolean }
export interface CrewState { id:string; name:string; owner:PlayerId; hp:number; maxHp:number; roomId:string; actionsPerTurn:number; usedMainAction:boolean; usedMinorAction:boolean; tags?:string[] }
export interface SystemState { id:string; name:string; type:string; roomId:string; hp:number; maxHp:number; enabled:boolean }
export interface WeaponState { id:string; name:string; roomId:string; damage:number; charge:number; maxCharge:number; targetRoomId?:string }
export interface ShipState { id:string; owner:PlayerId; name:string; rooms:Record<string,RoomState>; crew:Record<string,CrewState>; systems:Record<string,SystemState>; weapons:Record<string,WeaponState>; hull:number }
export interface PlannedAction { id:string; actorId:string; owner:PlayerId; type:ActionType; sourceId?:string; targetId?:string; payload?:Record<string, unknown> }
export interface GameMessage { id:string; type:MessageType; owner?:PlayerId; actorId?:string; sourceId?:string; targetId?:string; payload?:Record<string, unknown> }
export interface GameCommand { type:CommandType; payload?:Record<string, unknown> }
export interface Modifier { id:string; sourceId:string; targetType:'room'|'crew'|'action'|'damage'; targetId:string; type:string; value:number; expires:'turnEnd'|'permanent'|'onTrigger' }
export interface RuntimeCard { id:string; owner:PlayerId; roomId?:string; crewId?:string }
export interface GameState { id:string; turn:number; phase:Phase; ships:Record<PlayerId,ShipState>; activePlayer:PlayerId; plannedActions:PlannedAction[]; actionQueue:PlannedAction[]; messageQueue:GameMessage[]; commandHistory:GameCommand[]; log:string[]; winner:PlayerId|'draw'|null; modifiers:Modifier[]; runtimeCards:RuntimeCard[] }

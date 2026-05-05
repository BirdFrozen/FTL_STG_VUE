import type { GameCommand, GameMessage, GameState, Modifier, PlannedAction, RuntimeCard } from '../game/types'
export type CardType = 'weapon'|'system'|'crew'|'tactic'
export interface GameContext { state: GameState }
export interface CardDefinition { id:string; name:string; type:CardType; cost?:number; tags?:string[]; text:string; getActions?:(ctx:GameContext, card:RuntimeCard)=>PlannedAction[]; onMessage?:(ctx:GameContext, card:RuntimeCard, msg:GameMessage)=>GameCommand[]; getModifiers?:(ctx:GameContext, card:RuntimeCard)=>Modifier[] }

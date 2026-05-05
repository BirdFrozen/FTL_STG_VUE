import type { ActionType, PlannedAction, PlayerId } from './types'
export const buildAction = (owner:PlayerId, actorId:string, type:ActionType, targetId?:string):PlannedAction => ({ id:crypto.randomUUID(), owner, actorId, type, targetId })
export const actionPriority: Record<ActionType, number> = { move:1, shield:2, weapon:3, melee:4, repair:5 }

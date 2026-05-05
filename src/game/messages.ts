import type { GameMessage, PlannedAction } from './types'
export function messageFromAction(a: PlannedAction): GameMessage {
  const map:any={ move:'MoveCrew', melee:'MeleeAttackDeclared', weapon:'WeaponAttackDeclared', repair:'RepairRoom', shield:'ShieldProtectRoom' }
  return { id: crypto.randomUUID(), type: map[a.type], owner:a.owner, actorId:a.actorId, targetId:a.targetId }
}

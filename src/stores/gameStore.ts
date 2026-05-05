import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { buildAction } from '../game/actions'
import { resolveTurn } from '../game/engine'
import { createInitialGameState } from '../game/initialState'
import type { ActionType, PlannedAction } from '../game/types'

export const useGameStore = defineStore('game', ()=>{
  const state = ref(createInitialGameState())
  const selectedCrewId = ref<string>('')
  const selectedAction = ref<ActionType>('move')
  const selectedTargetId = ref<string>('')
  const selectedCrew = computed(()=> selectedCrewId.value ? (state.value.ships.player.crew[selectedCrewId.value]||state.value.ships.enemy.crew[selectedCrewId.value]) : undefined)
  function startNewGame(){ state.value=createInitialGameState() }
  function selectCrew(crewId:string){ selectedCrewId.value=crewId }
  function selectAction(actionType:ActionType){ selectedAction.value=actionType }
  function selectTarget(targetId:string){ selectedTargetId.value=targetId }
  function addPlannedAction(action:PlannedAction){ state.value.plannedActions.push(action) }
  function planSelected(){ if(!selectedCrewId.value||!selectedTargetId.value) return; addPlannedAction(buildAction('player',selectedCrewId.value,selectedAction.value,selectedTargetId.value)) }
  function removePlannedAction(actionId:string){ state.value.plannedActions=state.value.plannedActions.filter(a=>a.id!==actionId) }
  function resolveCurrentTurn(){ state.value=resolveTurn(state.value) }
  function resetGame(){ startNewGame() }
  return { state, selectedCrew, selectedCrewId, selectedAction, selectedTargetId, startNewGame, selectCrew, selectAction, selectTarget, addPlannedAction, removePlannedAction, resolveCurrentTurn, resetGame, planSelected }
})

import type { CrewState, GameState, PlayerId, RoomState } from './types'
export const opponentOf = (p: PlayerId): PlayerId => p === 'player' ? 'enemy' : 'player'
export function findCrew(state: GameState, crewId: string): CrewState | undefined { return state.ships.player.crew[crewId] ?? state.ships.enemy.crew[crewId] }
export function findRoom(state: GameState, roomId: string): RoomState | undefined { return state.ships.player.rooms[roomId] ?? state.ships.enemy.rooms[roomId] }

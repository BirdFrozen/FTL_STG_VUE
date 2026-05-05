import type { GameCommand } from './types'
export const logCmd = (text: string): GameCommand => ({ type:'AddLog', payload:{ text } })

import type { CardDefinition } from './types'
const modules = import.meta.glob('./**/*.ts', { eager: true }) as Record<string, { default?: CardDefinition }>
export const cardRegistry: Record<string, CardDefinition> = {}
Object.values(modules).forEach((m) => { if (m.default?.id) cardRegistry[m.default.id]=m.default })

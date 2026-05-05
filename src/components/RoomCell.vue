<template><div class="cell" @click="s.selectTarget(room.id)"><strong>{{ room.name }}</strong><div>HP {{ room.hp }}/{{ room.maxHp }}</div><div>氧气 {{ room.oxygen }}</div><div>护盾 {{ room.shielded?'是':'否' }}</div><div>船员 {{ room.crewIds.join(',')||'-' }}</div><div>系统 {{ room.systemIds.join(',')||'-' }}</div></div></template>
<script setup lang="ts">import type { RoomState } from '../game/types';import { useGameStore } from '../stores/gameStore';defineProps<{room:RoomState}>();const s=useGameStore()</script>
<style scoped>.cell{border:1px solid #888;padding:6px;cursor:pointer}</style>

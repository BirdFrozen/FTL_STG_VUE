<template><div class="grid"><RoomCell v-for="r in rooms" :key="r.id" :room="r" /></div></template>
<script setup lang="ts">import { computed } from 'vue';import { useGameStore } from '../stores/gameStore';import RoomCell from './RoomCell.vue';const p=defineProps<{owner:'player'|'enemy'}>(); const s=useGameStore(); const rooms=computed(()=>Object.values(s.state.ships[p.owner].rooms))</script>
<style scoped>.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}</style>

<template><div><h4>船员</h4><button v-for="c in crews" :key="c.id" @click="s.selectCrew(c.id)">{{ c.name }}({{ c.hp }})</button></div></template>
<script setup lang="ts">import { computed } from 'vue';import { useGameStore } from '../stores/gameStore';const p=defineProps<{owner:'player'|'enemy'}>();const s=useGameStore();const crews=computed(()=>Object.values(s.state.ships[p.owner].crew))</script>

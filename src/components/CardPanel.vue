<template><div><h4>卡牌(运行中)</h4><div v-for="c in s.state.runtimeCards" :key="c.id">{{ c.id }} - {{ c.owner }}</div></div></template>
<script setup lang="ts">import { useGameStore } from '../stores/gameStore';const s=useGameStore()</script>

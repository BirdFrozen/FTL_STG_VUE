<template><div><h4>日志</h4><div class="log"><div v-for="(l,i) in s.state.log" :key="i">{{ l }}</div></div></div></template>
<script setup lang="ts">import { useGameStore } from '../stores/gameStore';const s=useGameStore()</script><style scoped>.log{max-height:220px;overflow:auto;background:#111;color:#0f0;padding:8px}</style>

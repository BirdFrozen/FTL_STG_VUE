<template>
  <div class="layout">
    <ShipView owner="player" />
    <div><ActionPanel /><CardPanel /><button @click="s.resolveCurrentTurn">结算回合</button><button @click="s.resetGame">重开</button><LogPanel /><DebugPanel /></div>
    <ShipView owner="enemy" />
  </div>
</template>
<script setup lang="ts">import { useGameStore } from '../stores/gameStore'; import ShipView from './ShipView.vue';import ActionPanel from './ActionPanel.vue';import LogPanel from './LogPanel.vue';import DebugPanel from './DebugPanel.vue';import CardPanel from './CardPanel.vue';const s=useGameStore()</script>
<style scoped>.layout{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;font-family:Arial;padding:12px}button{margin-right:8px}</style>

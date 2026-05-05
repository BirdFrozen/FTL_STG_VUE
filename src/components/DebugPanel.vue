<template><details><summary>Debug GameState</summary><pre>{{ json }}</pre></details></template>
<script setup lang="ts">import { computed } from 'vue';import { useGameStore } from '../stores/gameStore';const s=useGameStore();const json=computed(()=>JSON.stringify(s.state,null,2))</script>

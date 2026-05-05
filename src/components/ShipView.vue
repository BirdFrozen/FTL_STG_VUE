<template><div><h3>{{ owner==='player'?'玩家':'敌方' }}舰船</h3><RoomGrid :owner="owner" /><CrewPanel :owner="owner" /></div></template>
<script setup lang="ts">import RoomGrid from './RoomGrid.vue';import CrewPanel from './CrewPanel.vue';defineProps<{owner:'player'|'enemy'}>()</script>

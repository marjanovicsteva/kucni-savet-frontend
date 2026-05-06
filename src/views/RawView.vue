<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import {getAllChores, createChore} from "@/api/backend.ts";
import type {Chore} from "@/api/models";
import {computed, onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user.ts";
import MyChoreSummary from "@/components/MyChoreSummary.vue";
import ChoreSummaryRaw from "@/components/ChoreSummaryRaw.vue";

const user = useUserStore().user;
const chores = ref<Chore[]>([]);
const newChore = ref<Chore>({
  name: "",
  frequency: null
} as Chore);

onMounted(async () => {
  chores.value = await getAllChores();
});

const myChores = computed(() => {
  if (user === null)
    return [];

  return chores.value.filter(chore => chore.assignees.some(assignee => assignee.id === user.id));
})

const adHocChores = computed(() => {
  if (user === null)
    return [];

  return chores.value.filter(chore => chore.frequency === null);
})

const othersUnfinishedChores = computed(() => {
  if (user === null)
    return [];

  return chores.value.filter(chore => chore.toDo && chore.assignees.every(assignee => assignee.id !== user.id));
})

const othersFinishedChores = computed(() => {
  if (user === null)
    return [];

  return chores.value.filter(chore => !chore.toDo && chore.assignees.every(assignee => assignee.id !== user.id));
})

const createNewChore = async () => {
  if (!newChore.value.name || !newChore.value.frequency) alert("Please fill in all fields")

  await createChore({
    name: newChore.value.name,
    frequency: Number.parseInt(newChore.value.frequency)
  })
}
</script>

<template>
  <div>
    <AppLayout>
      <h2>New Chore</h2>
      <div style="margin-bottom: 1rem; display: flex; gap: 1rem;">
        <input v-model="newChore.name" placeholder="naziv zadatka" />
        <select v-model="newChore.frequency">
          <option disabled :value="null">koliko redovno</option>
          <option v-for="frequency in [ 0, 1, 7, 14, 30 ]" :key="frequency">{{ frequency }}</option>
        </select>
        <button @click="createNewChore()">dodaj</button>
      </div>
      <h2>All Chores</h2>
      <ChoreSummaryRaw class="chore-summary" v-for="myChore in chores" :key="myChore.id" :chore="myChore" />
    </AppLayout>
  </div>
</template>

<style scoped>
.chore-summary {
  max-width: 400px;
  margin-bottom: 1rem;
}
</style>

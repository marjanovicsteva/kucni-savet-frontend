<script setup lang="ts">
import type {Chore, User} from "@/api/models";
import {computed, onMounted, type PropType, reactive, ref} from "vue";
import {naturalizeFrequency} from "@/api/enums.ts";
import {useUserStore} from "@/stores/user.ts";
import {householdUsers, markChoreAsDone, updateChoreAssignees} from "@/api/backend.ts";

const props = defineProps({
  chore: {
    type: Object as PropType<Chore>,
    required: true
  }
})
const chore = reactive({ ...props.chore });
const user = useUserStore().user;
let users = reactive([] as User[]);

const naturalizedLastDone = computed(() => {
  if (!props.chore?.lastDone) return ""

  const lastDone = new Date(chore.lastDone)

  return lastDone.toLocaleString("sr-RS")
})

const canBeReminded = computed(() => {
  if (!props.chore || chore.assignees.length === 0 || !user) return false;

  if (chore.assignees.length === 1 && chore.assignees.some(assignee => assignee.id === user.id)) return false;

  return true;
})

const editingAssignees = ref(false)
const updateAssignees = (chore: Chore) => {
  editingAssignees.value = false
  updateChoreAssignees(chore.id, chore.assignees)
}

const imageSrc = (user: User) => `${import.meta.env.VITE_BACKEND_URL}/api/user/${ user.id }/image`

onMounted(async () => {
  users = await householdUsers()
})
</script>

<template>
  <div class="chore">
    <div class="chore-header">
      <h3>{{ chore.name }}</h3>

      <div class="chore-assignees">
        <div v-if="!editingAssignees" @click="editingAssignees = true">
          <div v-if="chore.assignees.length">
            <img v-for="assignee in chore.assignees" :key="assignee.id" :src="imageSrc(assignee)" :alt="assignee.name" height="30">
          </div>
          <button v-else>dodeli</button>
        </div>

        <div class="chore-assignees-management" v-else>
          <select multiple v-model="chore.assignees">
            <option v-for="user in users" :key="user.id" :value="user">{{ user.name }}</option>
          </select>
          <button @click="updateAssignees(chore)">sacuvaj</button>
        </div>
      </div>
    </div>

    <div class="chore-footer">
      <div class="chore-timeline">
        <span :class="chore.toDo ? 'chore-to-do' : 'chore-done'">{{ naturalizedLastDone }}</span>
        {{ naturalizeFrequency(chore.frequency) }}
        <button @click="markChoreAsDone(chore.id)">zavrsi</button>
      </div>

      <div class="chore-actions">
        <button v-if="canBeReminded">podseti</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chore {
  padding: 1rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chore-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.chore-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.chore-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chore-done {
  color: green;
}

.chore-to-do {
  color: red;
}
</style>

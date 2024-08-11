<script setup lang='ts'>
import User from "../../models/User"
import { reactive } from 'vue'

const emit = defineEmits([
  'saveUser'
])

const formDataUser = reactive({
  name: null,
  email: null,
  isActive: true
})

const sendUser = (e: any) => {
  let target = e.target
  const dateNow = new Date

  let user: User = {
    id: dateNow.getTime(),
    createdAt: dateNow.toISOString(),
    ...formDataUser
  }

  emit('saveUser', user)
  target.reset()
}
</script>

<template>
  <div class="flex flex-col text-center p-10">
    <h1 class="text-2xl font-bold mb-4">{{ 'Add User' }}</h1>
    <form class="inputs" @submit.prevent="sendUser">
      <input
        id="name"
        v-model="formDataUser.name"
        type="text"
        placeholder="Name"
      />
      <input
        id="email"
        type="email"
        v-model="formDataUser.email"
        placeholder="email"
        required
      />
      <input
        id="save"
        type="submit"
        value="Save"
      />
    </form>
  </div>
</template>
<script setup lang='ts'>
import User from "../../models/User"
import { reactive, defineProps, onMounted } from 'vue'

const emit = defineEmits([
  'handlerEdit',
  'updateUser'
])

interface Props {
  user: User;
}

const props = defineProps<Props>()

const formDataUser = reactive<User>({
  id: null,
  name: null,
  email: null,
  isActive: null,
  createdAt: null,
  updatedAt: null
})

const handlerEdit = () => {
  emit('handlerEdit')
}

const updateUser = () => {
  const dateNow = new Date

  if (typeof formDataUser.isActive !== 'boolean') {
    alert('You must select a valid state')
    return false
  }

  formDataUser.updatedAt = dateNow.toISOString()

  emit('updateUser', formDataUser)
  handlerEdit()
}

onMounted(() => {
  formDataUser.id = props.user.id,
  formDataUser.name = props.user.name,
  formDataUser.email = props.user.email,
  formDataUser.createdAt = props.user.createdAt,
  formDataUser.isActive = props.user.isActive
})
</script>

<template>
  <div class="flex flex-col text-center py-5 px-10 mx-8">
    <h1 class="font-bold">{{ `Edit User - Id: ${user.id}` }}</h1>
    <form class="inputs" @submit.prevent="updateUser">
      <input
        name="name"
        type="text"
        v-model="formDataUser.name"
        required
      />
      <input
        name="email"
        type="email"
        v-model="formDataUser.email"
        required
      />
      <select
        name="status"
        class="p-3 mx-3"
        v-model="formDataUser.isActive"
        required
      >
        <option>Select Status</option>
        <option :value="true">Active</option>
        <option :value="false">Inactive</option>
      </select>
      <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button type="submit" class="mr-5 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">Update</button>
        <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="handlerEdit">Back</button>
      </div>
    </form>
  </div>
</template>
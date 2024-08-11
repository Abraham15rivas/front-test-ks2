<script setup lang="ts">
/* Components */
import UserItem from './UserItem.vue'

/* Functions */
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import { defineProps, ref } from 'vue';

/* Interfaces - Models */
import User from '../../models/User'

const emit = defineEmits([
  'deleteUser',
  'updateUser'
])

interface Props {
  users: User[];
}

defineProps<Props>()

const showModal = ref(false)
const showUser = ref<User>()

const handlerShowModal = (user: User) => {
  showModal.value = true
  showUser.value = user
}

const closeModal = () => {
  showModal.value = false
  showUser.value = null
}

const updateUser = (user: User) => {
  emit('updateUser', user)
  showUser.value = user
}

const deleteUser = (id: number) => {
  emit('deleteUser', id)
  closeModal()
}
</script>

<template>
  <div class="p-8 table-scroll">
    <table
      v-if="users.length"
      class="border-collapse table-fixed w-full text-sm"
    >
      <thead>
        <tr>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left truncate">Photo</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left truncate">Status</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left truncate">Name</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left truncate">Email</th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-800">
        <tr
          class="link"
          v-for="(user, index) in users"
          :key="index"
          @click="handlerShowModal(user)"
        >
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
            <div class="flex items-center">
              <UserCircleIcon class="h-12 w-12 text-gray-300" aria-hidden="true" />
            </div>
          </td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-6 text-slate-500 dark:text-slate-400 truncate">
            <p class="mr-20 text-center text-sm text-white rounded-lg" :class="`${ user.isActive ? 'bg-green-500' : 'bg-red-500'}`">
              {{ user.isActive ? 'Active' : 'Inactive' }}
            </p>
          </td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 truncate">
            {{ user.name }}
          </td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 truncate">
            {{ user.email }}
          </td>
        </tr>
      </tbody>
    </table>
    <span class="text-center" v-else>
      <h1 class="text-2xl font-bold mb-4">Unavailable users</h1>
    </span>
    <UserItem
      v-if="showModal"
      :user="showUser"
      :show-modal="showModal"
      @close-modal="closeModal"
      @update-user="updateUser"
      @delete-user="deleteUser"
    />
  </div>
</template>
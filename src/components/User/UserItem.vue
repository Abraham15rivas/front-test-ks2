<script setup lang='ts'>
/* Components */
import EditUser from './EditUser.vue'

/* Functions */
import { ref, defineProps, onMounted, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

/* Interfaces - Models */
import User from '../../models/User'

const emit = defineEmits([
  'closeModal',
  'deleteUser',
  'updateUser'
])

interface Props {
  user: User;
  showModal: boolean;
}

const props = defineProps<Props>()
const showFormEdit = ref(false)

const closeModal = () => {
  emit('closeModal')
}

const updateUser = (user: User) => {
  emit('updateUser', user)
}

const deleteUser = (id: number) => {
  emit('deleteUser', id)
}

const handlerEdit = () => {
  showFormEdit.value = !showFormEdit.value
}
</script>

<template>
  <TransitionRoot as="template" :show="props.showModal">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-bold leading-6 text-gray-900">
                      User Information: {{ user.name }}
                    </DialogTitle>
                    <div class="mt-2">
                      <lu v-if="!showFormEdit">
                        <li class="flex items-center p-2">
                          <label class="font-semibold">Id:</label>
                          <p class="px-2 text-sm text-gray-500">{{ user.id }}</p>
                        </li>
                        <li class="flex items-center p-2">
                          <label class="font-semibold">Name:</label>
                          <p class="px-2 text-sm text-gray-500">{{ user.name }}</p>
                        </li>
                        <li class="flex items-center p-2">
                          <label class="font-semibold">Email:</label>
                          <p class="px-2 text-sm text-gray-500">{{ user.email }}</p>
                        </li>
                        <li class="flex items-center p-2">
                          <label class="font-semibold">Status:</label>
                          <p class="ml-1 px-2 text-sm text-white rounded-lg" :class="`${ user.isActive ? 'bg-green-500' : 'bg-red-500'}`">
                            {{ user.isActive ? 'Active' : 'Inactive' }}
                          </p>
                        </li>
                        <li class="flex items-center p-2">
                          <label class="font-semibold">Creation Date:</label>
                          <p class="px-2 text-sm text-gray-500">{{ user.createdAt }}</p>
                        </li>
                        <li class="flex items-center p-2" v-if="user.updatedAt">
                          <label class="font-semibold">Update Date:</label>
                          <p class="px-2 text-sm text-gray-500">{{ user.updatedAt }}</p>
                        </li>
                        <li class="flex p-2 justify-center">
                          <button
                            @click="handlerEdit"
                            type="button"
                            class="inline-flex w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
                          >Edit</button>
                        </li>
                      </lu>
                      <EditUser
                        v-else
                        :user="user"
                        @handler-edit="handlerEdit"
                        @update-user="updateUser"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" @click="deleteUser(user.id)">Delete</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeModal" ref="cancelButtonRef">Cancel</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
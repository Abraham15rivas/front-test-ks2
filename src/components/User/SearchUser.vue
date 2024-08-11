<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits([
  'searchUser',
  'resetSearchValues'
])

const formDataUser = reactive({
  search: null,
  status: 'Select Status'
})

const searchUser = () => {
  emit('searchUser', formDataUser)
}

const resetSearchValues = () => {
  emit('resetSearchValues')
}
</script>

<template>
  <div class="flex flex-col text-center p-10">
    <h1 class="text-2xl font-bold mb-4">{{ 'Search' }}</h1>
    <form class="inputs" @submit.prevent="searchUser">
      <input
        name="search"
        type="text"
        v-model="formDataUser.search"
        placeholder="Example name: jose"
        @change="resetSearchValues"
      />
      <select
        id="status"
        class="p-3 mx-3"
        name="status"
        v-model="formDataUser.status"
        @change="resetSearchValues"
      >
        <option selected>Select Status</option>
        <option :value="true">Active</option>
        <option :value="false">Inactive</option>
      </select>
      <input
        id="search"
        type="submit"
        value="Search"
      />
    </form>
  </div>
</template>
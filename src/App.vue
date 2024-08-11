<script setup lang="ts">
/* Components */
import NavBar from './components/Layout/NavBar.vue'
import Header from './components/Layout/Header.vue'
import UserList from './components/User/UserList.vue'
import AddUser from './components/User/AddUser.vue'
import SearchUser from './components/User/SearchUser.vue'
import Footer from './components/Layout/Footer.vue'

/* Functions */
import { onMounted, ref } from 'vue'

/* State Management */
import { store } from './store'

/* Interfaces - Models */
import User from './models/User'

const users = ref<User[]>([])
const messageError = ref('The search must be longer than 2 characters, or select the status filter')

const saveUser = (user: User) => {
  let newUser = store.saveUser('users', user)
  users.value.unshift(newUser)
}

const listUsers = () => {
  const sortedUsers = store.users
  users.value = sortedUsers.sort((a, b) => b.id - a.id);
}

const updateUser = (user: User) => {
  store.updateUser(user)
  listUsers()
}

const deleteUser = (id: number) => {
  store.deleteUser(id)
  listUsers()
}

const resetSearchValues = () => {
  listUsers()
}

const searchUser = (params) => {
  if (users.value.length && params.search || typeof params.status === 'boolean') {
    let usersMatch = users.value.filter(user => {
      if (params.search && typeof params.status === 'boolean') {
        return user.name.toLowerCase().includes(params.search.toLowerCase()) && user.isActive == params.status
      }

      if (params.search) {
        return user.name.toLowerCase().includes(params.search.toLowerCase())
      } else if (typeof params.status === 'boolean') {
        return user.isActive == params.status
      }
    })

    console.log(usersMatch)
    users.value = usersMatch
  } else {
    resetSearchValues()
    alert(`${messageError.value}`)
  }
}

onMounted(() => {
  store.listUsers()
  listUsers()
})
</script>

<template>
  <div class="min-h-full">
    <NavBar />
    <Header title="User Management" />
    <main class="flex flex-col min-h-screen">
      <div class="flex-grow mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8 grid gap-4 grid-cols-3">
        <div
          class="p-10 rounded-lg border-r-2 border-gray-300 bg-white col-span-2"
        >
          <UserList
            :users="users"
            @delete-user="deleteUser"
            @update-user="updateUser"
          />
        </div>
        <div
          class="p-10 rounded-lg border-r-2 border-gray-300 bg-white"
        >
          <SearchUser
            @search-user="searchUser"
            @reset-search-values="resetSearchValues"
          />
          <AddUser
            @save-user="saveUser"
          />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
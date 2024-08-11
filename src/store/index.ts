import { reactive } from 'vue'

/* Interfaces - Models */
import User from '../models/User'

export const store = reactive({
  users: [],
  saveUser(key: string, user: User) {
    let elements: User[] = JSON.parse(localStorage.getItem(`${key}`)!) ?? []

    if (Array.isArray(elements)) {
      elements.push(user)
    } else {
      elements = []
    }

    localStorage.setItem(`${key}`, JSON.stringify(elements))

    return user
  },
  listUsers() {
    this.users = JSON.parse(localStorage.getItem('users')!) || []
  },
  updateUser(user: User) {
    const users: User[] = this.users
    const indexUser = this.users.findIndex((item: User) => item.id === user.id)

    if (indexUser !== -1) {
      users[indexUser] = user
      localStorage.setItem('users', JSON.stringify(users))
    }
  },
  deleteUser(id: number) {
    const users = this.users.filter((user: User) => user.id !== id)
    localStorage.setItem('users', JSON.stringify(users))
    this.users = users
  }
})
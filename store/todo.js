export const state = () => ({
  tasks: JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [],
})


export const getters = {
  countDone(state) {
    return state.tasks.reduce((count, task) => {
      return count + (task.done ? 1 : 0);
    }, 0)
  }
}

export const mutations = {
  post(state, task) {
    const id = state.tasks?.reduce((maxId, obj) => {
      return Math.max(maxId, obj.id);
    }, 0);
    state.tasks.unshift({
      id: id + 1,
      name: task,
      done: false
    })
  },

  remove(state, id) {
    state.tasks = state.tasks.filter(task => task.id !== id)
  },

  removeDone(state) {
    state.tasks = state.tasks.filter(task => task.done !== true)
  },

  updateStatus(state, id) {
    const task = state.tasks.find(task => task.id === id)
    if(task) task.done = !task.done
  },

  removeAll(state) {
    state.tasks = []
    localStorage.setItem('tasks', JSON.stringify([]))
  },

  setLocal(state) {
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  }
}

export const actions = {
  addTask({ commit }, task) {
    commit('post', task)
    commit('setLocal')
  },

  removeTask({ commit }, id) {
    commit('remove', id)
    commit('setLocal')
  },

  updateTaskStatus({ commit }, id) {
    commit('updateStatus', id)
    commit('setLocal')
  },

  removeAllDoneTasks({commit }) {
    commit('removeDone')
    commit('setLocal')
  }
}


<template >
  <div class=" tw-bg-white lg:tw-w-2/5 tw-border tw-border-gray-300 tw-mx-auto">
    <div class=" tw-flex tw-justify-between tw-items-center tw-p-5">
      <div class=" tw-text-xl tw-font-bold tw-tracking-wide">TODO APP</div>
      <div class=" tw-flex tw-items-center tw-gap-3">
        <v-badge bordered overlap :content="tasks.length">
          <v-chip outlined>Tasks</v-chip>
        </v-badge>
        <v-badge color="success" bordered overlap :content="countDone">
          <v-chip outlined @click:close="clearDone" :close="countDone ? true : false">Done Tasks</v-chip>
        </v-badge>
        <v-btn small tile elevation="0" @click="deleteAll" color="error">
          <v-icon left small>mdi-delete</v-icon>
          Tasks
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
    <div class=" tw-p-5 tw-max-h-[300px] tw-overflow-y-auto" v-if="tasks.length > 0">
      <transition-group name="fade">
        <TaskCard v-for="item in tasks"
          :key="item.id"
          :item="item"
          @remove="deleteTask"
          @updateStatus="updateStatus"
        />
      </transition-group>
    </div>
    <div class=" tw-text-center tw-my-10" v-else> No data found</div>
    <v-divider></v-divider>
    <div class=" tw-p-5">
      <v-text-field
        rounded
        v-model="task"
        dense
        outlined
        hide-details
        append-icon="mdi-plus-circle"
        placeholder="New task"
        @keyup.enter="add"
        @click:append="add"
      />
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        task: '',
        data: []
      }
    },
    computed: {
      ...mapState("todo", {
        tasks: (state) => state.tasks,
      }),
      ...mapGetters("todo", [
        'countDone'
      ])
    },
    mounted() {
      // const local = JSON.parse(localStorage.getItem("tasks"));
      // if(local) {
      //   this.tasks = local
      // }
    },
    methods: {
      ...mapActions('todo', [
        'addTask',
        'removeTask',
        'updateTaskStatus',
        'removeAllDoneTasks',
      ]),

      ...mapMutations('todo', [
        'removeAll'
      ]),

      add() {
        if(this.task.trim() === "") return
        this.addTask(this.task)
        this.task = ''
      },

      deleteTask(id) {
        this.removeTask(id)
      },

      updateStatus(id) {
        this.updateTaskStatus(id)
      },

      clearDone() {
        this.removeAllDoneTasks()
      },

      deleteAll() {
        this.removeAll()
      }
    }
  }
</script>

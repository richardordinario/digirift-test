<template>
  <div @mouseover="show = true" @mouseleave="show=false" :class="` ${item.done ? ' tw-bg-gray-200' : ''} tw-flex tw-items-center tw-gap-2 tw-my-3 tw-p-1 tw-rounded tw-border tw-border-gray-300 tw-cursor-pointer hover:tw-border-2`" >
    <div class="">
      <v-btn icon @click="$emit('updateStatus', item.id)" :color="item.done ? 'success': ''">
        <v-icon>mdi-check-circle-outline</v-icon>
      </v-btn>
    </div>
    <div :class="` ${item.done ? 'tw-line-through' : ''} `">{{ item.name }}</div>
    <v-spacer/>
    <v-btn v-if="show" color="error" icon @click="$emit('remove', item.id)">
      <v-icon>mdi-close-circle-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      item: Object
    },
    data() {
      return {
        show: false
      }
    }
  }
</script>

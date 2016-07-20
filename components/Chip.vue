<template>
  <div v-if="!closed" class="chip md-chip" transition="chip">
    <slot></slot>
    <i v-if="closeable" v-on:click="closed = true" class="material-icons">close</i>
  </div>
</template>
<script>
export default {
  props: {
    closeable: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    closed: {
      type: Boolean,
      required: false,
      'default': false
    }
  }
}
</script>

<template>
  <span class="badge" :class="{'new': !!alert}">
    <slot></slot>
    <span v-if="alert" class="new">{{alert}}</span>
  </span>
</template>
<script>
export default {
  props: {
    alert: {
      type: String,
      required: false,
      twoWay: false,
      'default': null
    }
  }
}
</script>

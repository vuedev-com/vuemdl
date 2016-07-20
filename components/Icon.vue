<template>
  <i class="material-icons" :class="{right: right, left: left}">
    <slot></slot>
  </i>
</template>
<script>
export default {
  props: {
    right: {
      type: Boolean,
      required: false,
      'default': false
    },
    left: {
      type: Boolean,
      required: false,
      'default': false
    }
  }
}
</script>

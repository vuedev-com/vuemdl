<template>
  <div class="progress">
    <div :class="{determinate: value != null, indeterminate: value == null}" :style="computedStyle"></div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      required: false,
      'default': null,
      twoWay: false
    }
  },
  computed: {
    computedStyle: function () {
      if (this.value != null) {
        return {
          width: this.value + '%'
        }
      }

      return null
    }
  }
}
</script>

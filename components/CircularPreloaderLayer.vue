<template>
  <div class="spinner-layer spinner-{{ color }}{{ singleColor ? '-only' : '' }}">
    <div class="circle-clipper left">
      <div class="circle"></div>
    </div>
    <div class="gap-patch">
      <div class="circle"></div>
    </div>
    <div class="circle-clipper right">
      <div class="circle"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      'default': null,
      twoWay: false
    },
    singleColor: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    }
  }
}
</script>

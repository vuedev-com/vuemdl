<template>
  <div class="preloader-wrapper active" :class="size">
    <!-- single color -->
    <md-circular-preloader-layer v-if="!flashing" v-bind:color="color" v-bind:single-color="true"></md-circular-preloader-layer>
    <!-- flashing -->
    <md-circular-preloader-layer v-if="flashing" v-for="(color, status) in flashingColors" v-bind:color="color"></md-circular-preloader-layer>
  </div>
</template>
<script>
import CircularPreloaderLayer from './CircularPreloaderLayer'
export default {
  components: {
    MdCircularPreloaderLayer: CircularPreloaderLayer
  },
  props: {
    size: {
      type: String,
      required: false,
      'default': null,
      twoWay: false
    },
    color: {
      type: String,
      required: false,
      'default': null,
      twoWay: false
    },
    flashing: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    }
    // , // @todo - ability to define desireable color set
    // flashingExclude: {
    //   type: Object,
    //   required: false,
    //   'default': null,
    //   twoWay: false
    // }
  },
  data () {
    return {
      flashingColors: {
        'blue': true,
        'red': true,
        'yellow': true,
        'green': true
      }
    }
  }
}
</script>

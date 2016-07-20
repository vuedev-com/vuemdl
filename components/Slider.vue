<template>
  <div class="slider">
    <ul class="slides">
      <slot></slot>
    </ul>
    <ul class="indicators">
      <li v-for="index in itemsCount"
          @click="setActive(index)"
          @mouseover="activeItem == index && clearInterval(index)"
          @mouseout="setupInterval(index)"
          :class="{active: activeItem == index}" class="indicator-item"></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    interval: {
      type: Number,
      default: 4000,
      validator: function (value) {
        return value > 1000
      }
    }
  },
  data () {
    return {
      activeItem: 0,
      itemsCount: 0
    }
  },
  ready: function () {
    this.$broadcast('slider::activate', this.activeItem)

    this.interval = this.interval ? this.interval : 4000
    this.itemsCount = this.$children.length
    this.setupInterval()
  },
  methods: {
    handler: function () {
      if (this.$children) {
        this.activeItem = (this.activeItem + 1) % this.itemsCount
        this.$broadcast('slider::activate', this.activeItem)
      }
    },
    setupInterval: function () {
      this.intervalHandler = setInterval(this.handler, this.interval)
    },
    clearInterval: function () {
      if (this.intervalHandler) {
        clearInterval(this.intervalHandler)
        this.intervalHandler = null
      }
    },
    setActive: function (index) {
      this.$broadcast('slider::activate', index)
      this.activeItem = index
      this.clearInterval()
    }
  }
}
</script>

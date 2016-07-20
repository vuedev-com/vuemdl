<template>
  <li :class="computedClasses">
    <img v-el:img>
    <div class="caption" :class="align + '-align'">
      <slot></slot>
    </div>
  </li>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    img: {
      type: String,
      required: false,
      'default': null
    },
    align: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    var position = this.$parent.$children.indexOf(this)
    return {
      active: false,
      position: position,
      classes: {}
    }
  },
  computed: {
    src: function () {
      return this.img
    },
    computedClasses: function () {
      return this.classes
    }
  },
  compiled: function () {
    // todo: remove hack webpack img src loading
    this.$els.img.setAttribute('src', this.img)
  },
  ready: function () {
    this._setClasses(this.active)
  },
  methods: {
    setActive: function (index) {
      this.active = this.position === index
    },
    _setClasses: function (val) {
      Vue.set(this.classes, 'active', val)
      Vue.set(this.classes, 'fadeIn', val)
      Vue.set(this.classes, 'fadeOut', !val)
    }
  },
  events: {
    'slider::activate': function (index) {
      this.setActive(index)
    }
  },
  watch: {
    active: function (val) {
      this._setClasses(val)
    }
  }
}
</script>

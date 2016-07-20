<template>
  <button v-bind:class="computedClasses" v-bind-boolean:disabled="disabled" class="md-button" v-waves>
    <md-icon v-if="icon" :right="iconAlignRight" :left="!iconAlignRight">{{icon}}</md-icon>
    <slot></slot>
  </button>
</template>
<script>
import bindBoolean from '../directives/bind-boolean'
import Icon from './Icon'
export default {
  directives: {
    bindBoolean
  },
  components: {
    MdIcon: Icon
  },
  props: {
    tag: {
      type: String,
      required: false,
      'default': 'button',
      twoWay: false
    },
    type: {
      type: String,
      required: false,
      'default': null,
      twoWay: false
    },
    icon: {
      type: String,
      required: false,
      'default': null,
      twoWay: false
    },
    iconAlignRight: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    large: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    disabled: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    floating: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    flat: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    }
  },
  computed: {
    computedClasses: function () {
      var classes = {
        'btn-large': this.large,
        'disabled': this.disabled,
        'btn-floating': this.floating,
        'btn-flat': this.flat
      }
      classes[this.type ? 'btn-' + this.type : 'btn'] = true
      return classes
      // return 'btn'
    },
    isA: function () {
      return this.tag === 'a'
    },
    isButton: function () {
      return this.tag === 'button'
    }
  },
  ready: function () {
    // console.log(this.tag)
  }
}
</script>

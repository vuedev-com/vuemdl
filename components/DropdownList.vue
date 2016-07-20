<template>
  <ul class="dropdown-content"
    :class="{active: active}" :style="style">
    <slot></slot>
  </ul>
</template>
<script>
import MdButton from './Button'
import MdDropdownItem from './DropdownItem'
export default {
  components: {
    MdButton,
    MdDropdownItem
  },
  data () {
    return {
      active: false,
      style: {}
    }
  },
  methods: {
    toggle: function (e) {
      (!this.active ? this.open : this.hide)(e)
    },
    open: function (e) {
      if (!this.active) {
        this.style = this.computeStyle(e.currentTarget)
        this.active = true
      }
    },
    close: function () {
      this.hide()
    },
    hide: function () {
      if (this.active) {
        this.style = {}
        this.active = false
      }
    },
    computeStyle (element) {
      var width = element.offsetWidth || 100

      return {
        width: width + 'px',
        position: 'absolute',
        opacity: 1,
        display: 'block'
      }
    }
  },
  events: {
    'dropdown-list::close': function () {
      this.hide()
    },
    'dropdown-list::open': function (e) {
      this.open(e)
    }
  }
}
</script>

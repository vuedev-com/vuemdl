<template>
  <div class="md-fab"
    v-el:fab
    :class="{
      'horizontal': horizontal,
      'fixed-action-btn': fixed
    }"
  >
    <slot name="button">
      <md-btn floating large class="red">
        <slot name="icon">
          <md-icon class="large">
            <slot name="icon-name">
              menu
            </slot>
          </md-icon>
        </slot>
      </md-btn>
    </slot>
    <ul :style="{visibility: active ? 'visible' : 'hidden'}">
      <slot></slot>
    </ul>
  </div>
</template>
<script>
import Velocity from 'velocity-animate'
import MdBtn from './Button'
import MdIcon from './Icon'
export default {
  components: {
    MdBtn,
    MdIcon
  },
  props: {
    fixed: {
      type: Boolean,
      required: false,
      'default': true
    },
    horizontal: {
      type: Boolean,
      required: false,
      'default': false
    },
    event: {
      type: String,
      required: false,
      'default': 'hover'
    }
  },
  data () {
    return {
      active: false
    }
  },
  ready () {
    if (this.event === 'hover') {
      this.$els.fab.addEventListener('mouseenter', this.open)
      this.$els.fab.addEventListener('mouseleave', this.close)
    } else {
      this.$els.fab.addEventListener(this.event, this.toggle)
    }
  },
  methods: {
    toggle: function () {
      if (!this.active) {
        this.open()
      } else {
        this.close()
      }
    },
    open: function () {
      if (!this.active) {
        this.active = true

        var offsetY, offsetX

        if (this.horizontal) {
          offsetX = 40
        } else {
          offsetY = 40
        }

        var items = Array.prototype.slice.call(this.$el.querySelectorAll('ul .btn-floating'))

        Velocity(items,
            {scaleY: '.4', scaleX: '.4', translateY: offsetY + 'px', translateX: offsetX + 'px'},
            {duration: 0})

        var time = 0
        items.reverse().forEach(function (item) {
          Velocity(item,
              {opacity: '1', scaleX: '1', scaleY: '1', translateY: '0', translateX: '0'},
              {duration: 80, delay: time})
          time += 40
        })
      }
    },
    close: function () {
      if (this.active) {
        this.active = false

        var offsetY, offsetX

        if (this.horizontal) {
          offsetX = 40
        } else {
          offsetY = 40
        }

        var items = Array.prototype.slice.call(this.$el.querySelectorAll('ul .btn-floating'))

        Velocity(items, 'stop', true)
        Velocity(items,
            {opacity: '0', scaleX: '.4', scaleY: '.4', translateY: offsetY + 'px', translateX: offsetX + 'px'},
            {duration: 80}
        )
      }
    }
  }
}
</script>

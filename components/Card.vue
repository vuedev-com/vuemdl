<template>
  <!-- v-bind:style="{overflow: revealSlot ? 'hidden' : 'initial'}" -->
<div
  v-bind:class="{small: small, medium: medium, large: large}"
  class="md-card card">

  <slot name="card-content">

    <slot name="card-image">
      <div v-if="imageSlot" class="card-image">
        <slot name="image"></slot>
        <div v-if="titleSlot && titleInImage" class="card-title">
          <slot name="title"></slot>
        </div>
      </div>
    </slot>

    <div class="card-content" :class="contentClass">
      <div v-if="titleSlot && !titleInImage" class="card-title">
        <slot name="title"></slot>
      </div>
      <slot></slot>
    </div>

    <slot name="card-action">
      <div v-if="actionsSlot" class="card-action">
        <slot name="actions"></slot>
      </div>
    </slot>

    <div v-if="revealSlot" v-el:reveal class="card-reveal">
      <i v-el:reveal-close class="material-icons right close">close</i>
      <slot name="reveal"></slot>
    </div>
  </slot>
</div>
</template>
<script>
import Velocity from 'velocity-animate'
export default {
  props: {
    contentClass: {
      required: false,
      'default': null,
      twoWay: false
    },
    titleInImage: {
      type: Boolean,
      required: false,
      twoWay: false,
      'default': false
    },
    small: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    medium: {
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
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    imageSlot: function () {
      return 'image' in this._slotContents
    },
    titleSlot: function () {
      return 'title' in this._slotContents
    },
    actionsSlot: function () {
      return 'actions' in this._slotContents
    },
    revealSlot: function () {
      return 'reveal' in this._slotContents
    }
  },
  methods: {
    open: function () {
      if (!this.active) {
        this.active = true
        var reveal = this.$els.reveal
        if (reveal) {
          reveal.style.display = 'block'
          Velocity(reveal, 'stop', false)
          Velocity(reveal, {translateY: '-100%'}, {duration: 300, queue: false, easing: 'easeInOutQuad'})
        }
      }
    },
    close: function () {
      if (this.active) {
        this.active = false
        var reveal = this.$els.reveal
        if (reveal) {
          Velocity(reveal, {translateY: 0}, {
            duration: 225,
            queue: false,
            easing: 'easeInOutQuad',
            complete: () => {
              reveal.style.display = 'none'
            }
          })
        }
      }
    }
  },
  compiled: function () {
    var activators = this.$el.querySelectorAll('.activator')
    Array.prototype.slice.call(activators).forEach((activator) => {
      activator.addEventListener('click', this.open)
    })

    var revealClose = this.$els.revealClose
    if (revealClose) {
      revealClose.addEventListener('click', this.close)
    }
  }
}
</script>

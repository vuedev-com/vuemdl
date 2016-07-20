<template>
  <div class="md-image">
    <div v-el:placeholder class="material-placeholder">
      <img @click="toggle" :height="height" :width="width"
           v-el:img
           class="materialboxed"
           :class="{active: active}">
    </div>

    <md-lean-overlay v-if="active" @click="toggle" transition="modal-overlay"></md-lean-overlay>
    <div v-if="active && caption" transition="fade" class="caption-wrapper">
      <div class="materialbox-caption" style="display: block">
        {{caption}}
      </div>
    </div>
  </div>
</template>
<script>
import MdLeanOverlay from './LeanOverlay'
import MaterialBox from '../materialize/materialbox'

const ESC = 27

export default {
  components: {
    MdLeanOverlay
  },
  props: {
    src: {
      type: String,
      required: true,
      twoWay: false
    },
    caption: {
      type: String,
      required: false,
      'default': null,
      twoWay: false
    },
    height: {
      type: String,
      required: false,
      'default': null,
      twoWay: false
    },
    width: {
      type: String,
      required: false,
      'default': null,
      twoWay: false
    }
  },
  data () {
    return {
      active: false
    }
  },
  compiled: function () {
    this.$els.img.setAttribute('src', this.src)
  },
  ready: function () {
    var img = this.$els.img
    var placeholder = this.$els.placeholder
    this.materialBox = new MaterialBox(img, placeholder)

    // Return on ESC
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === ESC) {
        this.close()
      }
    })

    window.addEventListener('scroll', () => {
      this.close()
    })
  },
  methods: {
    toggle: function () {
      if (this.active) {
        this.close()
      } else {
        this.maximialize()
      }
    },
    maximialize: function () {
      if (!this.active) {
        this.active = true
        this.originalSizes = this.getSizes
        this.materialBox.maximalize(this.originalSizes)
      }
    },
    close: function () {
      if (this.active) {
        this.active = false
        this.materialBox.close(this.originalSizes)
      }
    }
  },
  computed: {
    getSizes: function () {
      var el = this.$els.img
      return {
        width: el.offsetWidth,
        height: el.offsetHeight,
        left: el.offsetLeft,
        top: el.offsetTop
      }
    }
  }
}
</script>

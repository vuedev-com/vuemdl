<template>
  <div class="md-sidenav">
    <ul v-if="active" transition="side-nav" :style="computedStyle" :class="{fixed: fixed}" class="side-nav">
      <slot></slot>
    </ul>

    <div v-if="!fixed" @click="close">
      <md-sidenav-overlay v-if="active" transition="modal-overlay"></md-sidenav-overlay>
    </div>
  </div>
</template>
<script>
import SidenavOverlay from './SidenavOverlay'
const ESC = 27
export default {
  components: {
    MdSidenavOverlay: SidenavOverlay
  },
  props: {
    closeOnClick: {
      type: Boolean,
      required: false,
      'default': false
    },
    active: {
      type: Boolean,
      required: false,
      'default': false
    },
    showActive: {
      type: Boolean,
      required: false,
      'default': false
    },
    fixed: {
      type: Boolean,
      required: false,
      'default': false
    }
  },
  computed: {
    computedStyle: function () {
      if (this.active) {
        return {
          left: 0
        }
      }

      return null
    }
  },
  methods: {
    open: function () {
      if (!this.active) {
        this.active = true
      }
    },
    close: function () {
      if (this.active) {
        this.active = false
      }
    },
    closeIfNecessary: function () {
      if (this.closeOnClick) {
        this.close()
      }
    }
  },
  events: {
    'sidenav::open': function () {
      this.open()
    },
    'sidenav::close': function () {
      this.$nextTick(this.close) // delay close due events
    },
    'nav-item::activated': function (id) {
      this.$broadcast('nav-item::activated', id)
    }
  },
  ready: function () {
    this.active = this.fixed || this.active
    if (!this.fixed) {
      window.document.addEventListener('keydown', (evt) => {
        evt = evt || window.event
        if (evt.keyCode === ESC) {
          this.close()
        }
      })
    }
  }
}
</script>

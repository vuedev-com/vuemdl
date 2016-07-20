<template>
  <li :class="{active: active}">
    <slot name="content">
      <div @click="toggle" class="collapsible-header">
        <slot name="header"></slot>
      </div>
      <div v-el:body class="collapsible-body" :style="computedStyle">
        <slot name="body"></slot>
      </div>
    </slot>
  </li>
</template>
<script>
import Velocity from 'velocity-animate'
import events from '../mixins/events'
export default {
  mixins: [
    events
  ],
  props: {
    name: {
      type: String,
      required: false,
      'default': false,
      twoWay: false
    },
    expanded: {
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
    id: function () {
      if (this.name) {
        return this.name
      }
      return this._uid
    },
    computedStyle: function () {
      if (this.active) {
        return {
          display: 'block'
        }
      }
      return null
    },
    _slideConfig: function () {
      return {
        duration: 350,
        easing: 'easeOutQuart',
        queue: false,
        complete: () => {
          this.$els.body.style.height = ''
        }
      }
    }
  },
  methods: {
    openThis: function (immediately = false) {
      if (!this.active) {
        this.active = true
        if (immediately) {
          this.$els.body.style.height = ''
        } else {
          this.$nextTick(() => {
            Velocity(this.$els.body, 'slideDown', this._slideConfig)
          })
        }
      }
    },
    open: function (id, expendable) {
      if (id === null || typeof id === 'undefined') {
        this.openThis(true) // bulk open
      } else {
        if (id === this.id) {
          this.openThis()
        } else {
          if (!expendable) {
            this.closeThis()
          }
        }
      }
    },
    closeThis: function (immediately = false) {
      if (this.active) {
        this.active = false
        if (immediately) {
          this.$els.body.style.height = ''
        } else {
          this.$nextTick(() => {
            this.$els.body.style.display = 'block'
            Velocity(this.$els.body, 'slideUp', this._slideConfig)
          })
        }
      }
    },
    close: function (id) {
      if (id === null || typeof id === 'undefined') {
        this.closeThis(true) // bulk close
      } else {
        if (id === this.id) {
          this.closeThis()
        }
      }
    },
    toggle: function () {
      if (this.active) {
        this.$dispatch('collapsible::close', this.id)
      } else {
        this.$dispatch('collapsible::open', this.id)
      }
    }
  },
  events: {
    'collapsible::open': function (id, expendable) {
      this.open(id, expendable)
    },
    'collapsible::close': function (id) {
      this.close(id)
    }
  },
  compiled: function () {
    this.active = this.expanded
  }
}
</script>

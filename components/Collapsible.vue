<template>
  <ul class="collapsible"
    v-bind:class="{
      'popout': popout
    }"
  >
    <slot></slot>
  </ul>
</template>
<script>
export default {
  props: {
    opened: {
      required: false
    },
    popout: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    expandable: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    }
  },
  watch: {
    expandable: function () {
      console.log('Error: can not change expandable')
    },
    opened: {
      deep: true,
      handler: function (newValue, oldValue) {
        this.openedChanged(newValue, oldValue)
      }
    }
  },
  events: {
    'collapsible::open': function (id) {
      return this.open(id)
    },
    'collapsible::close': function (id) {
      return this.close(id)
    }
  },
  methods: {
    open: function (id) {
      if (typeof this.opened !== 'undefined') {
        if (this.expandable) {
          this.opened.push(id)
        } else {
          this.opened = id
        }
      }
      // propagate event to children
      this.$broadcast('collapsible::open', id, this.expandable)
      return true
    },
    close: function (id) {
      if (typeof this.opened !== 'undefined') {
        if (this.expandable) {
          this.opened.$remove(id)
        } else {
          this.opened = ''
        }
      }
      // propagate event to children
      this.$broadcast('collapsible::close', id)
      return true
    },
    openedChanged: function (value) {
      if (this.expandable) {
        var ids = this.$children
            .filter((component) => component.$options.name === 'CollapsibleItem')
            .map((item) => item.id)
        // close
        ids
            .filter((val) => value.indexOf(val) < 0)
            .forEach((id) => this.$broadcast('collapsible::close', id))
        // open
        this.opened = value
        this.opened
            .forEach((id) => this.$broadcast('collapsible::open', id, this.expandable))
      } else {
        this.$broadcast('collapsible::open', value, this.expandable)
      }
    }
  },
  ready: function () {
    if (typeof this.opened !== 'undefined') {
      if (this.expandable) {
        this.opened
            .forEach((id) => this.$broadcast('collapsible::open', id, this.expandable))
      } else {
        this.$broadcast('collapsible::open', this.opened, this.expandable)
      }
    }
  }
}
</script>

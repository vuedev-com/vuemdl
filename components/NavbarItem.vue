<template>
  <li @click="clicked" :class="{active: active}">
    <slot name="content">
      <a :href="href">
        <slot></slot>
      </a>
    </slot>
  </li>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      'default': null,
      twoWay: false
    },
    href: {
      type: String,
      required: false,
      'default': 'javascript:void(0)',
      twoWay: false
    },
    active: {
      type: Boolean,
      required: false,
      'default': false
    }
  },
  computed: {
    id: function () {
      if (this.name != null) {
        return this.name
      }
      return this._uid
    },
    content: function () {
      return this._slotContents ? this._slotContents.default : ''
    },
    showActive: function () {
      return this.$parent.showActive
    }
  },
  methods: {
    clicked: function () {
      this.$dispatch('nav-item::activated', this.id)
    }
  },
  events: {
    'nav-item::activated': function (id) {
      if (this.showActive === true) {
        this.active = this.id === id
      }
    }
  },
  ready: function () {
    if (this.active === true) {
      this.$dispatch('nav-item::activated', this.id)
    }
  }
}
</script>

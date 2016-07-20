<template>
  <li @click.prevent="select">
    <a href="javascript:void(0)">
      <slot></slot>
    </a>
  </li>
</template>
<script>
export default {
  props: {
    closing: {
      type: Boolean,
      required: false,
      'default': true,
      twoWay: false
    },
    name: {
      type: String,
      required: false,
      'default': null,
      twoWay: false
    }
  },
  computed: {
    id: function () {
      if (this.name) {
        return this.name
      }
      return this._uid
    }
  },
  methods: {
    select: function () {
      if (this.closing) {
        this.$dispatch('dropdown-list::close')
      }

      this.$dispatch('dropdown-item::selected', this.id)
    }
  }
}
</script>

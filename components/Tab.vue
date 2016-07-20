<template>
  <li @click="setAsSelected" class="tab col" :class="computedClasses">
    <slot></slot>
  </li>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
      'default': false,
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
    computedClasses: function () {
      return this.disabled ? ['disabled'] : []
    },
    index: function () {
      return this.$parent.$children.indexOf(this)
    },
    id: function () {
      if (this.name) {
        return this.name
      } else {
        return this.index
      }
    }
  },
  ready: function () {
    var hash = window.location.hash
    var el = this.$el
    var anchors = el.getElementsByTagName('A')
    for (var i = 0; i < anchors.length; i++) {
      var a = anchors[i]
      if (hash === a.getAttribute('href')) {
        this.setAsSelected()
      }
    }
  },
  events: {
    'tab::select': function (id) {
      this.select(id)
    }
  },
  methods: {
    setAsSelected: function () {
      if (!this.disabled) {
        this.$dispatch('tabs::on-select', this)
      }
    },
    select: function (id) {
      if (this.id === id) {
        this.setAsSelected()
      }
    }
  }
}
</script>

<template>
  <div class="md-tabs">
    <ul class="tabs">
      <slot></slot>
      <div v-el:indicator class="indicator"></div>
    </ul>

    <slot name="contents"></slot>
  </div>
</template>
<script>
import Velocity from 'velocity-animate'
export default {
  props: {
    active: {
      required: false,
      'default': null
    }
  },
  data () {
    return {
      indicator: {
        left: '0',
        right: '0'
      }
    }
  },
  computed: {
    tabsCount: function () {
      if (!this.$children) {
        return 0
      } else {
        return this.$children.length
      }
    }
  },
  watch: {
    active: function (value) {
      this.$broadcast('tab::select', value)
    }
  },
  events: {
    'tabs::on-select': function (tab) {
      this.select(tab)
    }
  },
  ready: function () {
    window.addEventListener('resize', this.resizeIndicator)
  },
  methods: {
    select: function (tab) {
      this.activeTab = tab
      this.active = tab.id
      var target = tab.$el
      var parent = target.parentElement
      this.moveIndicator(
        this.indicator.left, target.offsetLeft,
        this.indicator.right, parent.offsetWidth - target.offsetLeft - target.offsetWidth)
      return true
    },
    resizeIndicator: function () {
      if (!this.activeTab) {
        return
      }

      var indicator = this.$els.indicator

      var index = this.activeTab.index
      var tab = this.activeTab.$el
      var tabs = tab.parentElement
      var tabsWidth = tabs.offsetWidth
      var tabWidth = Math.max(tabsWidth, tabs.scrollWidth) / this.tabsCount

      if (tabWidth !== 0 && tabsWidth !== 0) {
        indicator.style.right = (tabsWidth - ((index + 1) * tabWidth)) + 'px'
        indicator.style.left = (index * tabWidth) + 'px'
      }
    },
    moveIndicator: function (left, newLeft, right, newRight) {
      var indicator = this.$els.indicator
      // Update indicator
      if ((newLeft - left) >= 0) {
        Velocity(indicator,
            {right: newRight},
            {duration: 300, queue: false, easing: 'easeOutQuad'}
        )
        Velocity(indicator,
            {left: newLeft},
            {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90}
        )
      } else {
        Velocity(indicator,
            {left: newLeft},
            {duration: 300, queue: false, easing: 'easeOutQuad'})
        Velocity(indicator,
            {right: newRight},
            {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90})
      }
    }
  }
}
</script>

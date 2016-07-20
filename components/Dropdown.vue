<template>
  <div v-on-click-away="close">
    <md-dropdown-list>
      <slot></slot>
    </md-dropdown-list>
    <span @click="open">
      <slot name="button">
        <md-button href="javascript:void(0)"
            :class="{active: active}"
            class="dropdown-button">
            {{title}}
            <i class="mdi-navigation-arrow-drop-down right"></i>
        </md-button>
      </slot>
    </span>
  </div>
</template>
<script>
import onClickAway from '../directives/click-away'
import MdButton from './Button'
import MdDropdownList from './DropdownList'
export default {
  props: {
    title: {
      type: String,
      required: false,
      'default': '',
      twoWay: false
    },
    value: {
      type: [String, Number],
      required: false,
      'default': ''
    }
  },
  directives: {
    onClickAway
  },
  components: {
    MdButton,
    MdDropdownList
  },
  events: {
    'dropdown-list::close': function () {
      // emitted by item -> propagated do list
      this.$broadcast('dropdown-list::close')
      this.$dispatch('dropdown::close')
    },
    'dropdown-item::selected': function (id) {
      this.value = id
      return true
    },
    'dropdown::open': function (e) {
      this.$broadcast('dropdown-list::open', e)
    }
  },
  methods: {
    open: function (e) {
      this.$broadcast('dropdown-list::open', e)
    },
    close: function () {
      this.$broadcast('dropdown-list::close')
    },
    setValue: function (id) {
      console.log(this)
      this.value = id
    }
  }
}
</script>

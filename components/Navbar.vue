<template>
  <div :class="{'navbar-fixed': fixed}"
       :style="fixed ? {position: 'absolute', top: 0}: {}"
       class="md-navbar">

    <nav :class="navClass">
      <div class="nav-wrapper" :class="wrapperClass">
        <slot name="content">
          <slot name="logo">
            <a v-if="title"
               :href="titleHref" class="brand-logo" :class="logoClasses">
                {{title}}
            </a>
            <a v-if="hamburger" href="javascript:void(0)" class="button-collapse"
               @click="openSideNav">
                <md-icon>menu</md-icon>
            </a>
          </slot>

          <slot name="navs">
            <ul v-if="!onlySideNav" :class="listClasses">
              <slot></slot>
            </ul>

            <md-sidenav :close-on-click="closeOnClick"> <!-- only if is active -->
              <slot></slot>
            </md-sidenav>
          </slot>
        </slot>
      </div>
    </nav>
  </div>
</template>
<script>
import MdIcon from './Icon'
import MdSidenav from './Sidenav'
export default {
  props: {
    active: {
      type: String,
      required: false,
      'default': null
    },
    showActive: {
      type: Boolean,
      required: false,
      'default': null,
      twoWay: false
    },
    title: {
      type: String,
      required: false,
      'default': '',
      twoWay: false
    },
    titleHref: {
      type: String,
      required: false,
      'default': 'javascript:void(0)',
      twoWay: false
    },
    right: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    left: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    center: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    fixed: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    navClass: {
      required: false,
      'default': null,
      twoWay: false
    },
    hamburger: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    mode: {
      type: String,
      required: false,
      'default': null,
      twoWay: false
    },
    closeOnClick: {
      type: Boolean,
      required: false,
      'default': true,
      twoWay: false
    },
    onlySideNav: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    },
    wrapperClass: {
      required: false,
      'default': null,
      twoWay: false
    }
  },
  components: {
    MdIcon,
    MdSidenav
  },
  events: {
    'nav-item::activated': function (id, content) {
      // propagate event to children
      this.$broadcast('nav-item::activated', id)
      // @todo - rework next line with $data object coz generates warning in console
      // this.active = id
      if (this.closeOnClick) {
        this.$broadcast('sidenav::close')
      }
    }
  },
  methods: {
    openSideNav: function () {
      this.$broadcast('sidenav::open')
    },
    closeSideNav: function () {
      this.$broadcast('sidenav::close')
    }
  },
  computed: {
    logoClasses: function () {
      return {
        center: this.center,
        right: !this.center && !this.right
        // left: !this.center && !this.left - left is default
      }
    },
    listClasses: function () {
      var classes = {
        right: this.right,
        left: this.left
      }

      if (this.mode) {
        classes[this.mode] = true
      }

      return classes
    }
  }
}
</script>

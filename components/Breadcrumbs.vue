<template>
  <md-navbar class="md-breadcrumbs">
    <div slot="content" class="nav-content">
      <a v-for="(index, item) in items" v-bind:href="href(item)" v-bind:v-link="vlink(item)" class="breadcrumb">
        {{ item.anchor }}
      </a>
    </div>
  </md-navbar>
</template>
<script>
import Navbar from './Navbar'
export default {
  props: {
    items: {
      type: Object,
      required: false,
      'default': {}
    }
  },
  components: {
    MdNavbar: Navbar
  },
  methods: {
    href: function (item) {
      if (item.type !== 'href') {
        return false
      }

      return item.value
    },
    vlink: function (item) {
      // @todo
    }
  }
}
</script>

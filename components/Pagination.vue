<template>
  <ul class="pagination">
    <li :class="{disabled: currentPage == 0}">
      <a v-if="firstLast" @click.prevent="currentPage = 0" href="#"><i class="material-icons">chevron_left</i></a>
      <a @click.prevent="previousPage" href="#"><i class="material-icons">chevron_left</i></a>
    </li>

    <li v-for="n in pager"
      @click.prevent="setCurrentPage(n)"
      :class="getClasses(n)" v-waves>
      <a @click.prevent href="#">{{n + 1}}</a>
    </li>

    <li :class="{disabled: currentPage == pages - 1}">
      <a @click.prevent="nextPage" href="#"><i class="material-icons">chevron_right</i></a>
      <a v-if="firstLast" @click.prevent="currentPage = pages - 1" href="#"><i class="material-icons">chevron_right</i></a>
    </li>
  </ul>
</template>
<script>
import Utils from './utils'
import MdIcon from './Icon'
export default {
  components: {
    MdIcon
  },
  props: {
    currentPage: {
      type: Number,
      'default': 0
    },
    pageSize: {
      type: Number,
      required: true,
      twoWay: false
    },
    totalRecords: {
      type: Number,
      required: true,
      twoWay: false
    },
    displayPages: {
      type: Number,
      required: false,
      'default': 5,
      twoWay: false
    },
    itemClass: {
      required: false,
      'default': null,
      twoWay: false
    },
    firstLast: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    }
  },
  computed: {
    pages: function () {
      return Math.max(Math.ceil(this.totalRecords / this.pageSize), 1)
    },
    pager: function () {
      var pager = Utils.generatePagination(this)
      console.log(pager)
      return pager
      // return Utils.generatePagination(this)
    }
  },
  watch: {
    currentPage: function () {
      this.$dispatch('pagination::selected', this.pagesWindow)
    },
    pages: {
      handler: function () {
        if (this.currentPage >= this.pages) {
          this.currentPage = this.pages - 1
        }
      }
    }
  },
  methods: {
    getSelected: function () {
      return {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        from: this.currentPage * this.pageSize,
        to: (this.currentPage + 1) * this.pageSize,
        size: this.pageSize
      }
    },
    getClasses: function (n) {
      var classes = {}
      if (this.itemClass instanceof Array) {
        this.itemClass.forEach((value, index, array) => {
          classes[value] = true
        })
      } else if (this.itemClass instanceof Object) {
        for (var key in this.itemClass) {
          classes[key] = this.itemClass[key]
        }
      } else {
        classes[this.itemClass] = true
      }

      classes['active'] = n === this.currentPage

      return classes
    },
    setCurrentPage: function (n) {
      this.currentPage = n
    },
    previousPage: function () {
      if (this.currentPage > 0) {
        this.currentPage--
      }
    },
    nextPage: function () {
      if (this.currentPage < this.pages - 1) {
        this.currentPage++
      }
    }
  }
}
</script>

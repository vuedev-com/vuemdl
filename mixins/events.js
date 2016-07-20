export default {
  methods: {
    broadcast: function () {
      var args = Array.prototype.slice.call(arguments)
      this.$broadcast.apply(this, args)
    },
    dispatch: function () {
      var args = Array.prototype.slice.call(arguments)
      this.$dispatch.apply(this, args)
    }
  }
}

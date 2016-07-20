export default {
  computed: {
    headerSlot: function () {
      return 'header' in this._slotContents
    }
  }
}

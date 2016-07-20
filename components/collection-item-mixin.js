export default {
  props: {
    active: {
      type: Boolean,
      required: false,
      'default': false,
      twoWay: false
    }
  },
  computed: {
    secondaryContentSlot: function () {
      return 'secondary-content' in this._slotContents
    }
  }
}

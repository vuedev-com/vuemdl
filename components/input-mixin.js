import * as VueFocus from 'vue-focus'
export default {
  mixins: [
    VueFocus.mixin
  ],
  props: {
    model: {
      type: String, Number
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: null
    },
    isFocused: {
      type: Boolean,
      default: false
    },
    wrapperClasses: {
      type: String,
      default: 'input-field col s12'
    }
  }
}

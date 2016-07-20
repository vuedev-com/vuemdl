<template>
  <div class="{{ wrapperClasses }}">
    <input
      v-bind:type="type"
      v-model="model"
      v-focus-model="isFocused"
    >
    <label v-bind:class="{'active': isLabelActive}">{{ label }}</label>
  </div>
</template>
<script>
import InputMixin from './input-mixin'
export default {
  mixins: [
    InputMixin
  ],
  computed: {
    isLabelActive: function () {
      console.log(this.model)
      return this.isFocused || this.model
    }
  }
}
</script>

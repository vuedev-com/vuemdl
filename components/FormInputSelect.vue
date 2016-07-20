<template>
  <div class="input-field col s4">
    <div class="select-wrapper">
      <span class="caret">▼</span>
      <input type="text" class="select-dropdown" readonly="true" value="Country">
      <ul class="dropdown-content select-dropdown" style="width: 341px; position: absolute; top: 0px; left: 0px; opacity: 1; display: none;">
        <li class="disabled">
          <span>Country</span>
        </li>
        <li class="">
          <span>Option 1</span>
        </li>
        <li class="">
          <span>Option 2</span>
        </li>
        <li class="">
          <span>Option 3</span>
        </li>
      </ul>
    </div>
    <label>Country</label>
  </div>
</template>
<script>
import InputMixin from './input-mixin'
export default {
  mixins: [
    InputMixin
  ]
}
</script>

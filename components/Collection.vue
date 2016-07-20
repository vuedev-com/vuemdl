<template>
  <div class="collection" :class="{'with-header': headerSlot}">
    <div v-if="headerSlot" class="collection-header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import CollectionWrapperMixin from './collection-wrapper-mixin'
export default {
  mixins: [
    CollectionWrapperMixin
  ]
}
</script>

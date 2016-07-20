<template>
<ul class="collection" :class="{'with-header': headerSlot}">
  <div v-if="headerSlot" class="collection-header">
    <slot name="header"></slot>
  </div>
  <slot></slot>
</ul>
</template>
<script>
import CollectionWrapperMixin from './collection-wrapper-mixin'
export default {
  mixins: [
    CollectionWrapperMixin
  ]
}
</script>

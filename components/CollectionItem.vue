<template>
<a class="md-collection-item collection-item" :class="{active: active}">
  <slot></slot>
  <span v-if="secondaryContentSlot" class="secondary-content">
    <slot name="secondary-content"></slot>
  </span>
</a>
</template>
<script>
import CollectionItemMixin from './collection-item-mixin'
export default {
  mixins: [
    CollectionItemMixin
  ]
}
</script>

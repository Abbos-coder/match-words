<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  shadow: 'md',
  rounded: 'lg'
})

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8'
}

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
}

const roundedClasses = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl'
}
</script>

<template>
  <div
    :class="[
      'bg-white border border-gray-200',
      paddingClasses[padding],
      shadowClasses[shadow],
      roundedClasses[rounded]
    ]"
  >
    <div v-if="$slots.header" class="border-b border-gray-200 pb-4 mb-4">
      <slot name="header" />
    </div>
    <div>
      <slot />
    </div>
    <div v-if="$slots.footer" class="border-t border-gray-200 pt-4 mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>
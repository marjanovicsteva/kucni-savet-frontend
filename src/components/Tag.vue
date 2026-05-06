<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
})

const height = 24
const width = computed(() => props.label.length * 9 + 16)

const maskId = `tag-mask-${crypto.randomUUID()}`
</script>

<template>
  <svg
    class="tag"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
  >
    <defs>
      <mask :id="maskId">
        <rect width="100%" height="100%" :rx="height / 2" fill="white" />

        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          font-size="14"
          font-weight="700"
          font-family="Arial, sans-serif"
          fill="black"
        >
          {{ label.toUpperCase() }}
        </text>
      </mask>
    </defs>

    <rect
      width="100%"
      height="100%"
      fill="black"
      :mask="`url(#${maskId})`"
    />
  </svg>
</template>

<style scoped>
.tag {
  display: inline-block;
  vertical-align: middle;
}

.tag text {
  font-weight: bold;
}
</style>

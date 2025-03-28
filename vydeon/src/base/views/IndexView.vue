<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  defaultRoute?: string
}>()
const defaultRoute = ref(props.defaultRoute).value || ''

const router = useRouter()
if (defaultRoute !== '') {
  router.push(defaultRoute)
}
</script>

<template>
  <div></div>
</template>

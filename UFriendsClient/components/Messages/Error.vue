<script setup lang="ts">
  const props = defineProps({
    error: {
      type: String,
      default: '',
    },
  });

  const { error } = toRefs(props);
</script>

<template>
  <div id="error" class="flex items-center drop-shadow-md">
    <div class="flex items-center gap-4">
      {{ error }}
      <Icon name="material-symbols:cancel" class="h-5 w-5 mt-0.5 cursor-pointer" @click="$emit('close')" />
    </div>
  </div>
</template>

<style lang="scss">
  #error {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: var(--el-color-danger);
    width: max-content;
    height: 50px;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    animation: slide-in 0.3s ease-in-out;

    @keyframes slide-in {
      0% {
        transform: translate(-50%, -100%);
      }
      100% {
        transform: translate(-50%, 0);
      }
    }
  }
</style>

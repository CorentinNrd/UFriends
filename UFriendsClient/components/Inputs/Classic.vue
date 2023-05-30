<script setup lang="ts">
  const props = defineProps({
    form: {
      type: Object,
      required: true,
    },
    prop: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  });

  const { form, prop, label, placeholder, type } = toRefs(props);
</script>

<template>
  <div id="classic-input">
    <label :for="prop">{{ label }}</label>
    <input
      :id="prop"
      class="h-9 pl-2 drop-shadow-md rounded-md border focus:outline-none"
      :type="type"
      :placeholder="placeholder"
      v-model="form[prop]"
    />
  </div>
</template>

<style lang="scss">
  #classic-input {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 100%;
  }
</style>

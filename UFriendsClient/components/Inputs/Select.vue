<script setup lang="ts">
  interface Options {
    label: string;
    value: string;
  }

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
    options: {
      type: Array as PropType<Options[]>,
      default: [
        {
          label: 'test',
          value: 'test',
        },
      ],
    },
  });

  const { form, prop, label, placeholder, type, options } = toRefs(props);
</script>

<template>
  <div id="select-input">
    <label :for="prop">{{ label }}</label>
    <select v-model="form[prop]" class="my-select h-9 drop-shadow-md rounded-md border focus:outline-none">
      <option value="">{{ placeholder }}</option>
      <option v-for="(v, k) in options" :key="k" :value="v.value">
        {{ v.label }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">
  #select-input {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 100%;

    select {
      padding-left: 10px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }
</style>

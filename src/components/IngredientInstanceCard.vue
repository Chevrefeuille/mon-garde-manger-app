<template>
  <div
    v-if="ingredientInstance"
    class="bg-teal-200 rounded-md m-2 p-2 shadow-md"
  >
    <p>{{ ingredientInstance.ingredient.name }}</p>
    <p>{{ ingredientInstance.quantity }} {{ ingredientInstance.unit }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IngredientInstance from '../types/ingredientInstance.type';

export default defineComponent({
  props: {
    ingredientInstance: {
      type: Object as PropType<IngredientInstance>,
      required: true,
    },
  },
});
</script>

<style lang="scss"></style>

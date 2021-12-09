<template>
  <div class="bg-teal-200 rounded-md m-2 p-2 shadow-md">
    <p>{{ ingredient.name }}</p>
    <p>{{ ingredient.type }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import IngredientInstance from '@/types/ingredientInstance.type';

export default defineComponent({
  props: {
    ingredientInstance: {
      type: Object as PropType<IngredientInstance>,
      required: true,
    },
  },
  setup(props) {
    const { ingredientInstance } = toRefs(props);

    return { ingredient: ingredientInstance };
  },
});
</script>

<style lang="scss"></style>

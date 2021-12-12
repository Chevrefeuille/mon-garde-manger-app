<template>
  <div class="bg-stone-400 rounded-md space-x-4 p-2">
    {{ type }}
    <div class="flex flex-row">
      <IngredientInstanceCard
        v-for="(ingredient, i) in ingredientsCollection"
        :key="i"
        :ingredient-instance="ingredient"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import IngredientInstanceCard from '../components/IngredientInstanceCard.vue';

export default defineComponent({
  components: {
    IngredientInstanceCard,
  },
  props: {
    ingredientsCollection: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss"></style>

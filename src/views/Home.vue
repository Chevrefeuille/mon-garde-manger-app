<template>
  <div class="bg-teal-200 rounded-md m-2 p-2">Search for your ingredient</div>
  <div id="my-ingredients" class="flex flex-row">
    <div
      v-for="(ingredient, i) in ingredients"
      :key="i"
      class="bg-teal-200 rounded-md m-2 p-2 shadow-md"
    >
      {{ ingredient }}
    </div>
    <div id="add-ingredient" class="bg-teal-200 rounded-md m-2 p-2 shadow-md">
      Add an ingredient
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import groupBy from 'lodash/groupBy';
import IngredientService from '../services/ingredient.service';
import Ingredient from '../types/ingredient.type';

export default defineComponent({
  name: 'Home',
  setup() {
    const ingredients = ref<Ingredient[]>([]);

    const getIngredients = async (): Promise<void> => {
      const res = await IngredientService.getAll();
      ingredients.value = res.data;
    };

    getIngredients();

    // const ingredients = ref([
    //   { type: 'seasonings', name: 'salt' },
    //   { type: 'seasonings', name: 'pepper' },
    //   { type: 'seasonings', name: 'cinnamon' },
    //   { type: 'dry', name: 'flour' },
    //   { type: 'dry', name: 'sugar' },
    // ]);

    const ingredientsGroupByType = groupBy(
      ingredients.value,
      (ingredient: Ingredient) => ingredient.type,
    );
    console.log(ingredientsGroupByType);

    return { ingredients };
  },
});
</script>

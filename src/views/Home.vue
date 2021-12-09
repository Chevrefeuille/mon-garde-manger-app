<template>
  <div class="bg-teal-200 rounded-md m-2 p-2">Search for your ingredient</div>
  <div id="my-ingredients" class="flex flex-row">
    <IngredientInstanceCard
      v-for="(ingredient, i) in ingredients"
      :key="i"
      :ingredient-instance="ingredient"
    />
    <div id="add-ingredient" class="bg-teal-200 rounded-md m-2 p-2 shadow-md">
      Add an ingredient
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import IngredientInstanceService from '../services/ingredientInstance.service';
import IngredientInstance from '../types/ingredientInstance.type';
import IngredientInstanceCard from '../components/IngredientInstanceCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    IngredientInstanceCard,
  },
  setup() {
    const ingredients = ref<IngredientInstance[]>([]);

    const getIngredients = async (): Promise<void> => {
      const res = await IngredientInstanceService.getAll();
      ingredients.value = res.data;
    };

    getIngredients();

    return { ingredients, user: {} };
  },
});
</script>

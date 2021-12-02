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
import { defineComponent, ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user.store';
import { useRouter } from 'vue-router';
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

    const ingredientsGroupByType = groupBy(
      ingredients.value,
      (ingredient: Ingredient) => ingredient.type,
    );
    console.log(ingredientsGroupByType);

    const userStore = useUserStore();
    const router = useRouter();

    const checkLoggedIn = (): void => {
      if (!userStore.user) {
        router.push('/login');
      }
    };

    onMounted(checkLoggedIn);

    return { ingredients, user: userStore.user };
  },
});
</script>

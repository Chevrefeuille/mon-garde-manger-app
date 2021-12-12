<template>
  <div class="flex justify-center">
    <div class="flex flex-row bg-stone-200 rounded-md w-9/12 space-x-4 p-4">
      <IngredientTypeCollection
        v-for="(ingredientsCollection, type, index) in ingredientsGroupedByType"
        :key="index"
        :type="type"
        :ingredients-collection="ingredientsCollection"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import IngredientTypeCollection from '../components/IngredientTypeCollection.vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { groupBy } from 'lodash';
import gql from 'graphql-tag';

export default defineComponent({
  name: 'Pantry',
  components: {
    IngredientTypeCollection,
  },
  setup() {
    // const ingredients = ref<IngredientInstance[]>([]);

    const { result } = useQuery(gql`
      query {
        ingredient_instance(where: { user_id: { _eq: 4 } }) {
          id
          ingredient {
            name
            ingredient_type {
              name
            }
          }
          quantity
          unit
        }
      }
    `);

    const ingredients = useResult(result);

    const ingredientsGroupedByType = computed(() => {
      return groupBy(
        ingredients.value,
        (ingredient) => ingredient.ingredient.ingredient_type.name,
      );
    });

    return { ingredients, ingredientsGroupedByType };
  },
});
</script>

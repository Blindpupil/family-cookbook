<script lang="ts">
import type { RecipeService } from "@/primary/recipe/use-cases";
import type { RecipeView } from "@/primary/recipe/RecipeView";
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    const recipeService = inject<RecipeService>("recipeService")!;

    return {
      recipeService,
    };
  },

  data() {
    return {
      recipes: [] as RecipeView[],
    };
  },

  async created() {
    this.recipes = await this.recipeService.getRecipes("me");
  },
});
</script>

<template>
  <div class="recipes">
    <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
      {{ recipe.name }}
    </div>
  </div>
</template>

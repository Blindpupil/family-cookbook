<template>
  <div :class="{ selected: recipe.isSelected }" @click="recipe.toggle()">
    <h2 class="header">{{ recipe.name }}</h2>
    <sub>
      Serves {{ recipe.portions }} <span>{{ recipe.mealSizeIcon }}</span>
    </sub>

    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
        {{ ingredient.quantity }} {{ ingredient.name }} {{ ingredient.unit }}
      </li>
    </ul>

    <p>{{ recipe.instructions }}</p>
  </div>
</template>

<script setup lang="ts">
import type { RecipeView } from "@/primary/recipe/RecipeView";

defineProps<{
  recipe: RecipeView;
}>();
</script>

<style>
.header {
  display: inline;
  margin-right: 4px;
}
.selected {
  border: 1px dashed firebrick;
}
</style>

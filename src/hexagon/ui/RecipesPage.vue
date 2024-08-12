<template>
  <h1>Recipes</h1>

  <div class="heading">
    <div v-if="collection">
      <input v-model="term" type="text" class="search" placeholder="Search" />
    </div>
    <button
      class="clear"
      :disabled="!collection.isClearable"
      @click="collection.clear()"
    >
      Clear
    </button>
    <label>
      Multiselect
      <input v-model="collection.isMultiselectable" type="checkbox" />
    </label>
  </div>

  <div class="grid" v-if="collection?.items?.length">
    <RecipeCard
      v-for="recipe in collection.items"
      class="recipe"
      :recipe="recipe"
      :key="recipe.id"
      @click="collection.select(recipe.id)"
    />
  </div>

  <div v-else>
    <p>No recipes found.</p>
    <button>Create it!</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import RecipeCard from "@/hexagon/ui/RecipeCard.vue";

import { useRecipeCollection } from "@/hexagon/composables/useRecipeCollection";

const collection = await useRecipeCollection();

const term = ref("");
watch(term, (newVal) => collection.value.searchByName(newVal));
</script>

<style scoped>
.recipe {
  margin: 8px;
  padding: 4px;
}
.recipe:hover {
  cursor: pointer;
}
.search {
  height: 28px;
  margin-right: 16px;
}
.heading {
  display: flex;
}
.clear {
  margin-right: 16px;
}
</style>

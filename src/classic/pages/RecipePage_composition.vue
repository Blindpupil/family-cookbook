<template>
  <h1>Recipes</h1>

  <div class="heading">
    <div>
      <input v-model="term" type="text" class="search" placeholder="Search" />
    </div>
    <button class="clear" :disabled="!isClearable" @click="clear()">
      Clear
    </button>
    <label>
      Multiselect
      <input v-model="isMultiselectable" type="checkbox" />
    </label>
  </div>

  <div class="grid" v-if="recipes.length">
    <RecipeCard_composition
      v-for="recipe in recipes"
      :is-selected="getIsSelected(recipe.id)"
      :recipe="recipe"
      :key="recipe.id"
      class="recipe"
      @click="select(recipe.id)"
    />
  </div>

  <div v-else>
    <p>No recipes found.</p>
    <button>Create your first!</button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import RecipeCard_composition from "@/classic/components/recipe/RecipeCard_composition.vue";

import type { Recipe } from "@/classic/http/recipeHttp";
import { useRecipeStore } from "@/classic/stores/recipeStore";

const recipeStore = useRecipeStore();
const recipes = ref<Recipe[]>([]);
onMounted(async () => {
  recipes.value = await recipeStore.getRecipes();
});

const term = ref("");
watch(term, (newVal) => {
  recipes.value = recipeStore.searchByName(newVal);
});

const allSelected = ref<number[]>([]);
const selectedLast = computed(() => allSelected.value.at(-1));
function select(recipeId: number) {
  const isAlreadySelected = Boolean(
    allSelected.value.find((id) => recipeId === id),
  );

  if (isAlreadySelected) {
    allSelected.value = allSelected.value.filter((id) => recipeId !== id);
    return;
  }

  if (isMultiselectable.value) {
    allSelected.value.push(recipeId);
  } else {
    allSelected.value = [recipeId];
  }
}
function getIsSelected(recipeId: number): boolean {
  return allSelected.value.includes(recipeId);
}

const isClearable = computed(() => Boolean(allSelected.value.length));
function clear() {
  allSelected.value = [];
}

const isMultiselectable = ref(false);
watch(isMultiselectable, (newValue) => {
  if (newValue || !selectedLast.value) return;
  const last = selectedLast.value;

  clear();
  select(last);
});
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

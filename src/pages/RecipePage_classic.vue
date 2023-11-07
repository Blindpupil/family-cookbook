<template>
  <h1>Recipes</h1>

  <div class="heading">
    <div>
      <input v-model="term" type="text" class="search" placeholder="Search" />
    </div>
    <!--    <button class="clear" :disabled="!isClearable" @click="clear()">-->
    <!--      Clear-->
    <!--    </button>-->
    <!--    <label>-->
    <!--      Multiselect-->
    <!--      <input v-model="isMultiselectable" type="checkbox" />-->
    <!--    </label>-->
  </div>

  <div class="grid" v-if="recipes.length">
    <RecipeCard_classic
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

<script lang="ts">
import RecipeCard_classic from "@/ui/recipe/RecipeCard_classic.vue";

import type { Recipe } from "@/domain/recipe/Recipe";
import { recipeHttp } from "@/secondary/recipe/RecipeHttp";
import type { RecipeId } from "@/domain/recipe/types";

export default {
  components: { RecipeCard_classic },
  data: () => ({
    original: [] as Recipe[],
    recipes: [] as Recipe[],
    allSelected: [] as RecipeId[],
    isMultiselectable: false,
    term: "",
  }),
  computed: {
    isClearable() {
      return Boolean(this.allSelected.length);
    },
    selectedLast() {
      return this.allSelected.at(-1);
    },
  },
  watch: {
    term(newVal: string) {
      this.recipes = this.original.filter((recipe) =>
        recipe.name.toLowerCase().includes(newVal.toLowerCase()),
      );
    },
    isMultiselectable(newValue: boolean) {
      if (newValue || !this.selectedLast) return;
      const last = this.selectedLast;

      this.clear();
      this.select(last);
    },
  },
  async mounted() {
    this.recipes = await recipeHttp.getRecipes();
    this.original = this.recipes;
  },
  methods: {
    clear() {
      this.allSelected = [];
    },
    getIsSelected(id: RecipeId) {
      return this.allSelected.includes(id);
    },
    select(recipeId: RecipeId) {
      const isAlreadySelected = Boolean(
        this.allSelected.find((id) => recipeId === id),
      );

      if (isAlreadySelected) {
        this.allSelected = this.allSelected.filter((id) => recipeId !== id);
        return;
      }

      if (this.isMultiselectable) {
        this.allSelected.push(recipeId);
      } else {
        this.allSelected = [recipeId];
      }
    },
  },
};
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

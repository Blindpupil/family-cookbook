<template>
  <!-- :class="{ selected: isSelected }-->
  <div :class="{ selected: isSelected }" @click="toggle">
    <h2 class="header">{{ recipe.name }}</h2>
    <sub>
      Serves {{ recipe.portions }} <span>{{ mealSizeIcon }}</span>
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
import { computed, ref } from "vue";
import { Recipe } from "@/domain/recipe/Recipe";
import { EMOJIS } from "@/primary/recipe/constants";

const props = defineProps<{ recipe: Recipe; isSelected: boolean }>();

const selected = ref(false);
function toggle() {
  selected.value = !selected.value;
}

const mealSizeIcon = computed(() => {
  switch (props.recipe.portions) {
    case 1:
      return EMOJIS.single;
    case 2:
      return EMOJIS.couple;
    case 3:
      return EMOJIS.oneKid;
    default:
      return EMOJIS.twoKids;
  }
});
</script>

<style scoped>
.header {
  display: inline;
  margin-right: 4px;
}
.selected {
  border: 1px dashed firebrick;
}
</style>

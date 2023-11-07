<template>
  <!--  :class="{ selected: isSelected }" -->
  <div :class="{ selected }" @click="toggle()">
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

<script lang="ts">
import type { PropType } from "vue";
import type { Recipe } from "@/domain/recipe/Recipe";
import { EMOJIS } from "@/primary/recipe/constants";

export default {
  props: {
    recipe: {
      type: Object as PropType<Recipe>,
      required: true,
    },
    isSelected: Boolean,
  },
  data: () => ({
    selected: false,
  }),
  computed: {
    mealSizeIcon() {
      switch (this.recipe.portions) {
        case 1:
          return EMOJIS.single;
        case 2:
          return EMOJIS.couple;
        case 3:
          return EMOJIS.oneKid;
        default:
          return EMOJIS.twoKids;
      }
    },
  },
  methods: {
    toggle() {
      this.selected = !this.selected;
      this.$emit("selected", this.selected);
    },
  },
};
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

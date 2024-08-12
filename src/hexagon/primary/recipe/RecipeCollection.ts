import type { RecipeId } from "@/hexagon/domain/recipe/types";
import { RecipeView } from "@/hexagon/primary/recipe/RecipeView";

export class RecipeCollection {
  private readonly _original: RecipeView[] = [];
  constructor(public items: RecipeView[]) {
    this._original = items;
  }

  /**
   * Filter recipes by searching for the provided string
   * among recipe names
   */
  searchByName(term: string) {
    this.items = this._original.filter((recipe) =>
      recipe.name.toLowerCase().includes(term.toLowerCase()),
    );

    return this;
  }

  clear() {
    this.items
      .filter((recipe) => recipe.isSelected)
      .forEach((recipe) => (recipe.isSelected = false));
    this._original
      .filter((recipe) => recipe.isSelected)
      .forEach((recipe) => (recipe.isSelected = false));

    return this;
  }
  get isClearable() {
    return this.items.some((recipe) => recipe.isSelected);
  }

  private selectedLast: RecipeView | null = null;
  private _multiselect = false;
  get isMultiselectable() {
    return this._multiselect;
  }
  /**
   * Sets the multiselect state.
   * When setting false, selectedLast remains 'selected'
   */
  set isMultiselectable(value) {
    const shouldClear = !value && this.selectedLast?.isSelected;
    if (shouldClear) {
      this.clear();
      this.select(this.selectedLast!.id);
    }
    this._multiselect = value;
  }

  select(id: RecipeId) {
    if (this.selectedLast?.id === id) {
      this.selectedLast = this.items
        .find((recipe) => recipe.id === id)!
        .toggle();
      return this;
    }

    if (this.selectedLast !== null && !this.isMultiselectable) {
      this.clear();
    }
    this.selectedLast = this.items.find((recipe) => recipe.id === id)!.toggle();
    return this;
  }
}

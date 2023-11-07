import type { RecipeId } from "@/domain/recipe/types";
import { RecipeView } from "@/primary/recipe/RecipeView";

export class RecipeCollection {
  private readonly _original: RecipeView[] = [];
  constructor(public items: RecipeView[]) {
    this._original = items;
  }

  filter(term: string) {
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
  // Only selectedLast remains 'selected' when turning off multiselect
  set isMultiselectable(value) {
    if (!value && this.selectedLast) {
      this.clear();
      this.select(this.selectedLast.id);
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

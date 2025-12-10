import { Component, computed, input, signal } from '@angular/core';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [], // JsonPipe has been removed from here
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  // This is the input signal for the recipe
  readonly recipe = input.required<RecipeModel>();

  // This is the local state for the servings
  protected readonly servings = signal(1);

  // This computed signal recalculates ingredients based on servings
  protected readonly adjustedIngredients = computed(() => {
    const currentRecipe = this.recipe();
    const currentServings = this.servings();
    const originalServings = currentRecipe.ingredients.reduce(
      (acc, i) => (acc + i.quantity > 0 ? acc : 1), // A bit simplistic, assumes 1 serving base if not specified
      0
    );

    return currentRecipe.ingredients.map((ingredient) => {
      return {
        ...ingredient,
        quantity: (ingredient.quantity / (originalServings || 1)) * currentServings,
      };
    });
  });

  protected incrementServings(): void {
    this.servings.update((value) => value + 1);
  }

  protected decrementServings(): void {
    this.servings.update((value) => (value > 1 ? value - 1 : 1));
  }
}

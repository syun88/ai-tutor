
import { Component, computed, input, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  // This is the new signal input to receive data from the parent!
  readonly recipe = input.required<RecipeModel>();

  // This state now lives in the detail component, where it belongs.
  protected readonly servings = signal(1);

  // This computed signal also moves here, as it depends on local state.
  protected readonly adjustedIngredients = computed(() => {
    const recipeValue = this.recipe(); // Get the value from the signal input
    const servingsValue = this.servings();
    const originalServings = recipeValue.ingredients.reduce(
      (acc, i) => Math.max(acc, i.quantity), // A simple way to estimate original servings
      1
    );

    return recipeValue.ingredients.map((ingredient) => {
      return {
        ...ingredient,
        quantity: (ingredient.quantity / originalServings) * servingsValue,
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

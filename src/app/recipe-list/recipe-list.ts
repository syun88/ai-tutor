
import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeModel } from '../models';
import { RecipeDetail } from '../recipe-detail/recipe-detail'; // 1. Import the new child component

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [JsonPipe, RecipeDetail], // 2. Add the child component to the imports array
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);

  protected handleButton1Click(): void {
    this.recipe.set(MOCK_RECIPES[0]);
  }

  protected handleButton2Click(): void {
    this.recipe.set(MOCK_RECIPES[1]);
  }

  // The servings and adjustedIngredients logic has been removed from here!
}

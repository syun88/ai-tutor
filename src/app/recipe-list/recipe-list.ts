import { Component, signal, computed } from '@angular/core';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeModel } from '../models';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RecipeDetail,
    FormsModule // <-- Add FormsModule to imports
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeList {
  // This new signal holds the value from our search input.
  protected readonly searchTerm = signal('');
  
  // This signal holds the entire list of recipes from our mock file.
  protected readonly allRecipes = signal<RecipeModel[]>(MOCK_RECIPES);

  // This is a new computed signal that filters recipes based on the search term.
  protected readonly filteredRecipes = computed(() => {
    const term = this.searchTerm().toLowerCase();
    // If the term is empty, return the full list.
    if (!term) {
      return this.allRecipes();
    }
    // Otherwise, filter the recipes whose names include the search term.
    return this.allRecipes().filter(recipe => 
      recipe.name.toLowerCase().includes(term)
    );
  });

  // This signal continues to hold the *currently selected* recipe.
  protected readonly recipe = signal<RecipeModel>(this.allRecipes()[0]);
  
  // This method for selecting a recipe remains unchanged.
  protected selectRecipe(recipe: RecipeModel): void {
    this.recipe.set(recipe);
  }
}

// 'computed' と 'JsonPipe' をインポートします
import { Component, signal, computed } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Component({
  selector: 'app-root',
  standalone: true,
  // ↓↓↓ この imports 配列に JsonPipe を追加します
  imports: [JsonPipe], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
  protected readonly servings = signal<number>(1);

  // ↓↓↓ ここに新しい算出シグナルを追加します
  protected readonly adjustedIngredients = computed(() => {
    const currentRecipe = this.recipe();
    const currentServings = this.servings();
    
    // 元の材料リストの各材料に対して計算を実行し、新しいリストを返す
    return currentRecipe.ingredients.map(ingredient => {
      return {
        ...ingredient, // スプレッド構文で元の材料プロパティをコピー
        quantity: ingredient.quantity * currentServings // quantityプロパティだけを上書き
      };
    });
  });

  protected handleButton1Click(): void {
    this.recipe.set(MOCK_RECIPES[0]);
  }

  protected handleButton2Click(): void {
    this.recipe.set(MOCK_RECIPES[1]);
  }

  protected incrementServings(): void {
    this.servings.update(currentValue => currentValue + 1);
  }

  protected decrementServings(): void {
    if (this.servings() > 1) {
      this.servings.update(currentValue => currentValue - 1);
    }
  }
}

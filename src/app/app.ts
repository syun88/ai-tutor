import { Component, signal } from '@angular/core';
// ↓↓↓ RecipeModel もインポートします
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('My Recipe Box'); // ← これはもう不要

  // ↓↓↓ 新しい recipe シグナルをここに追加します
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);

  // ↓↓↓ クリックハンドラの中身を .set() を使うように書き換えます
  protected handleButton1Click(): void {
    this.recipe.set(MOCK_RECIPES[0]); // 1番目のレシピをセット
  }

  protected handleButton2Click(): void {
    this.recipe.set(MOCK_RECIPES[1]); // 2番目のレシピをセット
  }
  protected readonly servings = signal<number>(1);

  // handleButton2Click メソッドの下に、以下の2つのメソッドを追加します

  protected incrementServings(): void {
    // servings シグナルを更新します
    this.servings.update(currentValue => currentValue + 1);
  }

  protected decrementServings(): void {
    // 1未満にならないようにチェックします
    if (this.servings() > 1) {
      this.servings.update(currentValue => currentValue - 1);
    }
  }
}

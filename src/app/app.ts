/*!
 * @license
 * Copyright 2025 Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('My Recipe Box');

  // ↓↓↓ メソッドをここに移動します ↓↓↓
  protected handleButton1Click(): void {
    console.log('ボタン1がクリックされました！');
  }

  protected handleButton2Click(): void {
    console.log('ボタン2がクリックされました！');
  }
}

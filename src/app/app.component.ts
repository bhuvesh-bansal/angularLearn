import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="app-wrapper">
      <app-header/>
      <main class="main-content">
        <router-outlet/>
      </main>
    </div>
  `,
  styles: [`
    .app-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      padding: var(--spacing-md);
      background-color: var(--background-color);
    }
  `],
})
export class AppComponent {
  title = 'first-ng-app';
}

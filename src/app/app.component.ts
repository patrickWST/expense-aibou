import { Component } from '@angular/core';
// biome-ignore lint/style/useImportType: <explanation>
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})  
export class AppComponent {
  constructor(private router: Router) {}

  isHomepage() {
    return this.router.url === '/';
  }

  isSettingsPage() {
    return this.router.url === '/settings'
  }
}

import { Component, inject } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  theme;
  homeCurrency;

  constructor(private settingsService: SettingsService) {
    this.theme = this.settingsService.theme;
    this.homeCurrency = this.settingsService.homeCurrency;
  }

  changeTheme(): void {
    this.settingsService.changeTheme('dark');
  }
}

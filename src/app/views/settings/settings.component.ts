import { Component, inject } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  theme;
  homeCurrency;

  constructor(
    private settingsService: SettingsService,
    private storageService: StorageService,
  ) {
    this.theme = this.settingsService.theme;
    this.homeCurrency = this.settingsService.homeCurrency;
  }

  changeTheme(): void {
    this.settingsService.changeTheme('dark');
  }

  clearAllPersistedData(): void {
    this.storageService.clearAllPersistedData();
    window.location.reload();
  }
}

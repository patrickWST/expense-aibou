import { Injectable } from '@angular/core';

export interface Setting {
  value: string,
  lastChanged: number,
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _theme: Setting = {
    value: 'light',
    lastChanged: Date.now(),
  }

  private _homeCurrency: Setting = {
    value: 'EUR',
    lastChanged: Date.now(),
  }

  get theme(): Setting {
    return this._theme;
  }

  changeTheme(theme: string): void {
    this._theme.value = theme;
  }

  get homeCurrency(): Setting {
    return this._homeCurrency;
  }

  changeHomeCurrency(currency: string): void {
    this._homeCurrency.value = currency;
  }
}

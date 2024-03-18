import { Component } from '@angular/core';
// biome-ignore lint/style/useImportType: <explanation>
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ExchangeRate, ExchangeService } from './services/exchange/exchange.service';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})  
export class AppComponent {
  exchangeRate: ExchangeRate | undefined;

  constructor(
    private router: Router,
    private exchangeService: ExchangeService,
    private storageService: StorageService,
  ) {}

  ngOnInit () {
    const savedExchangeRate = this.storageService.loadData('exchangeRate') as ExchangeRate;
    const OneDay = new Date().getTime() + (1 * 24 * 60 * 60 * 1000);

    if (!savedExchangeRate?.timestamp || savedExchangeRate.timestamp > OneDay) {
      // get exchange rate on app start if not saved yet or outdated
      (async () => {
        this.exchangeRate = await this.exchangeService.getLatestExchangeRate('JPY');
        console.log('exRate:', this.exchangeRate);
        if (this.exchangeRate) {
          this.storageService.persistData('exchangeRate', this.exchangeRate);
        }
      })();
    }
  }

  isHomepage() {
    return this.router.url === '/';
  }

  isSettingsPage() {
    return this.router.url === '/settings'
  }
}

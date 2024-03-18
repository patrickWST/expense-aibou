import { Injectable } from '@angular/core';

export interface ExchangeRate {
  timestamp: number,
  date: string,
  currency: string,
  value: number,
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  async getLatestExchangeRate(currency: string): Promise<ExchangeRate | undefined> {
    console.log('fetch exchange rate');
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?to=${currency}`);
      const rate = await response.json();

      if (!response.ok) {
        throw new Error('Currency API response not OK!');
      }

      return {
        timestamp: Date.now(),
        date: new Date(rate.date).toLocaleDateString('de-at').slice(0, 10),
        currency,
        value: rate.rates[currency],
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}

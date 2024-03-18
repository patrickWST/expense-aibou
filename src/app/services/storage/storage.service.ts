import { Injectable } from '@angular/core';
import { Setting } from '../settings/settings.service';
import { Expense } from '../expense/expense.service';
import { ExchangeRate } from '../exchange/exchange.service';

type saveKey = 'settings' | 'expenses' | 'exchangeRate';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  saveStartDate(date: string): boolean {
    try {
      localStorage.setItem('startDate', date);
      return true;
    } catch (error) {
      console.log('Error saving date,', error);
      return false;
    }
  }

  loadStartDate(): string {
    console.log('load start date');
    
    try {
      const savedDate = localStorage.getItem('startDate');
      if (!savedDate) {
        const currentDate = new Date().toLocaleDateString('de-at').slice(0, 10);
        this.saveStartDate(currentDate);
        return currentDate;
      }
      return savedDate;
    } catch (error) {
      console.log('Error saving date,', error);
      return '';
    }
  }

  persistData(key: saveKey, data: Setting[] | Expense[] | ExchangeRate): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.log(`Error saving ${key},`, error);
      return false;
    }
  }

  loadData(key: saveKey): Setting[] | Expense[] | ExchangeRate | false {
    try {
      const data = localStorage.getItem(key);
      if (!data) {
        console.log('No Data to load');
        return false;
      }
      return JSON.parse(data);
    } catch (error) {
      console.log(`Error loading ${key},`, error);
      return false;
    }
  }

  clearAllPersistedData(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.log('Could not clear persisted data.');
      return false;
    }
  }
}

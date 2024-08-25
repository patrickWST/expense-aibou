import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { expenseSeed } from '../../data/expenseSeed';

export interface Transaction {
  id: string,
  date: string,
  time: string,
  details: string,
  originalCurrency: string,
  amount: number,
  exchangeRate: number,
  exchangeRateDate: string,
}

export interface Expense {
  name: string,
  total: number,
  transactions: Transaction[],
}

let defaultCategories: Expense[] = [
  {
    name: 'Food',
    total: 0,
    transactions: [],
  },
  {
    name: 'Transport',
    total: 0,
    transactions: [],
  },
  {
    name: 'Entries',
    total: 0,
    transactions: [],
  },
  {
    name: 'Hotels',
    total: 0,
    transactions: [],
  },
  {
    name: 'Clothes',
    total: 0,
    transactions: [],
  },
  {
    name: 'Stationery',
    total: 0,
    transactions: [],
  }
];

// TODO: Change seed to pouchDB seed when switching to pouchDB
defaultCategories = expenseSeed;

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private _expenses: Expense[];

  constructor(
    private storageService: StorageService,
  ) {
    const savedExpenses = storageService.loadData('expenses') as Expense[];
    this._expenses = savedExpenses || defaultCategories;
  }

  get totalExpenseAmount(): number {
    let total = 0;
    // biome-ignore lint/complexity/noForEach: <explanation>
    this._expenses.forEach((expense) => {
      total += expense.total;
    });
  return total;
  }

  get allExpenses(): Expense[]{
    return this._expenses;
  }

  getCategoryByName(name: string): Expense | undefined {
    return this._expenses.find((expense) => expense.name.toLowerCase() === name.toLowerCase());
  }

  getCategoryIndexByName(name: string): number {
    return this._expenses.findIndex((expense) => expense.name.toLowerCase() === name.toLowerCase());
  }

  addTransaction(categoryName: string, transaction: Omit<Transaction, 'id'>): boolean {
    const foundCategoryIndex = this.getCategoryIndexByName(categoryName);

    if(foundCategoryIndex === -1) {
      return false;
    }

    const uuid = window.crypto.randomUUID();
    this._expenses[foundCategoryIndex].transactions.push({
      id: uuid,
      ...transaction,
    })
    this._expenses[foundCategoryIndex].total += transaction.amount;

    this.storageService.persistData('expenses', this._expenses);
    return true;
  }

  addCategory(categoryName: string): boolean {
    const foundCategory = this.getCategoryByName(categoryName);

    if (foundCategory) {
      console.log('category already exists');
      return false;
    }

    this._expenses.push(
      {
        name: categoryName,
        total: 0,
        transactions: [],
      }
    )
    this.storageService.persistData('expenses', this._expenses);
    return true;
  }

  changeCategoryName(oldCategoryName: string, newCategoryName: string): boolean {
    const foundCategoryIndex = this.getCategoryIndexByName(oldCategoryName);

    if (foundCategoryIndex === -1) {
      console.log('category does not exist');
      return false;
    }

    // TODO additional checks if newCategoryName is valid & check url category for XSS
    this._expenses[foundCategoryIndex].name = newCategoryName;
    this.storageService.persistData('expenses', this._expenses);
    return true;
  }
}

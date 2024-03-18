import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

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

const defaultCategories: Expense[] = [
  {
    name: 'food',
    total: 0,
    transactions: [],
  },
  {
    name: 'transport',
    total: 0,
    transactions: [],
  },
  {
    name: 'entries',
    total: 0,
    transactions: [],
  },
  {
    name: 'hotels',
    total: 0,
    transactions: [],
  },
  {
    name: 'clothes',
    total: 0,
    transactions: [],
  },
  {
    name: 'stationery',
    total: 0,
    transactions: [],
  }
];

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

  getExpenseByName(name: string): Expense | undefined {
    return this._expenses.find((expense) => expense.name === name);
  }

  getExpenseIndexByName(name: string): number {
    return this._expenses.findIndex((expense) => expense.name === name);
  }

  addTransaction(expenseName: string, transaction: Omit<Transaction, 'id'>): boolean {
    const foundExpenseIndex = this.getExpenseIndexByName(expenseName);

    if(foundExpenseIndex === -1) {
      return false;
    }

    const uuid = window.crypto.randomUUID();
    this._expenses[foundExpenseIndex].transactions.push({
      id: uuid,
      ...transaction,
    })
    this._expenses[foundExpenseIndex].total += transaction.amount;

    this.storageService.persistData('expenses', this._expenses);
    return true;
  }

  addCategory(categoryName: string): boolean {
    const foundCategory = this.getExpenseByName(categoryName);

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
}

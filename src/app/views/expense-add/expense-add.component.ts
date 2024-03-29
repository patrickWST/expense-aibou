import { Component, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense/expense.service';
import { StorageService } from '../../services/storage/storage.service';
import { ExchangeRate } from '../../services/exchange/exchange.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-expense-add',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './expense-add.component.html',
  styleUrl: './expense-add.component.css'
})
export class ExpenseAddComponent {
  selectedExpense = '';

  exchangeRate: number;

  exchangeRateDate: string;

  currencies = [
    'JPY',
    'EUR',
  ];

  @Input()
  set id(expenseName: string) {
    this.selectedExpense = expenseName;
  }

  constructor(
    private expenseService: ExpenseService,
    private storageService: StorageService,
    private router: Router,
  ) {
    const savedExchangeRate = this.storageService.loadData('exchangeRate') as ExchangeRate;
    this.exchangeRate = savedExchangeRate.value;
    this.exchangeRateDate = savedExchangeRate.date;
  }

  addExpenseForm = new FormGroup({
    date: new FormControl(new Date().toISOString().slice(0, 10)),
    time: new FormControl(new Date().toTimeString().slice(0,5)),
    details:  new FormControl(''),
    currency: new FormControl('JPY'),
    amount: new FormControl('', [
      Validators.required,
      Validators.min(0.01),
    ]),
  })

  get convertedAmount() {
    const amount = this.addExpenseForm.get('amount');
    if (amount?.value) {
      const amountValue = Number(amount.value);
      return amountValue / this.exchangeRate;
    }
    return 0;
  }

  get amount() { return this.addExpenseForm.get('amount'); }

  get selectedCurrency() { return this.addExpenseForm.get('currency')}


  handleSubmit() {
    console.log(this.addExpenseForm.value);

    if (!this.addExpenseForm.valid) {
      return;
    }

    const newTransaction = {
      date: this.addExpenseForm.value.date || '',
      time: this.addExpenseForm.value.time || '',
      details: this.addExpenseForm.value.details || '',
      originalCurrency: this.addExpenseForm.value.currency || '',
      amount: this.convertedAmount,
      exchangeRate: this.exchangeRate,
      exchangeRateDate: this.exchangeRateDate,
    };

    this.expenseService.addTransaction(this.selectedExpense, newTransaction);
    this.router.navigateByUrl('/');
  }
}

import { Component, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense/expense.service';
import { StorageService } from '../../services/storage/storage.service';
import { ExchangeRate } from '../../services/exchange/exchange.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-expense-add',
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
    const expenseExists = !!this.expenseService.getCategoryByName(expenseName);
    if (!expenseExists) {
      this.router.navigateByUrl('/');
      return;
    }
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
    currency: new FormControl('JPY'), // TODO: Change to last used or trip setting currency
    amount: new FormControl('', [
      Validators.required,
      Validators.min(0.01),
    ]),
  })

  get convertedAmount() {
    const amount = this.addExpenseForm.get('amount');
    if (amount?.value) {
      const converted = Number(amount.value) / this.exchangeRate;
      return Number(converted.toFixed(3));
    }
    return 0;
  }

  get amount() { return this.addExpenseForm.get('amount'); }

  get selectedCurrency() { return this.addExpenseForm.get('currency')}

  // TODO: Change EUR to home currency
  get selectedCurrencyIsHomeCurrency() { return this.selectedCurrency?.value === 'EUR'}


  handleSubmit() {
    console.log(this.addExpenseForm.value);

    if (!this.addExpenseForm.valid || !this.amount?.value) {
      // TODO: Improve UX by showing some info
      return;
    }

    const newTransaction = {
      date: this.addExpenseForm.value.date || '',
      time: this.addExpenseForm.value.time || '',
      details: this.addExpenseForm.value.details || '',
      originalCurrency: this.addExpenseForm.value.currency || '',
      amount: this.selectedCurrencyIsHomeCurrency ? Number(this.amount.value) : this.convertedAmount,
      exchangeRate: this.selectedCurrencyIsHomeCurrency ? 1 : this.exchangeRate,
      exchangeRateDate: this.selectedCurrencyIsHomeCurrency ? '' : this.exchangeRateDate,
    };

    this.expenseService.addTransaction(this.selectedExpense, newTransaction);
    this.router.navigateByUrl('/');
  }

  changeCategoryName(newCategoryName: string) {
    this.expenseService.changeCategoryName(this.selectedExpense, newCategoryName);
    this.router.navigateByUrl(`/expense/add/${newCategoryName}`);
  }

  changeCategoryNameForm = new FormGroup({
    category:  new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  })

  openChangeCategoryModal(): void {
    const dialogElement = document.getElementById('categoryNameChangeDialog') as HTMLDialogElement;
    dialogElement.showModal();
  }

  closeChangeCategoryNameModal(): void {
    const dialogElement = document.getElementById('categoryNameChangeDialog') as HTMLDialogElement;
    dialogElement.close();
    this.changeCategoryNameForm.setValue({category: ''});
  }

  handleChangeCategoryNameSubmit(): void {
    const chosenCategory = this.changeCategoryNameForm.value.category;
    if (chosenCategory) {
      this.changeCategoryName(chosenCategory);
    }
    this.closeChangeCategoryNameModal();
  }
}

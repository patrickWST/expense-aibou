import { Component, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expense-add',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './expense-add.component.html',
  styleUrl: './expense-add.component.css'
})
export class ExpenseAddComponent {
  selectedExpense = '';

  exchangeRate = 160;

  exchangeRateDate = '23.04.2023';

  currencies = [
    'JPY',
    'EUR',
  ];

  @Input()
  set id(expenseName: string) {
    this.selectedExpense = expenseName;
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
  }
}

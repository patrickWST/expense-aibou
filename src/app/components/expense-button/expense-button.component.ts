import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Expense } from '../../services/expense/expense.service';

@Component({
    selector: 'app-expense-button',
    imports: [CurrencyPipe, RouterLink, TitleCasePipe],
    templateUrl: './expense-button.component.html',
    styleUrl: './expense-button.component.css'
})
export class ExpenseButtonComponent {
  @Input() expense!: Expense;

  @Input() homeCurrency = 'EUR';
}

import { Component } from '@angular/core';
import { SummaryComponent } from '../../components/summary/summary.component';
import { ExpenseService } from '../../services/expense/expense.service';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-summary-view',
    imports: [SummaryComponent, CurrencyPipe, TitleCasePipe],
    templateUrl: './summary-view.component.html',
    styleUrl: './summary-view.component.css'
})
export class SummaryViewComponent {
  expenses;

  constructor(
    private expenseService: ExpenseService,
  ) {
    this.expenses = this.expenseService.allExpenses;
  }
}

import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense/expense.service';
import { StorageService } from '../../services/storage/storage.service';


@Component({
    selector: 'app-summary',
    imports: [CurrencyPipe, RouterLink],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.css'
})
export class SummaryComponent {
  @Input() hideSummaryButton = false; 

  totalExpenseAmount: number;

  expenseStartDate: string;

  constructor(
    private expenseService: ExpenseService,
    private storageService: StorageService,
  ) {
    this.totalExpenseAmount = this.expenseService.totalExpenseAmount;
    this.expenseStartDate = this.storageService.loadStartDate();
  }
}

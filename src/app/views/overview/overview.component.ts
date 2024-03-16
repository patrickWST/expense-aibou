import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SummaryComponent } from '../../components/summary/summary.component';
import { ExpenseButtonComponent } from '../../components/expense-button/expense-button.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    SummaryComponent,
    ExpenseButtonComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  expenses = [
    'food',
    'transport',
    'hotels',
    'clothes',
    'entries',
  ]

  openAddCategoryModal(): void {
    console.log('open modal');
  }
}

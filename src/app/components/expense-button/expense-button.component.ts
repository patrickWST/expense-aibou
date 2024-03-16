import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expense-button',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, TitleCasePipe],
  templateUrl: './expense-button.component.html',
  styleUrl: './expense-button.component.css'
})
export class ExpenseButtonComponent {
  @Input() expenseName = '';
}

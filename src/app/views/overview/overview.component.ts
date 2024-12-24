import { Component } from '@angular/core';
import { SummaryComponent } from '../../components/summary/summary.component';
import { ExpenseButtonComponent } from '../../components/expense-button/expense-button.component';
import { ExpenseService } from '../../services/expense/expense.service';
import { SettingsService } from '../../services/settings/settings.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    selector: 'app-overview',
    imports: [
    SummaryComponent,
    ExpenseButtonComponent,
    ReactiveFormsModule
],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.css'
})
export class OverviewComponent {
  expenses;
  homeCurrency;

  constructor(
    private expenseService: ExpenseService,
    private settingsService: SettingsService,
  ) {
    this.expenses = this.expenseService.allExpenses;
    this.homeCurrency = this.settingsService.homeCurrency;
  }

  addCategoryForm = new FormGroup({
    category:  new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  })

  openAddCategoryModal(): void {
    const dialogElement = document.getElementById('categoryDialog') as HTMLDialogElement;
    dialogElement.showModal();
  }

  closeAddCategoryModal(): void {
    const dialogElement = document.getElementById('categoryDialog') as HTMLDialogElement;
    dialogElement.close();
    this.addCategoryForm.setValue({category: ''});
  }

  handleSubmit(): void {
    const chosenCategory = this.addCategoryForm.value.category;
    if (chosenCategory) {
      this.expenseService.addCategory(chosenCategory);
    }
    this.closeAddCategoryModal();
  }
}

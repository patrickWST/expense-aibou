// biome-ignore lint/style/useImportType: <explanation>
import { Routes } from '@angular/router';
import { OverviewComponent } from './views/overview/overview.component';
import { SettingsComponent } from './views/settings/settings.component';
import { ExpenseAddComponent } from './views/expense-add/expense-add.component';
import { SummaryViewComponent } from './views/summary-view/summary-view.component';

export const routes: Routes = [
    {
        path: 'settings',
        title: 'Settings - Expense Aibou',
        data: {
            title: 'Settings'
        },
        component: SettingsComponent,
    },
    {
        path: 'expense/add/:id',
        title: 'Add Expense - Expense Aibou',
        data: {
            title: 'Add Expense'
        },
        component: ExpenseAddComponent,
    },
    // {
    //     path: 'expense/edit/:id',
    //     title: 'Edit Expense',
    //     component: ExpenseEditComponent,
    // },
    {
        path: 'summary-view',
        title: 'Summary - Expense Aibou',
        data: {
            title: 'Summary'
        },
        component: SummaryViewComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        title: 'Expense Aibou',
        data: {
            title: 'Expensee Aibou'
        },
        component: OverviewComponent,
    }, 
    {
        path: '**',
        redirectTo: '',
    }, 
];

import { Expense } from "../services/expense/expense.service";

export const expenseSeed: Expense[] = [
    {
      name: 'Food',
      total: 10,
      transactions: [
        {
          id: 'dfdf-dfdfd-greqger-fdsgf',
          date: '2024-08-23',
          time: '20:23',
          details: 'Gyudon',
          originalCurrency: 'JPY',
          amount: 10,
          exchangeRate: 162.37,
          exchangeRateDate: '2024-08-23',
        }
      ],
    },
    {
      name: 'Transport',
      total: 230,
      transactions: [
        {
          id: 'dfdf-d4dfd-greqger-fdsgf',
          date: '2024-08-22',
          time: '10:23',
          details: 'Shinkansen',
          originalCurrency: 'JPY',
          amount: 120,
          exchangeRate: 162.37,
          exchangeRateDate: '2024-08-22',
        },
        {
          id: 'dfdf-d4dfd-greqger-ttsgf',
          date: '2024-08-20',
          time: '12:23',
          details: 'Shinkansen',
          originalCurrency: 'JPY',
          amount: 110,
          exchangeRate: 162.37,
          exchangeRateDate: '2024-08-20',
        }
      ],
    },
    {
      name: 'Entries',
      total: 0,
      transactions: [],
    },
    {
      name: 'Hotels',
      total: 500,
      transactions: [
        {
          id: 'dfdf-d2dfd-greqger-fdsgf',
          date: '2024-08-21',
          time: '12:23',
          details: 'Miracosta',
          originalCurrency: 'JPY',
          amount: 500,
          exchangeRate: 162.37,
          exchangeRateDate: '2024-08-21',
        }
      ],
    },
    {
      name: 'Clothes',
      total: 0,
      transactions: [],
    },
    {
      name: 'Stationery',
      total: 0,
      transactions: [],
    }
  ];
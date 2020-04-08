import { BudgetObj } from './BudgetObj';
import { ExpenseObj } from './ExpenseObj';

export interface user{
    first: string,
    last: string,
    phone: string,
    email: string,
    password: string,
    currentBudget: BudgetObj,
    currentExpense: ExpenseObj,
    archiveBudget: BudgetObj[],
    archiveExpense: ExpenseObj[]
}
import { BudgetObj } from './BudgetObj';
import { ExpenseObj } from './ExpenseObj';
import { Goal } from './Goal';

export interface user{
    first: string,
    last: string,
    phone: string,
    email: string,
    password: string,
    currentBudget: BudgetObj,
    currentExpense: ExpenseObj,
    archiveBudget: BudgetObj[],
    archiveExpense: ExpenseObj[],
    goals: Goal[]
}
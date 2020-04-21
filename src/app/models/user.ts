import { BudgetObj } from './BudgetObj';
import { ExpenseObj } from './ExpenseObj';
import { Goal } from './Goal';

export interface user{
    first: string,
    last: string,
    email: string,
    phone: string,
    date: string, 
    initial: boolean,
    currentBudget: BudgetObj,
    currentExpense: ExpenseObj,
    archiveBudget: BudgetObj[],
    archiveExpense: ExpenseObj[],
    goals: Goal[]
}
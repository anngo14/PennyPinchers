import { budgetCategory } from './budgetCategory';

export interface BudgetObj{
    monthlyIncome: number, 
    date: string,
    categories: budgetCategory[]
}
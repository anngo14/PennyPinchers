import { budgetCategory } from './budgetCategory';
import { income } from './income';

export interface BudgetObj{
    incomes: income[],
    monthlyIncome: number, 
    date: string,
    categories: budgetCategory[]
}
import { budgetCategoryList } from './budgetCategoryList';

export interface budgetCategory{
    type: number,
    percentage: number,
    items: budgetCategoryList[]
}
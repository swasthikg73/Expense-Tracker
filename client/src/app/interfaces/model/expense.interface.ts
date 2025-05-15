import { BudgetCategory } from "./budgetCategory.interface";

export interface IExpense {
    id: string,
    name: string,
    amount: number,
    budgetCategoryId: BudgetCategory,
    date: Date
}
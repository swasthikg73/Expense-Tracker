import { BudgetCategory } from './../interfaces/model/budgetCategory.interface';
import { Injectable } from '@angular/core';
import { IExpense } from '../interfaces/model/expense.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { BudgetService } from './budget.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


  public EXPENSE: string = 'EXPENSES';

  public expenseSubject: BehaviorSubject<IExpense[]> = new BehaviorSubject<IExpense[]>([]);

  constructor(private budgetservice: BudgetService) {
    const expenses = this.getExpense();
    this.expenseSubject.next(expenses);
    console.log(this.expenseSubject.value);

  }

  createExpense(expense: IExpense) {
    const budget = this.budgetservice.getBudgetsById(expense.budgetCategoryId.id)
    const expenses = this.getExpense()
    expenses.push(expense);
    this.addExpense(expenses);
    this.updateExpense(expenses, budget.id)
  }

  addExpense(expense: IExpense[]) {

    localStorage.setItem(this.EXPENSE, JSON.stringify(expense));

    // const exp = expense.map((item: IExpense) => {
    //   return {
    //     id: item.id,
    //     name: item.name,
    //     amount: item.amount,
    //     budgetCategoryId: item.budgetCategoryId
    //   } as IExpense
    // });

    this.expenseSubject.next(expense);
  }

  getExpense(): IExpense[] {
    const expenses = JSON.parse(localStorage.getItem(this.EXPENSE) || '[]') as IExpense[];
    return expenses;
  }

  getExpensesByTd(expenseId: string): any {
    const expenses = this.getExpense();
    const expense = expenses.filter((expense: IExpense) => expense.budgetCategoryId.id === expenseId
    )
    return expense;
  }

  UpdateDeletedExpense(expenses: IExpense[]) {
    localStorage.setItem(this.EXPENSE, JSON.stringify(expenses));
    this.expenseSubject.next(expenses);
  }

  deleteExpense(expense: IExpense) {
    const exp = this.getExpense();
    const deleted = exp.filter((item: IExpense) => {
      item.id != expense.id
    })
    this.UpdateDeletedExpense(deleted)
  }

  buildExpenseTable(expense: IExpense[]) {
    return expense.map((item: IExpense) => {
      return {
        id: item.id,
        name: item.name,
        amount: item.amount,
        date: item.date,
        color: item.budgetCategoryId.color,
        budget: item.budgetCategoryId.name
      }
    })
  }

  getExpenseData(): Observable<IExpense[]> {
    return this.expenseSubject;
  }

  updateExpense(expenses: IExpense[], budgetId: string) {
    const budgetExpenses = expenses.filter((item) => item.budgetCategoryId.id === budgetId);
    const totalExpense = budgetExpenses.reduce((sum: number, current: IExpense) =>
      sum + (Number(current.amount) || 0), 0);
    this.budgetservice.addSpentToBudget(budgetId, totalExpense);
  }

  deleteExpenseById(expenseId: string) {
    const expenses = this.getExpense();
    const expense = expenses.filter((exp) => exp.id === expenseId)[0]

    if (!expense) {
      throw Error("Cannot delete expense that doesn't exist");
    }
    const deleted = expenses.filter((exp: IExpense) => {
      return exp.id != expenseId
    });
    this.UpdateDeletedExpense(deleted)
    this.updateExpense(deleted, expense.budgetCategoryId.id);
    window.location.reload()
  }
}

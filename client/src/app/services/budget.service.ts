import { BudgetCategory } from './../interfaces/model/budgetCategory.interface';
import { Budget } from './../interfaces/model/budget.interface';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  public BUDGET: string = 'BUDGETS';
  public BUDGET_CATEGORIES = 'BUDGET_CATEGORIES';


  //A Subject is a special type of Observable that allows values to be multicasted to many Observers. Subjects are like EventEmitters.
  //Every Subject is an Observable and an Observer. You can subscribe to a Subject, and you can call next to feed values as well as error and complete.


  public budgetSubject: Subject<Budget[]> = new Subject();
  // public budgetCategorySubject: Subject<BudgetCategory[]> = new Subject();
  public budgetCategorySubject: BehaviorSubject<BudgetCategory[]> = new BehaviorSubject<BudgetCategory[]>([]);



  public budget$: Observable<Budget[]> = new Observable();
  // public budgetCategory$: Observable<BudgetCategory[]> = new Observable()

  constructor() {
    const budgetExpeses = this.getBudgetCategory();
    this.budgetCategorySubject.next(budgetExpeses);
  }

  addBudget(budget: Budget) {
    const budgets = this.getBudgets();
    budgets.push(budget)
    this.setBudget(budgets);
  }

  getBudgets(): Budget[] {
    const budgets = JSON.parse(localStorage.getItem(this.BUDGET) || '[]') as Budget[]
    return budgets;
  }

  getBudgetCategory(): BudgetCategory[] {

    const category = JSON.parse(localStorage.getItem(this.BUDGET) || '[]') as BudgetCategory[]
    this.budgetCategorySubject.next(category);

    return category;
  }

  addSpentToBudget(id: string, spent: number) {
    const budgets = this.getBudgets();

    const index = budgets.findIndex(x => x.id === id);
    if (index > - 1) {
      budgets[index].spent = spent;
      this.setBudget(budgets);
      return;
    }

    throw Error('can not update for a budget that does not exist')
  }

  getBudgetsById(budgetid: string) {
    const budgets = this.getBudgets();
    const index = budgets.findIndex(x => x.id === budgetid);
    if (index > -1) {
      return budgets[index]
    }
    throw Error('Budget does not exist');
  }

  setBudget(budget: Budget[]) {
    localStorage.setItem(this.BUDGET, JSON.stringify(budget));
    this.setBudgetCategory(budget);
    this.budgetSubject.next(budget);
  }

  setBudgetCategory(BudgetCategory: BudgetCategory[]) {
    localStorage.setItem(this.BUDGET_CATEGORIES, JSON.stringify(BudgetCategory));

    this.budgetCategorySubject.next(BudgetCategory);
  }

  getBudgetData(): Observable<any> {

    const budgets = JSON.parse(localStorage.getItem(this.BUDGET) || '[]') as Budget[]

    return of(budgets);

  }
  getBudgetCategoryData(): Observable<BudgetCategory[]> {
    // const categories = this.getBudgetCategory();
    // return of(categories);
    return this.budgetCategorySubject;
  }

}
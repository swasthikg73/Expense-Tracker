import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormWrapperComponent } from "../../components/form-wrapper/form-wrapper.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { ExpenseService } from '../../services/expense.service';
import { BudgetCategory } from '../../interfaces/model/budgetCategory.interface';
import { v4 as uuidv4 } from 'uuid'
import { Budget } from '../../interfaces/model/budget.interface';
import { BudgetCardConfig } from '../../interfaces/ui-config/budget-card-config.interface';
import { Router } from '@angular/router';
import { BudgetCardComponent } from "../../components/budget-card/budget-card.component";
import { UiService } from '../../services/ui.service';
import { ITableDataConfig } from '../../interfaces/model/table-data-config.interface';
import { IExpense } from '../../interfaces/model/expense.interface';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-home',
  imports: [FormWrapperComponent, ReactiveFormsModule, BudgetCardComponent, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  budgetCategory: BudgetCategory[] = [];
  allbudgets: Budget[] = [];
  budgetCard: BudgetCardConfig[] = [];
  expeseTableDatas: ITableDataConfig[] = [];
  public me: any = JSON.parse(localStorage.getItem('ET_User') || '{}');

  constructor(private router: Router,
    public userService: UserService,
    private budgetService: BudgetService,
    private expenseService: ExpenseService,
    private uiSErvice: UiService
  ) { }

  budgetForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    budget: new FormControl(null, Validators.required),
  });

  expenseForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl(null, Validators.required),
    budgetCategoryId: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.getBudgetCategory();
    this.getBudgets();
    this.buildBudgetCards(this.allbudgets);

    const expenses = this.expenseService.getExpense();
    this.expeseTableDatas = this.expenseService.buildExpenseTable(expenses);

    this.expenseService.getExpenseData().subscribe({
      next: (res: IExpense[]) => {
        this.expeseTableDatas = this.expenseService.buildExpenseTable(res);
      },
      error: (err) => {
        console.error(err.message);

      }
    })
  }

  getBudgetCategory() {
    this.budgetService.getBudgetCategoryData().subscribe({
      next: ((res) => { this.budgetCategory = res; }),
      error: (error) => console.log(error.message)
    })
  }

  getBudgets() {
    this.budgetService.getBudgetData().subscribe({
      next: (res) => {
        this.allbudgets = res;
      },
      error: (err) => console.log("Error :", err.message)
    })
  }

  addBudget() {
    const budget = {
      id: uuidv4(),
      name: this.budgetForm.value.name,
      budget: parseInt(this.budgetForm.value.budget),
      spent: 0,
      color: this.uiSErvice.generateRandomColor(this.allbudgets.length + 1)
    }
    this.budgetService.addBudget(budget);
    this.buildBudgetCards(this.allbudgets);
    this.budgetForm.reset();
  }

  addExpense() {
    const budgetCategory = this.budgetService.getBudgetsById(this.expenseForm.value.budgetCategoryId);
    const expense = {
      id: uuidv4(),
      name: this.expenseForm.value.name,
      amount: this.expenseForm.value.amount,
      budgetCategoryId: budgetCategory,
      date: new Date()
    }

    this.expenseService.createExpense(expense);
    this.expenseForm.reset();
    window.location.reload();
  }

  buildBudgetCards(budgets: Budget[]) {
    let budget: Budget[] = []
    this.budgetService.getBudgetData().subscribe({
      next: (item) => { budget = item }
    });
    this.budgetCard = budget.map((item: Budget) => {
      return {
        name: item.name,
        budget: item.budget,
        spent: item.spent,
        color: item.color,
        onClick: () => {
          this.router.navigateByUrl(`/details/${item.id}`)
        }
      }
    })
  }

  deleteRecordfromTable(item: ITableDataConfig) {
    // console.log("deleteRecordfromTable", item);
    this.expenseService.deleteExpenseById(item.id)

  }
}

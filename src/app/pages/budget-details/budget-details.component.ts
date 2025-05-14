import { Component, OnInit } from '@angular/core';
import { BudgetCardConfig } from '../../interfaces/ui-config/budget-card-config.interface';
import { ITableDataConfig } from '../../interfaces/model/table-data-config.interface';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { BudgetCardComponent } from '../../components/budget-card/budget-card.component';
import { v4 as uuidv4 } from 'uuid'
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-budget-details',
  imports: [ReactiveFormsModule, BudgetCardComponent, RouterLink, TableComponent],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.css'
})
export class BudgetDetailsComponent implements OnInit {

  budgetCard!: BudgetCardConfig;
  expenseTableData: ITableDataConfig[] = [];
  budgetId: string = '';

  expenseForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl(null, Validators.required),
  });

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private expenseService: ExpenseService, private budgetService: BudgetService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.budgetId = params['id'];
      this.initializeData();
      const expense = this.expenseService.getExpensesByTd(this.budgetId);
      this.expenseTableData = this.expenseService.buildExpenseTable(expense);
    })
  }

  initializeData() {
    const budget = this.budgetService.getBudgetsById(this.budgetId);
    this.budgetCard = {
      name: budget.name,
      budget: budget.budget,
      spent: budget.spent,
      color: budget.color,
      onClick: () => { }
    }
  }

  addExpense() {
    const budgetCategory = this.budgetService.getBudgetsById(this.budgetId);
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

  deleteRecordfromTable(item: ITableDataConfig) {
    // console.log("deleteRecordfromTable", item);
    this.expenseService.deleteExpenseById(item.id)

  }
}


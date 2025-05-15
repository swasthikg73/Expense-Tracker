import { Component, Input, OnInit } from '@angular/core';
import { BudgetCardConfig } from '../../interfaces/ui-config/budget-card-config.interface';
import { Router } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-budget-card',
  imports: [CurrencyPipe],
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.css'
})
export class BudgetCardComponent implements OnInit {

  @Input() config!: any
  @Input() isdelete: boolean = false;

  bgColor: string = '';
  beforeColor: string = '';
  textColor: string = '';
  borderColor: string = ''
  isDelete: boolean = false;

  constructor(private router: Router, private uiService: UiService) { }

  ngOnInit(): void {
    if (!this.config) {
      return
    }
    this.borderColor = this.uiService.generateTailwindClass(this.config.color, 'border')
    this.textColor = this.uiService.generateTailwindClass(this.config.color, 'text')
    this.bgColor = this.uiService.generateTailwindClass(this.config.color, 'bg')
  }

  calculatrPrecentage() {
    // console.log("Config :", this.config);

    return (this.config.spent / this.config.budget) * 100 + '%';
  }

  viewDetails() {
    if (this.config.onClick) {
      this.config.onClick();
    }
  }

  deleteExpense() {

  }
}

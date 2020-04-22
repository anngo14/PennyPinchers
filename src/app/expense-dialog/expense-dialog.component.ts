import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { expenseList } from '../models/expenseList';
import { budgetCategoryList } from '../models/budgetCategoryList';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent implements OnInit {

  expenses: expenseList[] = [];
  expenseTitle: string;
  expenseAmount: number;
  uncategorized: budgetCategoryList[] = [];
  need: budgetCategoryList[] = [];
  want: budgetCategoryList[] = [];
  saving: budgetCategoryList[] = [];

  constructor(public expenseDialogRef: MatDialogRef<ExpenseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.expenses = this.data.expenseList;
    this.uncategorized = this.data.uncategorizedList;
    this.need = this.data.needList;
    this.want = this.data.wantList;
    this.saving = this.data.savingList;
  }
  
  addNewExpense(){
    if(this.expenseTitle.trim() === "" || this.expenseAmount === undefined || this.expenseAmount === null){
      return;
    }

    let expense = {
      title: this.expenseTitle,
      budget: this.expenseAmount,
      used: this.expenseAmount
    };
    let uncategorized = {
      title: this.expenseTitle,
      amount: this.expenseAmount
    };

    this.expenses.push(expense);
    this.uncategorized.push(uncategorized);

    this.expenseTitle = "";
    this.expenseAmount = null;
  }
  save(){
    for(let i = 0; i < this.need.length; i++){
      this.need[i].title = this.expenses[i].title;
    }
    for(let i = 0; i < this.want.length; i++){
      this.want[i].title = this.expenses[i + this.need.length].title;
    }
    for(let i = 0; i < this.saving.length; i++){
      this.saving[i].title = this.expenses[i + this.need.length + this.want.length].title;
    }
    for(let i = 0; i < this.uncategorized.length; i++){
      this.uncategorized[i].title = this.expenses[i + this.need.length + this.want.length + this.saving.length].title;
    }
  }
}

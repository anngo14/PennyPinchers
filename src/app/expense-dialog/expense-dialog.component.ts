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
  uncategorized: budgetCategoryList[];

  constructor(public expenseDialogRef: MatDialogRef<ExpenseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.expenses = this.data.expenseList;
    this.uncategorized = this.data.uncategorizedList;
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
    this.data.uncategorizedList.push(uncategorized);

    this.expenseTitle = "";
    this.expenseAmount = null;
  }
}

import { Component, OnInit } from '@angular/core';
import { expense } from '../models/expense';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  expenses = [];
  empty = true;
  expenseAmount = "";
  expenseTitle = "";
  constructor() { }

  ngOnInit() {
    if(this.expenses.length > 0){
      this.empty = false;
    }
  }
  addMonthlyExpense(){
    let monthlyExpense = {
      title: this.expenseTitle,
      amount: this.expenseAmount
    };
    this.empty = false;
    this.expenses.push(monthlyExpense);
  }
  deleteExpense(e: expense){
    let index = this.expenses.indexOf(e);
    this.expenses.splice(index, 1);
    if(this.expenses.length === 0){
      this.empty = true;
    }
  }

}

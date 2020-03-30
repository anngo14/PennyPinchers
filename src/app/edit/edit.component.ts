import { Component, OnInit } from '@angular/core';
import { expense } from '../models/expense';
import { income } from '../models/income';

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
  incomes: income[] = [{income: "", frequency: "", type: ""}];
  constructor() { }

  ngOnInit() {
    if(this.expenses.length > 0){
      this.empty = false;
    }
  }
  addMonthlyExpense(){
    if(this.expenseTitle === "" || this.expenseAmount === ""){
      return;
    }
    
    let monthlyExpense = {
      title: this.expenseTitle,
      amount: this.expenseAmount
    };
    this.empty = false;
    this.expenses.push(monthlyExpense);
    this.expenseTitle = "";
    this.expenseAmount = "";
  }
  deleteExpense(e: expense){
    let index = this.expenses.indexOf(e);
    this.expenses.splice(index, 1);
    if(this.expenses.length === 0){
      this.empty = true;
    }
  }
  addIncomeSource(){
    let income = {
      income: "",
      frequency: "",
      type: ""
    };
    this.incomes.push(income);
  }
  deleteIncome(i: income){
    let index = this.incomes.indexOf(i);
    this.incomes.splice(index, 1);
  }
}

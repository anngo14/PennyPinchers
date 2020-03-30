import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { expense } from '../models/expense';
import { income } from '../models/income';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  expenses: expense[] = [];
  empty = true;
  firstName = "";
  lastName = "";
  goal = "";
  expenseTitle = "";
  expenseAmt = "";
  incomes: income[] = [{income: "", frequency: "", type: ""}];
  constructor(private r: Router) { }

  ngOnInit() {
    if(this.expenses.length > 0){
      this.empty = false;
    }
  }
  redirectToHome(){
    this.r.navigate(['/home']);
  }
  addMonthlyExpense(){
    if(this.expenseTitle === "" || this.expenseAmt === ""){
      return;
    }
    
    let monthlyExpense = {
      title: this.expenseTitle,
      amount: this.expenseAmt
    };
    this.empty = false;
    this.expenses.push(monthlyExpense);
    this.expenseTitle = "";
    this.expenseAmt = "";
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

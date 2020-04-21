import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { income } from '../models/income';
import { budgetCategoryList } from '../models/budgetCategoryList';
import { BudgetObj } from '../models/BudgetObj';
import { ExpenseObj } from '../models/ExpenseObj';
import { expenseList } from '../models/expenseList';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  expenses: expenseList[] = [];
  custom: boolean = false;
  firstName: string = "";
  lastName: string = "";
  goal: number;
  needPercentage: number = 50;
  wantPercentage: number = 30;
  savingPercentage: number = 20;
  expenseTitle: string;
  expenseAmt: number;
  needTitle: string;
  needAmt: number;
  needs: budgetCategoryList[] = [];
  needsExpense: expenseList[] = [];
  wantTitle: string;
  wantAmt: number;
  wants: any = [];
  wantsExpense: expenseList[] = [];
  savingTitle: string;
  savingAmt: number;
  savings: any = [];
  savingExpense: expenseList[] = [];
  incomes: income[] = [{income: null, frequency: "", hoursWeekly: 0, type: ""}];
  date: string;

  constructor(private r: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("user") === null && localStorage.getItem("user") === null){
      this.r.navigate(['/denied']);
    }
    console.log(sessionStorage.getItem("status"));
    if(sessionStorage.getItem("status") === "false" || localStorage.getItem("status") === "false"){
      this.r.navigate(['/home']);
    }
    var d = new Date();
    this.date = d.getMonth() + " " + d.getFullYear();
  }
  redirectToHome(){
    let initialBudget: BudgetObj = {
      incomes: this.incomes,
      monthlyIncome: this.calculateMonthlyIncome(),
      date: this.date,
      categories: [
        {
          type: 0,
          percentage: this.needPercentage,
          items: this.needs
        },
        {
          type: 1,
          percentage: this.wantPercentage,
          items: this.wants
        },
        {
          type: 2,
          percentage: this.savingPercentage,
          items: this.savings
        },
        {
          type: 3,
          percentage: null,
          items: null
        }
      ]
    };
    let initialExpense: ExpenseObj = {
      date: this.date,
      items: this.needsExpense.concat(this.wantsExpense).concat(this.savingExpense).concat(this.expenses)
    };
    console.log(initialBudget);
    console.log(initialExpense);
    if(confirm("Are you sure this information is correct?")){
      this.r.navigate(['/home']);
    }
  }
  addNeedCategory(){
    if(this.needTitle === "" || Number.isNaN(this.needAmt)){
      return;
    }

    this.needs.push({title: this.needTitle, amount: this.needAmt});
    this.needsExpense.push({title: this.needTitle, budget: this.needAmt, used: null});
    this.needTitle = "";
    this.needAmt = null;
  }
  deleteCategory(c){
    let index = this.needs.indexOf(c);
    this.needsExpense.splice(index, 1);
    this.needs.splice(index, 1);
  }
  addWantCategory(){
    if(this.wantTitle === "" || Number.isNaN(this.wantAmt)){
      return;
    }

    this.wants.push({title: this.wantTitle, amount: this.wantAmt});
    this.wantsExpense.push({title: this.wantTitle, budget: this.wantAmt, used: null});
    this.wantTitle = "";
    this.wantAmt = null;
  }
  deleteWantCategory(c){
    let index = this.wants.indexOf(c);
    this.wantsExpense.splice(index, 1);
    this.wants.splice(index, 1);
  }
  addSavingCategory(){
    if(this.savingTitle === "" || Number.isNaN(this.savingAmt)){
      return;
    }

    this.savings.push({title: this.savingTitle, amount: this.savingAmt});
    this.savingExpense.push({title: this.savingTitle, budget: this.savingAmt, used: null});
    this.savingTitle = "";
    this.savingAmt = null;
  }
  deleteSavingCategory(c){
    let index = this.savings.indexOf(c);
    this.savingExpense.splice(index, 1);
    this.savings.splice(index, 1);
  }
  onToggle(event){
    this.custom = !this.custom;
  }
  addExpense(){
    if(this.expenseTitle === "" || Number.isNaN(this.expenseAmt)){
      return;
    }
    
    this.expenses.push({title: this.expenseTitle, budget: this.expenseAmt, used: this.expenseAmt});
    this.expenseTitle = "";
    this.expenseAmt = null;
  }
  deleteExpense(e){
    let index = this.expenses.indexOf(e);
    this.expenses.splice(index, 1);
  }
  addIncomeSource(){
    let income = {
      income: null,
      frequency: "",
      hoursWeekly: 0,
      type: ""
    };
    this.incomes.push(income);
  }
  deleteIncome(i: income){
    let index = this.incomes.indexOf(i);
    this.incomes.splice(index, 1);
  }
  calculateMonthlyIncome(){
    let monthlyIncome = 0;
    for(let i = 0; i < this.incomes.length; i++){
      switch(this.incomes[i].frequency){
        case "one-time":
          monthlyIncome += this.incomes[i].income;
          break;
        case "per hour":
          monthlyIncome += this.incomes[i].income * this.incomes[i].hoursWeekly * 4;
          break;
        case "per week":
          monthlyIncome += this.incomes[i].income * 4;
          break;
        case "bi-weekly":
          monthlyIncome += this.incomes[i].income * 2;
          break;
        case "per month":
          monthlyIncome += this.incomes[i].income;
          break;
        case "per year":
          monthlyIncome += this.incomes[i].income / 12;
          break;
      }
    }
    return monthlyIncome;
  }
  calculateNeedExpenses(){
    let expense = 0;
    for(let i = 0; i < this.needsExpense.length; i++){
      expense += this.needsExpense[i].used;
    }
    return expense;
  }
  calculateWantExpenses(){
    let expense = 0;
    for(let i = 0; i < this.wantsExpense.length; i++){
      expense += this.wantsExpense[i].used;
    }
    return expense;
  }
  calculateSavingExpenses(){
    let expense = 0;
    for(let i = 0; i < this.savingExpense.length; i++){
      expense += this.savingExpense[i].used;
    }
    return expense;
  }
  calculateUncategorizedExpenses(){
    let expense = 0;
    for(let i = 0; i < this.expenses.length; i++){
      expense += this.expenses[i].used;
    }
    return expense;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { income } from '../models/income';
import { budgetCategoryList } from '../models/budgetCategoryList';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  expenses: budgetCategoryList[] = [];
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
  needs: any = [];
  needsExpense: budgetCategoryList[] = [];
  wantTitle: string;
  wantAmt: number;
  wants: any = [];
  wantsExpense: budgetCategoryList[] = [];
  savingTitle: string;
  savingAmt: number;
  savings: any = [];
  savingExpense: budgetCategoryList[] = [];
  incomes: income[] = [{income: "", frequency: "", hoursWeekly: 0, type: ""}];

  constructor(private r: Router) { }

  ngOnInit() {
  }
  redirectToHome(){
    if(confirm("Are you sure this information is correct?")){
      this.r.navigate(['/home']);
    }
  }
  addNeedCategory(){
    if(this.needTitle === "" || Number.isNaN(this.needAmt)){
      return;
    }

    let category = {
      title: this.needTitle,
      amount: this.needAmt
    };
    this.needs.push(category);
    this.needsExpense.push({title: this.needTitle, amount: null});
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

    let category = {
      title: this.wantTitle,
      amount: this.wantAmt
    };
    this.wants.push(category);
    this.wantsExpense.push({title: this.wantTitle, amount: null});
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

    let category = {
      title: this.savingTitle,
      amount: this.savingAmt
    };
    this.savings.push(category);
    this.savingExpense.push({title: this.savingTitle, amount: null});
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
    
    let monthlyExpense = {
      title: this.expenseTitle,
      amount: this.expenseAmt
    };
    this.expenses.push(monthlyExpense);
    this.expenseTitle = "";
    this.expenseAmt = null;
  }
  deleteExpense(e: budgetCategoryList){
    let index = this.expenses.indexOf(e);
    this.expenses.splice(index, 1);
  }
  addIncomeSource(){
    let income = {
      income: "",
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
          monthlyIncome += Number.parseFloat(this.incomes[i].income);
          break;
        case "per hour":
          monthlyIncome += (Number.parseFloat(this.incomes[i].income) * this.incomes[i].hoursWeekly * 4);
          break;
        case "per week":
          monthlyIncome += (Number.parseFloat(this.incomes[i].income) * 4);
          break;
        case "bi-weekly":
          monthlyIncome += (Number.parseFloat(this.incomes[i].income) * 2);
          break;
        case "per month":
          monthlyIncome += Number.parseFloat(this.incomes[i].income);
          break;
        case "per year":
          monthlyIncome += (Number.parseFloat(this.incomes[i].income) / 12);
          break;
      }
    }
    return monthlyIncome;
  }
  calculateNeedExpenses(){
    let expense = 0;
    for(let i = 0; i < this.needsExpense.length; i++){
      expense += this.needsExpense[i].amount;
    }
    return expense;
  }
  calculateWantExpenses(){
    let expense = 0;
    for(let i = 0; i < this.wantsExpense.length; i++){
      expense += this.wantsExpense[i].amount;
    }
    return expense;
  }
  calculateSavingExpenses(){
    let expense = 0;
    for(let i = 0; i < this.savingExpense.length; i++){
      expense += this.savingExpense[i].amount;
    }
    return expense;
  }
  calculateUncategorizedExpenses(){
    let expense = 0;
    for(let i = 0; i < this.expenses.length; i++){
      expense += this.expenses[i].amount;
    }
    return expense;
  }
}

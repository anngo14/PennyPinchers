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
  custom: boolean = false;
  firstName: string = "";
  lastName: string = "";
  goal: number;
  needPercentage: number = 50;
  wantPercentage: number = 30;
  savingPercentage: number = 20;
  expenseTitle = "";
  expenseAmt = "";
  needTitle = "";
  needAmt = "";
  needs: any = [];
  wantTitle = "";
  wantAmt = "";
  wants: any = [];
  savingTitle = "";
  savingAmt = "";
  savings: any = [];
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
    if(this.needTitle === "" || this.needAmt === ""){
      return;
    }

    let category = {
      title: this.needTitle,
      amount: this.needAmt
    };
    this.needs.push(category);
    this.needTitle = "";
    this.needAmt = "";
  }
  deleteCategory(c){
    let index = this.needs.indexOf(c);
    this.needs.splice(index, 1);
  }
  addWantCategory(){
    if(this.wantTitle === "" || this.wantAmt === ""){
      return;
    }

    let category = {
      title: this.wantTitle,
      amount: this.wantAmt
    };
    this.wants.push(category);
    this.wantTitle = "";
    this.wantAmt = "";
  }
  deleteWantCategory(c){
    let index = this.wants.indexOf(c);
    this.wants.splice(index, 1);
  }
  addSavingCategory(){
    if(this.savingTitle === "" || this.savingAmt === ""){
      return;
    }

    let category = {
      title: this.savingTitle,
      amount: this.savingAmt
    };
    this.savings.push(category);
    this.savingTitle = "";
    this.savingAmt = "";
  }
  deleteSavingCategory(c){
    let index = this.savings.indexOf(c);
    this.savings.splice(index, 1);
  }
  onToggle(event){
    this.custom = !this.custom;
  }
  addMonthlyExpense(){
    if(this.expenseTitle === "" || this.expenseAmt === ""){
      return;
    }
    
    let monthlyExpense = {
      title: this.expenseTitle,
      amount: this.expenseAmt
    };
    this.expenses.push(monthlyExpense);
    this.expenseTitle = "";
    this.expenseAmt = "";
  }
  deleteExpense(e: expense){
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
}

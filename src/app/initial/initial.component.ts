import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { income } from '../models/income';
import { budgetCategoryList } from '../models/budgetCategoryList';
import { BudgetObj } from '../models/BudgetObj';
import { ExpenseObj } from '../models/ExpenseObj';
import { expenseList } from '../models/expenseList';
import { user } from '../models/user';
import { Goal } from '../models/Goal';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  uncategorized: budgetCategoryList[] = [];
  expenses: expenseList[] = [];
  custom: boolean = false;
  firstName: string = "";
  lastName: string = "";
  phoneNumber;
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
  wants: budgetCategoryList[] = [];
  wantsExpense: expenseList[] = [];
  savingTitle: string;
  savingAmt: number;
  savings: budgetCategoryList[] = [];
  savingExpense: expenseList[] = [];
  incomes: income[] = [{income: null, frequency: "", hoursWeekly: 0, type: ""}];
  date: string;
  

  constructor(private r: Router, private s: UserService, private d: DataService) { }

  ngOnInit() {
    if(sessionStorage.getItem("user") === null && localStorage.getItem("user") === null){
      this.r.navigate(['/denied']);
    }
    if(sessionStorage.getItem("initial") === "false" || localStorage.getItem("initial") === "false"){
      this.r.navigate(['/home']);
    }
    
    var d = new Date();
    this.date = d.getMonth() + 1 + " " + d.getDate() + " " +  d.getFullYear();
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
    this.uncategorized.push({title: this.expenseTitle, amount: this.expenseAmt});
    this.expenseTitle = "";
    this.expenseAmt = null;
  }
  deleteExpense(e){
    let index = this.expenses.indexOf(e);
    this.expenses.splice(index, 1);
    this.uncategorized.splice(index, 1);
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
  submitForm(){
    if(this.checkValid()){
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
            items: this.uncategorized
          }
        ]
      };
      let initialExpense: ExpenseObj = {
        date: this.date,
        items: this.needsExpense.concat(this.wantsExpense).concat(this.savingExpense).concat(this.expenses)
      };
      let archiveBudget: BudgetObj[] = [];
      archiveBudget.push(initialBudget);
      let archiveExpense: ExpenseObj[] = [];
      archiveExpense.push(initialExpense);
      let goals: Goal[] = [];
      if(!Number.isNaN(this.goal)){
        let goal: Goal = {
          name: "Goal", 
          goal: this.goal,
          saved: 0,
          created: this.date,
          completed: null
        };
        goals.push(goal);
      }
      
      let user: user = {
        first: this.firstName,
        last: this.lastName,
        email: sessionStorage.getItem("user"),
        phone: this.phoneNumber,
        date: this.date,
        initial: false,
        currentBudget: initialBudget,
        currentExpense: initialExpense,
        archiveBudget: archiveBudget,
        archiveExpense: archiveExpense,
        goals: goals
      }
      console.log(user);
      if(confirm("Are you sure this information is correct?")){
        sessionStorage.setItem("initial", "false");
        if(localStorage.getItem("initial") != null){
          localStorage.setItem("initial", "false");
        }
        this.s.saveUser(user).subscribe();
        this.r.navigate(['/home']);
      }
    } else{
      alert("There are Empty Required Fields!");
    }
  }
  checkValid(): boolean{
    if(this.firstName.trim() === ""){
      return false;
    } 
    if(this.lastName.trim() === ""){
      return false;
    } 
    for(let i = 0; i < this.incomes.length; i++){
      if(Number.isNaN(this.incomes[i].income)){
        return false;
      }
      if(this.incomes[i].type === "" || this.incomes[i].type === undefined || this.incomes[i].type === null){
        return false;
      }
      if(this.incomes[i].frequency === "" || this.incomes[i].frequency === undefined || this.incomes[i].frequency === null){
        return false;
      } else if(this.incomes[i].frequency === "per hour"){
        if(Number.isNaN(this.incomes[i].hoursWeekly)){
          return false;
        }
      }
    }
    if(this.needPercentage + this.wantPercentage + this.savingPercentage != 100){
      return false;
    }
    return true;
  }
}

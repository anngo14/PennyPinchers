import { Component, OnInit, Inject } from '@angular/core';
import { income } from '../models/income';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  incomes: income[];
  needsPercent: number;
  wantsPercent: number;
  savingPercent: number;

  constructor(public editDialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    let budgetObj = this.data.budget;
    this.incomes = budgetObj.incomes;
    this.needsPercent = budgetObj.categories[0].percentage;
    this.wantsPercent = budgetObj.categories[1].percentage;
    this.savingPercent = budgetObj.categories[2].percentage;
  }

  addIncomeSource(){
    let blank: income = {
      income: null,
      frequency: "",
      hoursWeekly: null,
      type: ""
    };

    this.incomes.push(blank);
  }
  deleteIncome(i: income){
    let index = this.incomes.indexOf(i);
    this.incomes.splice(index, 1);
  }
  saveEdit(){
    this.data.budget.categories[0].percentage = this.needsPercent;
    this.data.budget.categories[1].percentage = this.wantsPercent;
    this.data.budget.categories[2].percentage = this.savingPercent;
    this.data.budget.incomes = this.incomes;
    this.data.budget.monthlyIncome = this.calculateMonthlyIncome();
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
}

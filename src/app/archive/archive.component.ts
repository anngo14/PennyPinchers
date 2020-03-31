import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  years: any = [];
  pastYears: any = [];
  selectedYear: any;
  current: any;

  //Budget List Item
  budgetProfit: number = 0;
  budgetMonth: string = "MAY";
  budgetAmount: number = 3242.43;
  budgetOut: number = 2398.14;
  budgetIncome: number = 2020.68;
  budgetCategories: any = [];
  //End Budget List Item

  //Spending List Item
  spendingProfit: number = 0;
  spendingMonth: string = "OCT";
  spendingAmount: number = 4230.12;
  spendingOut: number = 2340.61;
  spendingIncome: number = 4129.25;
  spendingCategories: any = [];
  //End Spending List Item

  //Goal List Item
  goalProfit: number = 0;
  goalIncome: number = 4129.25;
  goalOut: number = 4129.25;
  goalMonth: string = "FEB";
  goalPercentage: number = .437;
  goal: number = 5000;
  //End Goal List Item
  constructor() { }

  ngOnInit() {
    var d = new Date();
    for(let i = 0; i < 5; i++){
      this.years.push(d.getFullYear() - i);
    }

    this.budgetProfit = this.budgetIncome - this.budgetOut;
    this.spendingProfit = this.spendingIncome - this.spendingOut;
    this.goalProfit = this.goalIncome - this.goalOut;
    this.current = d.getFullYear();
    this.pastYears = this.years;
    this.selectedYear = this.current;
  }
  checkSign(n: number){
    if(n > 0){
      return 1;
    } else if(n < 0){
      return -1;
    } else {
      return 0;
    }
  }

}

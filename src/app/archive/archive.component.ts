import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BudgetObj } from '../models/BudgetObj';
import { ExpenseObj } from '../models/ExpenseObj';
import { budgetCategoryList } from '../models/budgetCategoryList';
import { pieslice } from '../models/pieslice';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  @ViewChild('budgetPieChart', {static: true})
  canvas: ElementRef<HTMLCanvasElement>

  private ctx: CanvasRenderingContext2D;

  BudgetObject: BudgetObj = {
    incomes: [
      {
        income: 70000,
        frequency: "per year",
        hoursWeekly: null,
        type: "Full-Time"
      }
    ],
    monthlyIncome: 70000 / 12,
    date: "May 2020",
    categories: [
      {
        type: 0,
        percentage: 0.5,
        items: [
          {title: "Rent", amount: 1200}, 
          {title: "Utilities", amount: 150}
        ]
      },
      {
        type: 1,
        percentage: 0.3,
        items: [
          {title: "Shopping", amount: 200},
          {title: "Movies", amount: 35}
        ]
      },
      {
        type: 2,
        percentage: 0.2,
        items: [
          {title: "Goal", amount: 200}
        ]
      },
      {
        type: 3,
        percentage: null,
        items: []
      }
    ]
  };
  ExpenseObject: ExpenseObj = {
    date: "May 2020",
    items: [
      {title: "Rent", budget: 1200, used: 1000},
      {title: 'Utilities', budget: 150, used: 53.23},
      {title: 'Shopping', budget: 200, used: 342.34},
      {title: 'Entertainment', budget: 400, used: 400},
      {title: 'Groceries', budget: 300, used: 198.23}
    ]
  };

  colors: string[] = ["#F9E79F", "#2874A6", "#D5F5E3"]; //colors for pie chart
  moreColors: string[] = [
    "#C29FF9", "#79F581", "#A1B0EE", "#EEA1EE", "#FFBA4B", "#92FFEB",
    "#4C9F25", "#9F3B25", "#9FCCC5", "#FFC036", "#F3B1D5", "#AAA8B6",
    "#D5E0F5", "#FEC843", "#B9A5FF", "#FF7878", "#D5F5F3", "#F9FFAA",
    "black"
  ];
  years: any = [];
  pastYears: any = [];
  selectedYear: any;
  current: any;
  needsUnallocated: number;
  wantsUnallocated: number;
  savingUnallocated: number;

  overviewSlices: pieslice[];

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
    this.ctx = this.canvas.nativeElement.getContext("2d");

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
    this.needsUnallocated = this.getUnallocated(this.BudgetObject.categories[0].items, this.BudgetObject.categories[0].percentage);
    this.wantsUnallocated = this.getUnallocated(this.BudgetObject.categories[1].items, this.BudgetObject.categories[1].percentage);
    this.savingUnallocated = this.getUnallocated(this.BudgetObject.categories[2].items, this.BudgetObject.categories[2].percentage);
    this.overviewSlices = this.getHighPie();
    this.convertToRadians(this.overviewSlices);

    this.drawPieChart(this.ctx, this.canvas, 250, this.overviewSlices, this.colors);
  }

  getUnallocated(a: budgetCategoryList[], percent): number{
    let budget: number = this.BudgetObject.monthlyIncome * percent;
    for(let i = 0; i < a.length; i++){
      budget -= a[i].amount;
    }

    return budget;
  }
  drawDetailedPie(type: number){
    let slices = [];

    let startingAngle;
    let totalPieSlice;
    let endingAngle;
    let colors;
    switch(type){
      case 0:
        startingAngle = this.overviewSlices[type].start * 180 / Math.PI;
        let needPercent = this.BudgetObject.categories[type].percentage;
        totalPieSlice = 360 * needPercent;
        let needTotal = this.BudgetObject.monthlyIncome * needPercent;
        endingAngle = 0;
        for(let i = 0; i < this.BudgetObject.categories[type].items.length; i++){
          let percentage = this.BudgetObject.categories[type].items[i].amount / needTotal;
          endingAngle = startingAngle + (percentage * totalPieSlice);
          slices.push({start: startingAngle, end: endingAngle});
          startingAngle = endingAngle;
        }
        slices.push({start: endingAngle, end: this.overviewSlices[type].end * 180 / Math.PI})
        this.convertToRadians(slices);
        colors = this.moreColors.slice(0, 7);
        colors[slices.length - 1] = "#F9E79F";
        this.drawPieChart(this.ctx, this.canvas, 250, slices, colors);
        break;
      case 1:
        startingAngle = this.overviewSlices[type].start * 180 / Math.PI; 
        let wantPercent = this.BudgetObject.categories[type].percentage;
        totalPieSlice = 360 * wantPercent;
        let wantTotal = this.BudgetObject.monthlyIncome * wantPercent;
        endingAngle = 0;
        for(let i = 0; i < this.BudgetObject.categories[type].items.length; i++){
          let percentage = this.BudgetObject.categories[type].items[i].amount / wantTotal;
          endingAngle = startingAngle + (percentage * totalPieSlice);
          slices.push({start: startingAngle, end: endingAngle});
          startingAngle = endingAngle;
        }
        slices.push({start: endingAngle, end: this.overviewSlices[type].end * 180 / Math.PI})
        this.convertToRadians(slices);
        colors = this.moreColors.slice(6, 13);
        colors[slices.length - 1] = "#2874A6";
        this.drawPieChart(this.ctx, this.canvas, 250, slices, colors);
        break;
      case 2:
        startingAngle = this.overviewSlices[type].start * 180 / Math.PI; 
        let savingPercent = this.BudgetObject.categories[type].percentage;
        totalPieSlice = 360 * savingPercent;
        let savingTotal = this.BudgetObject.monthlyIncome * savingPercent;
        endingAngle = 0;
        for(let i = 0; i < this.BudgetObject.categories[type].items.length; i++){
          let percentage = this.BudgetObject.categories[type].items[i].amount / savingTotal;
          endingAngle = startingAngle + (percentage * totalPieSlice);
          slices.push({start: startingAngle, end: endingAngle});
          startingAngle = endingAngle;
        }
        slices.push({start: endingAngle, end: this.overviewSlices[type].end * 180 / Math.PI})
        this.convertToRadians(slices);
        colors = this.moreColors.slice(12, 19);
        colors[slices.length - 1] = "#D5F5E3";
        this.drawPieChart(this.ctx, this.canvas, 250, slices, colors);
        break;
    }
  }
  drawOriginalPie(){
    this.drawPieChart(this.ctx, this.canvas, 250, this.overviewSlices, this.colors);
  }
  convertToRadians(pie: pieslice[]){
    for(let i = 0; i < pie.length; i++){
      pie[i].start = pie[i].start * Math.PI / 180;
      pie[i].end = pie[i].end * Math.PI / 180;
    }
  }
  drawPieChart(c, canvas, radius, slices, colors){
    let xorigin = canvas.nativeElement.width / 2
    let yorigin = canvas.nativeElement.height / 2;
    
    //Draws static pie chart
    for(let i = 0; i < slices.length; i++){
      c.beginPath();
      c.moveTo(xorigin, yorigin);
      c.arc(xorigin, yorigin, radius, slices[i].start, slices[i].end);
      c.lineTo(xorigin, yorigin);
      c.fillStyle = colors[i];
      c.fill();
    }
    //Inner White Circle
    c.beginPath();
    c.arc(xorigin, yorigin, radius / 3, 0, 2 * Math.PI);
    c.fillStyle = 'white';
    c.fill();
  }
  getHighPie(): pieslice[]{
    let slices = [];
    let startingAngle = 90;
    for(let i = 0; i < this.BudgetObject.categories.length - 1; i++){
      let endingAngle = startingAngle + (this.BudgetObject.categories[i].percentage * 360);
      slices.push({start: startingAngle, end: endingAngle});
      startingAngle = endingAngle;
    }

    return slices;
  }
}

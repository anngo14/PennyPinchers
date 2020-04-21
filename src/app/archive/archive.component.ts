import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BudgetObj } from '../models/BudgetObj';
import { ExpenseObj } from '../models/ExpenseObj';
import { budgetCategoryList } from '../models/budgetCategoryList';
import { pieslice } from '../models/pieslice';
import { Goal } from '../models/Goal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  @ViewChild('budgetPieChart', {static: true})
  canvas: ElementRef<HTMLCanvasElement>
  @ViewChild('expenseBarChart', {static: true})
  canvas2: ElementRef<HTMLCanvasElement>

  private ctx: CanvasRenderingContext2D;
  private ctx2: CanvasRenderingContext2D;

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
  goals: Goal[] = [
    {
      name: "Goal 1",
      goal: 5000,
      saved: 1230.56,
      created: "4 2 2020",
      completed: null
    },
    {
      name: "Goal 2",
      goal: 1000,
      saved: 25,
      created: "2 26 2019",
      completed: null
    },
    {
      name: "Goal 3",
      goal: 50,
      saved: 50,
      created: "3 14 2020",
      completed: "3 15 2020"
    },
    {
      name: "Trip to Costa Rica",
      goal: 3500,
      saved: 1020.42,
      created: "4 6 2020",
      completed: null
    },
    {
      name: "New PC",
      goal: 1000,
      saved: 1000,
      created: "2 4 2020",
      completed: "4 18 2020"
    }
  ];

  months: string[] =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
  constructor(private r: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("user") === null && localStorage.getItem("user") === null){
      this.r.navigate(['/denied']);
    }
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.ctx2 = this.canvas2.nativeElement.getContext("2d");

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
    this.drawBarChart(this.ctx2, this.canvas2);
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
  drawBarChart(ctx, canvas){
    ctx.clearRect(0, 0, canvas.nativeElement.width, canvas.nativeElement.height);
    ctx.beginPath();
    ctx.moveTo(150, 30);
    ctx.lineTo(150, 700);
    ctx.lineTo(1300, 700);
    ctx.stroke();
    this.drawXAxis(ctx, this.ExpenseObject.items);
    this.drawYAxis(ctx, this.ExpenseObject.items);
    this.drawBarChartData(ctx, this.ExpenseObject.items);
  }
  drawXAxis(ctx, barChartData){
    ctx.font = '16pt Helvetica';
    ctx.textAlign = 'center';
    let X = 265;
    let Yorigin = 700;
    let Ybottom = 710;
    let Ytop = 30;
    let interval = 115;

    let max = this.getMax(barChartData);
    let xinterval = max / 10;
    let xlabel = xinterval;

    for(let i = 0; i < 10; i++){
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(X, Ybottom);
      ctx.lineTo(X, Yorigin);
      ctx.stroke();

      //x-axis labels
      ctx.fillText(xlabel, X, Ybottom + 20);
      xlabel += xinterval;
      //background lines
      ctx.strokeStyle = '#DDDDDD';
      ctx.beginPath();
      ctx.moveTo(X, Yorigin);
      ctx.lineTo(X, Ytop);
      ctx.stroke();
      X += interval;
    }
    ctx.strokeStyle = 'black';
  }
  drawYAxis(ctx, barChartData){
    let interval = barChartData.length;

    let width = 45;
    //change width based on interval (max 20)
    if(interval <= 15 && interval > 10){
      width = 35;
    } else if(interval > 15){
      width = 30;
    }

    let Xorigin = 150;
    let Xbottom = 140;
    let Y = 700;
    let Ymax = 50;
    let gap = (Y - Ymax) / interval;
  
    for(let i = 0; i < interval; i++){
      Y -= gap;
      ctx.beginPath();
      ctx.moveTo(Xorigin, Y);
      ctx.lineTo(Xbottom, Y);
      ctx.stroke();
      //y-axis labels
      ctx.textAlign = 'right';
      ctx.fillStyle = 'black';
      ctx.font = '18pt Helvetica';
      let label: string = barChartData[i].title;
      if(label.length > 10){
        label = barChartData[i].title.substring(0, 9);
        label += "...";
      }
      ctx.fillText(label, Xbottom - 10, Y + 5);
    } 
  }
  drawBarChartData(ctx, barChartData){
    let interval = barChartData.length;

    let width = 40;
    //change width based on interval (max 20)
    if(interval <= 15 && interval > 10){
      width = 35;
    } else if(interval > 15){
      width = 30;
    }

    let Xorigin = 150;
    let Y = 700;
    let Ymax = 50;
    let gap = (Y - Ymax) / interval;
    let Xmax = this.getMax(barChartData);
 
    for(let i = 0; i < barChartData.length; i++){
      Y -= gap;
      let dataBudgetLength: number = barChartData[i].budget * 1150.00 / Xmax;
      let dataUsedLength: number = barChartData[i].used * 1150.00 / Xmax;

      //Static Budget Bar
      ctx.fillStyle = "rgba(93, 173, 226, 1)";
      ctx.fillRect(Xorigin + 0.1, Y - (width / 2), dataBudgetLength, width);

      ctx.fillStyle = "rgba(231, 76, 60, 0.5)";
      ctx.fillRect(Xorigin + 0.1, Y - (width / 2), dataUsedLength, width);

    }
  }
  getMax(barChartData): number{
    let max: number = 0;
    for(let i = 0; i < barChartData.length; i++){
      if(barChartData[i].budget > max){
        max = barChartData[i].budget;
      }
      if(barChartData[i].used > max){
        max = barChartData[i].used;
      }
    }

    max = Math.ceil(max);
    while(max % 5 != 0){
      max++;
    }

    return Math.ceil(max);
  }
  parseDate(d: string){
    let output: string = "";
    let elements = d.split(" ");
    output += this.months[elements[0]] + " " + elements[1] + ", " + elements[2];
    return output;
  }
}

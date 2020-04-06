import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { pieslice } from '../models/pieslice';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BudgetObj } from '../models/BudgetObj';
import { ExpenseObj } from '../models/ExpenseObj';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { NeedsDialogComponent } from '../needs-dialog/needs-dialog.component';
import { WantsDialogComponent } from '../wants-dialog/wants-dialog.component';
import { SavingDialogComponent } from '../saving-dialog/saving-dialog.component';
import { UnategorizedDialogComponent } from '../unategorized-dialog/unategorized-dialog.component';
import { budgetCategoryList } from '../models/budgetCategoryList';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('overviewPieChart', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('overviewBarChart', {static: true})
  canvas2: ElementRef<HTMLCanvasElement>;

  @ViewChild('budgetPieChart', {static: true})
  canvas3: ElementRef<HTMLCanvasElement>;

  @ViewChild('expenseBarChart', {static: true})
  canvas4: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  private ctx2: CanvasRenderingContext2D;
  private ctx3: CanvasRenderingContext2D;
  private ctx4: CanvasRenderingContext2D;

  BudgetObject: BudgetObj = {
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
      {title: "Rent", budget: 1500, used: 1000},
      {title: 'Utilities', budget: 150, used: 53.23},
      {title: 'Shopping', budget: 200, used: 342.34},
      {title: 'Entertainment', budget: 400, used: 400},
      {title: 'Groceries', budget: 300, used: 198.23}
    ]
  }
  
  overviewSlices: pieslice[];
  detailedSlices: pieslice[];

  colors: string[] = ["#F9E79F", "#2874A6", "#D5F5E3"]; //colors for pie chart
  months: string[] =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  pastMonths;
  selectedMonth;
  Month: string;
  Year: number;
  lastCheck: string;

  needsUnallocated: number = 0;
  wantsUnallocated: number = 0;
  savingUnallocated: number = 0;
  budgetAllocated: number = 0;
  profit: number = 0;

  positiveTransactions: number[] = [123.12, 1203.67, 421.02, 300.23];
  negativeTransactions: number[] = [-1543.12, -30.21, -53.61, -253.89];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.ctx2 = this.canvas2.nativeElement.getContext("2d");
    this.ctx3 = this.canvas3.nativeElement.getContext("2d");
    this.ctx4 = this.canvas4.nativeElement.getContext("2d");
    var d = new Date();
    
    this.Month = this.months[d.getMonth()];
    this.Year = d.getFullYear()
    this.pastMonths = this.months.slice(0, d.getMonth());
    this.pastMonths = this.pastMonths.reverse();
    this.selectedMonth = this.Month;
    this.lastCheck = this.Month + " " + d.getDate() + ", " + this.Year;
    
    this.overviewSlices = this.getHighPie();

    this.convertToRadians(this.overviewSlices);

    this.drawPieChart(this.ctx, this.canvas, 290, this.overviewSlices, true);
    this.drawBarChart(this.ctx2, this.canvas2);

    this.needsUnallocated = this.getUnallocated(this.BudgetObject.categories[0].items, this.BudgetObject.categories[0].percentage);
    this.wantsUnallocated = this.getUnallocated(this.BudgetObject.categories[1].items, this.BudgetObject.categories[1].percentage);
    this.savingUnallocated = this.getUnallocated(this.BudgetObject.categories[2].items, this.BudgetObject.categories[2].percentage);
    this.budgetAllocated = this.getAllocated();
  }
  drawPieChart(c, canvas, radius, slices, animate){
    let xorigin = canvas.nativeElement.width / 2
    let yorigin = canvas.nativeElement.height / 2;
    
    if(animate){
      setTimeout(() => {
        this.animatePieChart(c, canvas, radius, slices);
      }, 1000);
    } else {
      //Draws static pie chart
      for(let i = 0; i < slices.length; i++){
        c.beginPath();
        c.moveTo(xorigin, yorigin);
        c.arc(xorigin, yorigin, radius, slices[i].start, slices[i].end);
        c.lineTo(xorigin, yorigin);
        c.fillStyle = this.colors[i];
        c.fill();
      }
      //Inner White Circle
      c.beginPath();
      c.arc(xorigin, yorigin, radius / 3, 0, 2 * Math.PI);
      c.fillStyle = 'white';
      c.fill();
    }
  }
  animatePieChart(c, canvas, radius, slices){
    let xorigin = canvas.nativeElement.width / 2;
    let yorigin = canvas.nativeElement.height / 2;
    let j = 1;
    setInterval(() => {
      //clear canvas 
      c.clearRect(0, 0, canvas.nativeElement.width, canvas.nativeElement.height);
      if(j >= 360){
        j = 0;
      }  
      let step = j * Math.PI / 180;
      //draw new pie slice with a new step
      for(let i = 0; i < slices.length; i++){
        c.beginPath();
        c.moveTo(xorigin, yorigin);
        c.arc(xorigin, yorigin, radius, slices[i].start + step, slices[i].end + step);
        c.fillStyle = this.colors[i];
        c.fill();
      }
      //draw white inner circle
      c.beginPath();
      c.arc(xorigin, yorigin, radius / 3, 0, 2 * Math.PI);
      c.fillStyle = 'white';
      c.fill();
  
      j++;
      }, 20);
  }
  drawBarChart(ctx, canvas){
    ctx.clearRect(0, 0, canvas.nativeElement.width, canvas.nativeElement.height);
    ctx.beginPath();
    ctx.moveTo(150, 30);
    ctx.lineTo(150, 700);
    ctx.lineTo(1050, 700);
    ctx.stroke();
    this.drawXAxis(ctx, this.ExpenseObject.items);
    this.drawYAxis(ctx, this.ExpenseObject.items);
    this.drawBarChartData(ctx, this.ExpenseObject.items);
  }
  drawXAxis(ctx, barChartData){
    ctx.font = '14pt Helvetica';
    ctx.textAlign = 'center';
    let X = 240;
    let Yorigin = 700;
    let Ybottom = 710;
    let Ytop = 30;
    let interval = 90;

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
      let dataBudgetLength: number = barChartData[i].budget * 900.00 / Xmax;

      //Static Budget Bar
      ctx.fillStyle = "rgba(93, 173, 226, 1)";
      ctx.fillRect(Xorigin + 0.1, Y - (width / 2), dataBudgetLength, width);
    }

    setTimeout(() => {
      for(let i = 0; i < barChartData.length; i++){
        this.animateBarChartData(ctx, width, barChartData, i);
      }
    }, 1000);
  }
  animateBarChartData(ctx, width, barChartData, index){
    let interval = barChartData.length;
    let Xorigin = 150;
    let Y = 700;
    let Ymax = 50;
    let gap = (Y - Ymax) / interval;
    let Xmax = this.getMax(barChartData);
    let step = 1;
    Y-= gap * (index + 1);
    let maxStep = barChartData[index].used * 900 / Xmax;
    ctx.fillStyle = "rgba(231, 76, 60, 0.5)";

    let animationInterval = setInterval(() => {
      if(step >= maxStep){
        return;
      }

      ctx.fillRect(Xorigin + step, Y - (width / 2), 1, width);
      step += 1;
    }, 1);
    setTimeout(() => {
      clearInterval(animationInterval);
    }, 30000);
  }
  refreshExpenseBarChart(){
    this.drawBarChart(this.ctx4, this.canvas4);
  }
  refreshOverviewBarChart(){
    this.drawBarChart(this.ctx2, this.canvas2);
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
  convertToRadians(pie: pieslice[]){
    for(let i = 0; i < pie.length; i++){
      pie[i].start = pie[i].start * Math.PI / 180;
      pie[i].end = pie[i].end * Math.PI / 180;
    }
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    switch(tabChangeEvent.index){
      case 0:
        this.drawBarChart(this.ctx2, this.canvas2);
        break;
      case 1: 
        this.drawPieChart(this.ctx3, this.canvas3, 320, this.overviewSlices, false);
        break;
      case 2:
        this.drawBarChart(this.ctx4, this.canvas4);
        break;
    }
  }
  getUnallocated(a: budgetCategoryList[], percent): number{
    let budget: number = this.BudgetObject.monthlyIncome * percent;
    for(let i = 0; i < a.length; i++){
      budget -= a[i].amount;
    }

    return budget;
  }
  getAllocated(): number{
    let sum: number = 0;
    for(let i = 0; i < this.BudgetObject.categories.length; i++){
      for(let j = 0; j < this.BudgetObject.categories[i].items.length; j++){
        sum += this.BudgetObject.categories[i].items[j].amount;
        console.log(sum);
      }
    }

    this.profit = this.BudgetObject.monthlyIncome - sum;

    return sum;
  }
  getHighPie(): pieslice[]{
    let slices = [];
    let startingAngle = 90;
    for(let i = 0; i < this.BudgetObject.categories.length; i++){
      let endingAngle = startingAngle + (this.BudgetObject.categories[i].percentage * 360);
      slices.push({start: startingAngle, end: endingAngle});
      startingAngle = endingAngle;
    }

    return slices;
  }
  openExpenseList(){
    const expenseDialogRef = this.dialog.open(ExpenseDialogComponent, {
      data: { expenseList: this.ExpenseObject.items}
    });
    expenseDialogRef.afterClosed().subscribe(result => {
      let uncategorized = {
        title: result[result.length - 1].title,
        amount: result[result.length - 1].budget
      };

      this.BudgetObject.categories[3].items.push(uncategorized);
      this.budgetAllocated = this.getAllocated();
    })
  }
  openNeedsDialog(){
    const needsDialogRef = this.dialog.open(NeedsDialogComponent, {
      data: { needs: this.BudgetObject.categories[0].items}
    });
    needsDialogRef.afterClosed().subscribe(result => {
      this.budgetAllocated = this.getAllocated();
      console.log(this.budgetAllocated);
      console.log(typeof(this.budgetAllocated));
      this.needsUnallocated = this.getUnallocated(this.BudgetObject.categories[0].items, this.BudgetObject.categories[0].percentage);
    })
  }
  openWantsDialog(){
    const dialogRef = this.dialog.open(WantsDialogComponent);
  }
  openSavingDialog(){
    const dialogRef = this.dialog.open(SavingDialogComponent);
  }
  openUncategorizedDialog(){
    const dialogRef = this.dialog.open(UnategorizedDialogComponent);
  }
}

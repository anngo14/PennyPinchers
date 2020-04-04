import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { expense } from '../models/expense';
import { budget } from '../models/budget';
import { pieslice } from '../models/pieslice';
import { barchart } from '../models/barchart';

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

  barchartData: barchart[] = [
    {title: "Rent", budget: 1500, used: 1000},
    {title: 'Utilities', budget: 150, used: 53.23},
    {title: 'Shopping', budget: 200, used: 342.34},
    {title: 'Entertainment', budget: 400, used: 400}
  ];
  slices: pieslice[] = [
    {start: Math.PI / 2, end: (Math.PI / 2) + Math.PI}, //50% 
    {start: 3 * Math.PI / 2, end: (3 * Math.PI / 2) + (72 * Math.PI / 180)}, //20%
    {start: (3 * Math.PI / 2) + (72 * Math.PI / 180) , end: Math.PI / 2}]; //30%
  colors: string[] = ["#F9E79F", "#2874A6", "#D5F5E3"];
  months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  pastMonths;
  selectedMonth;
  Month:any = "Month";
  Year:any = "Year";
  lastCheck: any;
  budgetAmount: number = 4123.32;
  budgetAllocated: number = 4020.00;
  needPercentage: number = 50;
  wantPercentage: number = 30;
  savingPercentage: number = 20;
  needCategories: expense[] = [{title: "Rent", amount: "1200"}, {title: 'Utilities', amount: '45'}];
  wantCategories: expense[] = [{title: "Shopping", amount: '250'}, {title: 'Movies', amount: '35'}];
  savingCategories: expense[] = [{title: 'Goal', amount: '400'}];
  allCategories: budget[] = [{title: "Rent", budget: 1500, used: 1200}, 
    {title: 'Utilities', budget: 50, used: 45}, 
    {title: 'Shopping', budget: 400, used: 250}, 
    {title: 'Movies', budget: 35, used: 35},
    {title: 'test', budget: 1, used: 1}, 
    {title:'tile2', budget:2, used:2}, 
    {title: 'test3', budget:3, used:3}, 
    {title:'test4', budget:4, used:4}, 
    {title:'test5', budget:5, used:5}];
  positiveTransactions: number[] = [123.12, 1203.67, 421.02, 300.23];
  negativeTransactions: number[] = [-1543.12, -30.21, -53.61, -253.89];

  constructor() { }

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
    
    this.drawPieChart(this.ctx, this.canvas, 290, this.slices, true);
    this.drawPieChart(this.ctx3, this.canvas3, 320, this.slices, false);
    this.drawBarChart(this.ctx2);
    this.drawBarChart(this.ctx4);
  }
  drawPieChart(c, canvas, radius, slices, animate){
    /* Information needed
    budget percentages, if custom otherwise 50-30-20
    categories and budget in each budget slice ([rent, 3300.12],...)
    colors
    End Information needed
    Calculations needed
    convert degress to radians to draw pie slices 
    End Calculations needed
    Still Need to figure out labels on pie chart */

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
  animatePieChart(c, canvas, radius, slice){
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
      for(let i = 0; i < this.slices.length; i++){
        c.beginPath();
        c.moveTo(xorigin, yorigin);
        c.arc(xorigin, yorigin, radius, slice[i].start + step, slice[i].end + step);
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
  drawBarChart(ctx){
    /* Information needed 
    min and max budget amounts to create the x-axis intervals
    category names for y-axis labels
    budget amount and amount used ["Category 1", 2000, 1351.65] for mat expansion panel
    colors for the bar chart 
    End Information needed 
    Calculations needed
    calculate the x-axis intervals so that there are always 10 intervals between
    value to stop the bars at 
    End Calculations needed*/
    
    ctx.beginPath();
    ctx.moveTo(150, 30);
    ctx.lineTo(150, 700);
    ctx.lineTo(1050, 700);
    ctx.stroke();
    this.drawXAxis(ctx, this.barchartData);
    this.drawYAxis(ctx, this.barchartData);
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
      ctx.strokeStyle = 'black';
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
    let Xmax = this.getMax(barChartData);
  
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

      let dataBudgetLength: number = barChartData[i].budget * 900.00 / Xmax;
      let dataUsedLength: number = barChartData[i].used * 900 / Xmax;

      if(dataBudgetLength > dataUsedLength){
        //1st Bar
        ctx.fillStyle = "rgba(93, 173, 226, 1)";
        ctx.fillRect(Xorigin + 1, Y - (width / 2), dataBudgetLength, width);
      
        //2nd Bar
        ctx.fillStyle = "rgba(231, 76, 60, 1)";
        ctx.fillRect(Xorigin + 1, Y - (width / 2), dataUsedLength, width);

      } else if(dataBudgetLength < dataUsedLength){
        //2nd Bar
        ctx.fillStyle = "rgba(231, 76, 60, 1)";
        ctx.fillRect(Xorigin + 1, Y - (width / 2), dataUsedLength, width);

        //1st Bar
        ctx.fillStyle = "rgba(93, 173, 226, 1)";
        ctx.fillRect(Xorigin + 1, Y - (width / 2), dataBudgetLength, width);
      } else{
        //1st Bar
        ctx.fillStyle = "#BB8FCE";
        ctx.fillRect(Xorigin + 1, Y - (width / 2), dataBudgetLength, width);
      }

      
      
      /*
      ctx.fillStyle = "#85CBE9";
      let i = 1;
      setInterval(() => {
        if(i === Y){
          i = 1;
        }
        ctx.fillRect(Xorigin + 0.1 + i, Y - (width / 2), 1, width);
        i++;
      }, 10);
      */

    } 
  }
  getMax(barChartData){
    let max = 0;
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
}

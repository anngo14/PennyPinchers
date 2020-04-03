import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  pastMonths;
  selectedMonth;
  Month:any = "Month";
  Year:any = "Year";
  lastCheck: any;
  budgetAmount: number = 41230.32;
  budgetAllocated: number = 40203.00;
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
    
    this.drawPieChart(this.ctx, this.canvas, 290);
    this.drawPieChart(this.ctx3, this.canvas3, 320);
    this.drawBarChart(this.ctx2);
    this.drawBarChart(this.ctx4);
  }
  drawPieChart(c, canvas, radius){
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
    //Outer Circle
    /*
    c.beginPath();
    c.arc(xorigin, yorigin, radius, 0, 2 * Math.PI);
    c.stroke();*/
    
    //pie slice outline 50%
    c.strokeStyle = 'black';
    c.beginPath();
    c.moveTo(xorigin, yorigin);
    c.arc(xorigin, yorigin, radius, 0, Math.PI);
    c.lineTo(xorigin, yorigin);
    //pie slice color fill
    c.fillStyle = '#F9E79F';
    c.fill();

    //pie slice outline 30%
    c.strokeStyle = 'black';
    c.beginPath();
    c.moveTo(xorigin, yorigin);
    c.arc(xorigin, yorigin, radius, Math.PI, Math.PI + (108 * Math.PI / 180));
    c.lineTo(xorigin, yorigin);
    //pie slice color fill
    c.fillStyle = '#2874A6';
    c.fill();

    //pie slice outline 20%
    c.strokeStyle = 'black';
    c.beginPath();
    c.moveTo(xorigin, yorigin);
    c.arc(xorigin, yorigin, radius, Math.PI + (108 * Math.PI / 180), 0 );
    c.lineTo(xorigin, yorigin);
    //pie slice color fill
    c.fillStyle = '#D5F5E3';
    c.fill();

    /*
    //Label Circle
    c.beginPath();
    c.strokeStyle = '#DDDDDD';
    c.arc(xorigin, yorigin, radius - 10, 0, 2 * Math.PI);
    c.stroke(); 
    */

    //Inner Circle
    c.beginPath();
    c.arc(xorigin, yorigin, radius / 3, 0, 2 * Math.PI);
    c.fillStyle = 'white';
    c.fill();
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
    ctx.moveTo(100, 30);
    ctx.lineTo(100, 500);
    ctx.lineTo(900, 500);
    ctx.stroke();
    this.drawXAxis(ctx);
  }
  drawXAxis(ctx){
    ctx.font = '10pt Helvetica';
    ctx.textAlign = 'center';
    let X = 180;
    let Yorigin = 500;
    let Ybottom = 510;
    let Ytop = 30;
    let interval = 80;

    for(let i = 0; i < 10; i++){
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(X, Ybottom);
      ctx.lineTo(X, Yorigin);
      ctx.stroke();

      //x-axis labels
      ctx.fillText("Label", X, Ybottom + 20);
      //background lines
      ctx.strokeStyle = '#DDDDDD';
      ctx.beginPath();
      ctx.moveTo(X, Yorigin);
      ctx.lineTo(X, Ytop);
      ctx.stroke();
      X += interval;
    }
    ctx.strokeStyle = 'black';

    this.drawYAxis(5, ctx);
  }
  drawYAxis(interval: number, ctx){
    let width = 40;
    //change width based on interval (max 20)
    if(interval <= 15 && interval > 10){
      width = 25;
    } else if(interval > 15){
      width = 20;
    }

    let Xorigin = 100;
    let Xbottom = 90;
    let Y = 490;
    let Ymax = 50;
    let gap = (Y - Ymax) / interval;
    Y = 500;
    for(let i = 0; i < interval; i++){
      Y -= gap;
      ctx.beginPath();
      ctx.moveTo(Xorigin, Y);
      ctx.lineTo(Xbottom, Y);
      ctx.stroke();
      //y-axis labels
      ctx.textAlign = 'right';
      ctx.fillStyle = 'black';
      ctx.font = '12pt Helvetica';
      ctx.fillText("Label", Xbottom - 10, Y + 5);

      //1st Bar
      ctx.fillStyle = "#85CBE9";
      ctx.fillRect(Xorigin + 1, Y - (width / 2), Y, width);
      //2nd Bar
      ctx.fillStyle = "#ABE985";
      ctx.fillRect(Xorigin + 1, Y - (width / 2), (Math.random() * 2) * Y, width);
    }
  }
}

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

  private ctx: CanvasRenderingContext2D;
  private ctx2: CanvasRenderingContext2D;

  months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  pastMonths;
  selectedMonth;
  Month:any = "Month";
  Year:any = "Year";
  lastCheck: any;
  positiveTransactions: number[] = [123.12, 1203.67, 421.02, 300.23];
  negativeTransactions: number[] = [-1543.12, -30.21, -53.61, -253.89];
  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.ctx2 = this.canvas2.nativeElement.getContext("2d");
    var d = new Date();
    
    this.Month = this.months[d.getMonth()];
    this.Year = d.getFullYear()
    this.pastMonths = this.months.slice(0, d.getMonth());
    this.pastMonths = this.pastMonths.reverse();
    this.selectedMonth = this.Month;
    this.lastCheck = this.Month + " " + d.getDate() + ", " + this.Year;
    
    this.drawPieChart();
    this.drawBarChart();
  }
  drawPieChart(){
    /* Information needed
    budget percentages, if custom otherwise 50-30-20
    categories and budget in each budget slice ([rent, 3300.12],...)
    colors
    End Information needed
    Calculations needed
    convert degress to radians to draw pie slices 
    End Calculations needed
    Still Need to figure out labels on pie chart */

    let xorigin = 450;
    let yorigin = 270;
    let radius = 260;
    //Outer Circle
    this.ctx.beginPath();
    this.ctx.arc(xorigin, yorigin, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    
    //pie slice outline 50%
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.moveTo(xorigin, yorigin);
    this.ctx.arc(xorigin, yorigin, radius, 0, Math.PI);
    this.ctx.lineTo(xorigin, yorigin);
    this.ctx.stroke();
    //pie slice color fill
    this.ctx.fillStyle = '#AC85E9';
    this.ctx.fill();

    //pie slice outline 30%
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.moveTo(xorigin, yorigin);
    this.ctx.arc(xorigin, yorigin, radius, Math.PI, Math.PI + (108 * Math.PI / 180));
    this.ctx.lineTo(xorigin, yorigin);
    this.ctx.stroke();
    //pie slice color fill
    this.ctx.fillStyle = '#F9F484';
    this.ctx.fill();

    //pie slice outline 20%
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.moveTo(xorigin, yorigin);
    this.ctx.arc(xorigin, yorigin, radius, Math.PI + (108 * Math.PI / 180), 0);
    this.ctx.lineTo(xorigin, yorigin);
    this.ctx.stroke();
    //pie slice color fill
    this.ctx.fillStyle = '#84F9F5';
    this.ctx.fill();

    //Label Circle
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#DDDDDD';
    this.ctx.arc(xorigin, yorigin, radius - 10, 0, 2 * Math.PI);
    this.ctx.stroke(); 
  }
  drawBarChart(){
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
    
    this.ctx2.beginPath();
    this.ctx2.moveTo(100, 30);
    this.ctx2.lineTo(100, 500);
    this.ctx2.lineTo(700, 500);
    this.ctx2.stroke();
    this.drawXAxis();
  }
  drawXAxis(){
    this.ctx2.font = '10pt Roboto, Helvetica Neue, sans-serif';
    this.ctx2.textAlign = 'center';
    let X = 160;
    let Yorigin = 500;
    let Ybottom = 510;
    let Ytop = 30;
    let interval = 60;

    for(let i = 0; i < 10; i++){
      this.ctx2.strokeStyle = 'black';
      this.ctx2.beginPath();
      this.ctx2.moveTo(X, Ybottom);
      this.ctx2.lineTo(X, Yorigin);
      this.ctx2.stroke();

      //x-axis labels
      this.ctx2.fillText("Label", X, Ybottom + 20);
      //background lines
      this.ctx2.strokeStyle = '#DDDDDD';
      this.ctx2.beginPath();
      this.ctx2.moveTo(X, Yorigin);
      this.ctx2.lineTo(X, Ytop);
      this.ctx2.stroke();
      X += interval;
    }
    this.ctx2.strokeStyle = 'black';

    this.drawYAxis(5);
  }
  drawYAxis(interval: number){
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
      this.ctx2.beginPath();
      this.ctx2.moveTo(Xorigin, Y);
      this.ctx2.lineTo(Xbottom, Y);
      this.ctx2.stroke();
      //y-axis labels
      this.ctx2.textAlign = 'right';
      this.ctx2.fillStyle = 'black';
      this.ctx2.fillText("Label", Xbottom - 10, Y + 5);

      //1st Bar
      this.ctx2.fillStyle = "#85CBE9";
      this.ctx2.fillRect(Xorigin + 1, Y - (width / 2), Y, width);
      //2nd Bar
      this.ctx2.fillStyle = "#ABE985";
      this.ctx2.fillRect(Xorigin + 1, Y - (width / 2), (Math.random() * 2) * Y, width);

    }
  }
}

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
    //legend
    this.ctx.strokeRect(570, 30, 200, 100);

    //Outer Circle
    this.ctx.beginPath();
    this.ctx.arc(250, 250, 240, 0, 2 * Math.PI);
    this.ctx.stroke();
    
    //pie slice outline 50%
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.moveTo(250, 250);
    this.ctx.arc(250, 250, 240, 0, Math.PI);
    this.ctx.lineTo(250, 250);
    this.ctx.stroke();
    //pie slice color fill
    this.ctx.fillStyle = '#AC85E9';
    this.ctx.fill();

    //pie slice outline 30%
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.moveTo(250, 250);
    this.ctx.arc(250, 250, 240, Math.PI, Math.PI + (108 * Math.PI / 180));
    this.ctx.lineTo(250, 250);
    this.ctx.stroke();
    //pie slice color fill
    this.ctx.fillStyle = '#F9F484';
    this.ctx.fill();

    //pie slice outline 20%
    this.ctx.strokeStyle = 'black';
    this.ctx.beginPath();
    this.ctx.moveTo(250, 250);
    this.ctx.arc(250, 250, 240, Math.PI + (108 * Math.PI / 180), 0);
    this.ctx.lineTo(250, 250);
    this.ctx.stroke();
    //pie slice color fill
    this.ctx.fillStyle = '#84F9F5';
    this.ctx.fill();

    //Label Circle
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#DDDDDD';
    this.ctx.arc(250, 250, 225, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  drawBarChart(){
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
      X += 60;
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
      this.ctx2.fillRect(Xorigin, Y - (width / 2), Y, width);
      //2nd Bar
      this.ctx2.fillStyle = "#ABE985";
      this.ctx2.fillRect(Xorigin, Y - (width / 2), (Math.random() * 2) * Y, width);
    }
  }
}

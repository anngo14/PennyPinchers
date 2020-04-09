import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Goal } from '../models/Goal';

@Component({
  selector: 'app-detailed-goal',
  templateUrl: './detailed-goal.component.html',
  styleUrls: ['./detailed-goal.component.css']
})
export class DetailedGoalComponent implements OnInit {

  months: string[] =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  goal: Goal;
  progressValue; 
  depositAmt: number = null;
  createdDate: string;
  completedDate: string;

  constructor(public detailedGoalRef: MatDialogRef<DetailedGoalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.goal = this.data.detail;
    this.progressValue = this.data.detail.saved / this.data.detail.goal * 100;
    this.progressValue = this.progressValue.toFixed(2);
    this.createdDate = this.parseDate(this.data.detail.created);
    this.completedDate = this.parseDate(this.data.detail.completed);
  }

  addDeposit(){
    var d = new Date();

    this.data.detail.saved += this.depositAmt;
    this.depositAmt = null;
    this.progressValue = this.data.detail.saved / this.data.detail.goal * 100;
    this.progressValue = this.progressValue.toFixed(2);

    if(this.data.detail.saved >= this.data.detail.goal){
      this.data.detail.completed = d.getMonth() + " " + d.getDate() + " " + d.getFullYear();
      this.completedDate = this.parseDate(this.data.detail.completed);
    }
  }
  parseDate(d: string){
    let output: string = "";
    let elements = d.split(" ");
    output += this.months[elements[0]] + " " + elements[1] + ", " + elements[2];
    return output;
  }
}

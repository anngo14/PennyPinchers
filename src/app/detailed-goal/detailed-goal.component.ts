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
  unparsedDate: string = null;
  goalName: string;
  goalSaved: number;
  goalGoal: number;
  cancel: string = "cancel";

  constructor(public detailedGoalRef: MatDialogRef<DetailedGoalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.goal = this.data.detail;
    this.goalName = this.goal.name;
    this.goalGoal = this.goal.goal;
    this.goalSaved = this.goal.saved;

    this.progressValue = this.goalSaved / this.goalGoal * 100;
    this.progressValue = this.progressValue.toFixed(2);
    this.createdDate = this.parseDate(this.data.detail.created);
    if(this.data.detail.completed != null){
      this.completedDate = this.parseDate(this.data.detail.completed);
    }
  }

  addDeposit(){
    var d = new Date();

    this.goalSaved += this.depositAmt;
    this.depositAmt = null;
    this.progressValue = this.goalSaved / this.goalGoal * 100;
    this.progressValue = this.progressValue.toFixed(2);

    if(this.goalSaved >= this.goalGoal){
      this.unparsedDate = d.getMonth() + 1 + " " + d.getDate() + " " + d.getFullYear();
      this.completedDate = this.parseDate(this.unparsedDate);
    }
  }
  parseDate(d: string){
    let output: any = "";
    let elements = d.split(" ");
    output += this.months[Number.parseInt(elements[0]) - 1] + " " + elements[1] + ", " + elements[2];
    return output;
  }
  save(){
    this.data.detail.name = this.goalName;
    if(this.unparsedDate != null){
      this.data.detail.completed = this.unparsedDate;
    }
    this.data.detail.saved = this.goalSaved;
  }
}

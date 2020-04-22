import { Component, OnInit } from '@angular/core';
import { Goal } from '../models/Goal';
import { MatDialog } from '@angular/material/dialog';
import { DetailedGoalComponent } from '../detailed-goal/detailed-goal.component';
import { Router } from '@angular/router';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  goals: Goal[] = [];
  months: string[] =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  progressValue;
  completedGoals: Goal[];
  progressGoals: Goal[];
  todaysDate: string;
  newGoalName: string = null;
  newGoalGoal: number = null;
  newGoalSaved: number = null;
  unparsedDate: string;
  tabIndex = 0;
  
  constructor(public dialog: MatDialog, private r: Router, private g: GoalService) { }

  ngOnInit() {
    if(sessionStorage.getItem("user") === null && localStorage.getItem("user") === null){
      this.r.navigate(['/denied']);
    }
    if(sessionStorage.getItem("initial") === "true" || localStorage.getItem("initial") === "true"){
      this.r.navigate(['/initial']);
    }
    if(sessionStorage.getItem("userObject") === null){
      this.r.navigate(['/home']);
    }
    this.goals = JSON.parse(sessionStorage.getItem("userObject")).goals;
    this.completedGoals = this.getCompleted();
    this.progressGoals = this.getProgress();

    var d = new Date();
    this.todaysDate = this.months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    this.unparsedDate = (d.getMonth() + 1) + " " + d.getDate() + " " + d.getFullYear();
  }

  getCompleted(){
    let goal: Goal[] = [];

    for(let i = 0; i < this.goals.length; i++){
      if(this.goals[i].completed != null){
        goal.push(this.goals[i]);
      }
    }
    return goal;
  }
  getProgress(){
    let goal: Goal[] = [];

    for(let i = 0; i < this.goals.length; i++){
      if(this.goals[i].completed === null){
        goal.push(this.goals[i]);
      }
    }
    return goal;
  }
  openDetailedGoal(g: Goal){
    let index = this.goals.indexOf(g);
    const detailedGoalRef = this.dialog.open(DetailedGoalComponent, {
      data: {
        detail: g
      }
    });
    detailedGoalRef.afterClosed().subscribe(result => {
      if(result && result !== "cancel" && confirm("Are you sure you want to delete this goal?")){
        this.goals.splice(index, 1);  
      } 
      if(result === "cancel"){
        return;
      }
      this.g.updateGoal(sessionStorage.getItem("user"), this.goals).subscribe();
      var userObj = JSON.parse(sessionStorage.getItem("userObject"));
      userObj.goals = this.goals;
      sessionStorage.setItem("userObject", JSON.stringify(userObj));
      this.completedGoals = this.getCompleted();
      this.progressGoals = this.getProgress();
    });
  }
  createGoal(){
    if(this.newGoalName.trim() === ("") || Number.isNaN(this.newGoalGoal)){
      return;
    }
    if(this.newGoalSaved < this.newGoalGoal){
      this.goals.push({
        name: this.newGoalName,
        goal: this.newGoalGoal,
        saved: this.newGoalSaved,
        created: this.unparsedDate,
        completed: null
      });
    } else{
      this.goals.push({
        name: this.newGoalName,
        goal: this.newGoalGoal,
        saved: this.newGoalSaved,
        created: this.unparsedDate,
        completed: this.todaysDate
      });
    }

    this.completedGoals = this.getCompleted();
    this.progressGoals = this.getProgress();

    this.newGoalName = null;
    this.newGoalGoal = null;
    this.newGoalSaved = null;
    this.tabIndex = 0;

    this.g.updateGoal(sessionStorage.getItem("user"), this.goals).subscribe();
    var userObj = JSON.parse(sessionStorage.getItem("userObject"));
    userObj.goals = this.goals;
    sessionStorage.setItem("userObject", JSON.stringify(userObj));
  }
  getGridCols(){
    let wwt = window.innerWidth;
    
    if(wwt >= 1920){
      return 5;
    } else if(wwt < 1920 && wwt >= 1250){
      return 4;
    } else if(wwt < 1250 && wwt >= 685){
      return 3;
    } else if(wwt < 685 && wwt >= 505){
      return 2;
    } else {
      return 1;
    }
  }
}

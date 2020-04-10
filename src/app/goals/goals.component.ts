import { Component, OnInit } from '@angular/core';
import { Goal } from '../models/Goal';
import { MatDialog } from '@angular/material/dialog';
import { DetailedGoalComponent } from '../detailed-goal/detailed-goal.component';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

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

  progressValue;
  completedGoals: Goal[];
  progressGoals: Goal[];
  todaysDate: string;
  newGoalName: string = null;
  newGoalGoal: number = null;
  newGoalSaved: number = null;
  unparsedDate: string;
  tabIndex = 0;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.progressValue = 65;
    this.completedGoals = this.getCompleted();
    this.progressGoals = this.getProgress();

    var d = new Date();
    this.todaysDate = this.months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    this.unparsedDate = d.getMonth() + " " + d.getDate() + " " + d.getFullYear();
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
      if(result && confirm("Are you sure you want to delete this goal?")){
        this.goals.splice(index, 1);
      }
      this.completedGoals = this.getCompleted();
      this.progressGoals = this.getProgress();
    });
  }
  createGoal(){
    if(this.newGoalName.trim() === ("") || Number.isNaN(this.newGoalGoal)){
      return;
    }
    this.goals.push({
      name: this.newGoalName,
      goal: this.newGoalGoal,
      saved: this.newGoalSaved,
      created: this.unparsedDate,
      completed: null
    });

    this.completedGoals = this.getCompleted();
    this.progressGoals = this.getProgress();

    this.newGoalName = null;
    this.newGoalGoal = null;
    this.newGoalSaved = null;
    this.tabIndex = 0;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Goal } from '../models/Goal';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  protocol: string = "";
  updateGoalUrl: string = 'pennypinchers.herokuapp.com/updateGoal';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  updateGoal(email: string, goals: Goal[]){
    this.protocol = window.location.protocol + "//";
    let goalJSON = {
      "email": email,
      "goals": goals
    };
    return this.http.post(this.protocol + this.updateGoalUrl, goalJSON, this.httpOptions);
  }
}

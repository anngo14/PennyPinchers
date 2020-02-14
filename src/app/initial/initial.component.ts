import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  expenses = [];
  empty = true;
  firstName = "";
  lastName = "";
  goal = "";
  income = "";
  incomeAmt = "";
  incomeType = "";
  incomeFrequency = "";
  constructor(private r: Router) { }

  ngOnInit() {
    if(this.expenses.length > 0){
      this.empty = false;
    }
  }
  redirectToHome(){
    this.r.navigate(['/home']);
  }

}

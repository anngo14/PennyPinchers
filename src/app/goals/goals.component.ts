import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  progressValue;
  test: any[] = [0,1,2,3,4,5,6,7,8];
  test2: any[] = [0,1,2,3,4];

  goal = 100;
  goal2 = 69;
  
  constructor() { }

  ngOnInit() {
    this.progressValue = 65;
  }

}

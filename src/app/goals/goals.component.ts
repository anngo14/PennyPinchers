import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  progressValue;
  
  constructor() { }

  ngOnInit() {
    this.progressValue = 65;
  }

}

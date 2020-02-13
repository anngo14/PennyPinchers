import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  expenses = [];
  empty = true;
  constructor() { }

  ngOnInit() {
    if(this.expenses.length > 0){
      this.empty = false;
    }
  }

}

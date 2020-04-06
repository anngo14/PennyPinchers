import { Component, OnInit, Inject } from '@angular/core';
import { budgetCategoryList } from '../models/budgetCategoryList';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-wants-dialog',
  templateUrl: './wants-dialog.component.html',
  styleUrls: ['./wants-dialog.component.css']
})
export class WantsDialogComponent implements OnInit {
  wants: budgetCategoryList[] = [];
  wantsTitle: string;
  wantsAmount: number;

  constructor(public wantDialogRef: MatDialogRef<WantsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.wants = this.data.wants;
  }
  
  addNewWant(){
    if(this.wantsTitle.trim() === "" || this.wantsAmount === undefined || this.wantsAmount === null){
      return;
    }

    let want = {
      title: this.wantsTitle,
      amount: this.wantsAmount
    };
    let expense = {
      title: this.wantsTitle,
      budget: this.wantsAmount,
      used: 0
    };

    this.wants.push(want);
    this.data.expenseList.push(expense);

    this.wantsTitle = "";
    this.wantsAmount = null;
  }
  deleteWant(w){
    let index = this.wants.indexOf(w);
    this.wants.splice(index, 1);

    for(let i = 0; i < this.data.expenseList.length; i++){
      if(this.data.expenseList[i].title === w.title && this.data.expenseList[i].budget == w.amount){
        index = i;
        break;
      }
    }
    this.data.expenseList.splice(index, 1);
  }
}

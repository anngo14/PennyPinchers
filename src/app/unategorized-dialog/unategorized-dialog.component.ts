import { Component, OnInit, Inject } from '@angular/core';
import { budgetCategoryList } from '../models/budgetCategoryList';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-unategorized-dialog',
  templateUrl: './unategorized-dialog.component.html',
  styleUrls: ['./unategorized-dialog.component.css']
})
export class UnategorizedDialogComponent implements OnInit {
  uncategorized: budgetCategoryList[] = [];
  uncategorizedTitle: string;
  uncategorizedAmount: number;

  constructor(public uncategorizedDialogRef: MatDialogRef<UnategorizedDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.uncategorized = this.data.uncategorized;
  }

  addNewUncategorized(){
    if(this.uncategorizedTitle.trim() === "" || this.uncategorizedAmount === undefined || this.uncategorizedAmount === null){
      return;
    }

    let item = {
      title: this.uncategorizedTitle,
      amount: this.uncategorizedAmount
    };
    let expense = {
      title: this.uncategorizedTitle,
      budget: this.uncategorizedAmount,
      used: 0
    };

    this.uncategorized.push(item);
    this.data.expenseList.push(expense);

    this.uncategorizedTitle = "";
    this.uncategorizedAmount = null;
  }
  deleteUncategorized(u){
    let index = this.uncategorized.indexOf(u);
    this.uncategorized.splice(index, 1);

    for(let i = 0; i < this.data.expenseList.length; i++){
      if(this.data.expenseList[i].title === u.title && this.data.expenseList[i].budget === u.amount){
        index = i;
        break;
      }
    }
    this.data.expenseList.splice(index, 1);
  }
  saveUncategorized(){
    for(let i = 0; i < this.uncategorized.length; i++){
      for(let j = 0; j < this.data.expenseList.length; j++){
        if(this.uncategorized[i].title === this.data.expenseList[j].title && this.uncategorized[i].amount != this.data.expenseList[j].budget){
          this.data.expenseList[j].budget = this.uncategorized[i].amount;
        }
      }
    }
  }
}

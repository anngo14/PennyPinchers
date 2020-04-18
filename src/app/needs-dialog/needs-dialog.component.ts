import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { budgetCategoryList } from '../models/budgetCategoryList';

@Component({
  selector: 'app-needs-dialog',
  templateUrl: './needs-dialog.component.html',
  styleUrls: ['./needs-dialog.component.css']
})
export class NeedsDialogComponent implements OnInit {
  needs: budgetCategoryList[] = [];
  needsTitle: string = "";
  needsAmount: number;

  constructor(public needsDialogRef: MatDialogRef<NeedsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.needs = this.data.needs;
  }

  addNewNeed(){
    if(this.needsTitle.trim() === "" || this.needsAmount === undefined || this.needsAmount === null){
      return;
    }

    let need = {
      title: this.needsTitle,
      amount: this.needsAmount
    };

    let expense = {
      title: this.needsTitle,
      budget: this.needsAmount,
      used: 0
    };

    this.needs.push(need);
    this.data.expenseList.splice(this.needs.length - 1, 0, expense);

    this.needsTitle = "";
    this.needsAmount = null;
  }
  deleteNeed(n){
    let index = this.needs.indexOf(n);
    this.needs.splice(index, 1);
    
    for(let i = 0; i < this.data.expenseList.length; i++){
      if(this.data.expenseList[i].title === n.title && this.data.expenseList[i].budget === n.amount){
        index = i;
        break;
      }
    }
    this.data.expenseList.splice(index, 1);
  }
  saveNeeds(){
    for(let i = 0; i < this.needs.length; i++){
      this.data.expenseList[i].title = this.needs[i].title;
      this.data.expenseList[i].budget = this.needs[i].amount;
    }
  }
}

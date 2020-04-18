import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { budgetCategoryList } from '../models/budgetCategoryList';

@Component({
  selector: 'app-saving-dialog',
  templateUrl: './saving-dialog.component.html',
  styleUrls: ['./saving-dialog.component.css']
})
export class SavingDialogComponent implements OnInit {
  saving: budgetCategoryList[] = [];
  savingTitle: string;
  savingAmount: number;

  constructor(public savingDialofRef: MatDialogRef<SavingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.saving = this.data.saving;
  }

  addNewSaving(){
    if(this.savingTitle.trim() === "" || this.savingAmount === undefined || this.savingAmount === null){
      return;
    }

    let saving = {
      title: this.savingTitle,
      amount: this.savingAmount
    };
    let expense = {
      title: this.savingTitle,
      budget: this.savingAmount,
      used: 0
    };

    this.saving.push(saving);
    this.data.expenseList.splice(this.data.offset + this.saving.length - 1, 0, expense);

    this.savingTitle = "";
    this.savingAmount = null;
  }
  deleteSaving(s){
    let index = this.saving.indexOf(s);
    this.saving.splice(index, 1);

    for(let i = 0; i < this.data.expenseList.length; i++){
      if(this.data.expenseList[i].title === s.title && this.data.expenseList[i].budget === s.amount){
        index = i;
        break;
      }
    }
    this.data.expenseList.splice(index, 1);
  }
  saveSavings(){
    for(let i = 0; i < this.saving.length; i++){
      this.data.expenseList[i + this.data.offset].title = this.saving[i].title;
      this.data.expenseList[i + this.data.offset].budget = this.saving[i].amount;
    }
  }
}

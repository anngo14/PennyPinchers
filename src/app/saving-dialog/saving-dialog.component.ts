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

    let want = {
      title: this.savingTitle,
      amount: this.savingAmount
    };

    this.saving.push(want);
  }
  deleteSaving(s){
    let index = this.saving.indexOf(s);
    this.saving.splice(index, 1);
  }
}

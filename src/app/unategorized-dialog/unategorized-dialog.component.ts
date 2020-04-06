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

    this.uncategorized.push(item);
  }
  deleteUncategorized(u){
    let index = this.uncategorized.indexOf(u);
    this.uncategorized.splice(index, 1);
  }
}

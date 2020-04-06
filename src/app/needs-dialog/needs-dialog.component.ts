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
  needsTitle: string;
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

    this.needs.push(need);
  }
  deleteNeed(n){
    let index = this.needs.indexOf(n);
    this.needs.splice(index, 1);
  }
}

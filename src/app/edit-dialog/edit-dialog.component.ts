import { Component, OnInit, Inject } from '@angular/core';
import { income } from '../models/income';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  incomes: income[];
  needsPercent: number;
  wantsPercent: number;
  savingPercent: number;

  constructor(public editDialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.incomes = this.data.budget.incomes;
    this.needsPercent = this.data.budget.categories[0].percentage * 100;
    this.wantsPercent = this.data.budget.categories[1].percentage * 100;
    this.savingPercent = this.data.budget.categories[2].percentage * 100;
  }

  addIncomeSource(){
    let blank: income = {
      income: null,
      frequency: "",
      hoursWeekly: null,
      type: ""
    };

    this.incomes.push(blank);
  }
  deleteIncome(i: income){
    let index = this.incomes.indexOf(i);
    this.incomes.splice(index, 1);
  }
}

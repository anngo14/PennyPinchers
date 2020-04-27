import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  msg:string = "";
  saveFlag: boolean = false;

  constructor(public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.msg = this.data.msg;
  }

  save(){
    this.saveFlag = true;
    setTimeout(() => {
      this.confirmDialogRef.close(true);
    }, 1500);
  }
}

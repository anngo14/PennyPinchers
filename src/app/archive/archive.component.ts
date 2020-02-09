import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  pastYears = [];
  months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor() { }

  ngOnInit() {
    var d = new Date();
    this.pastYears = [d.getFullYear(), 2019];
  }

}

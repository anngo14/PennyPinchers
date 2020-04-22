import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  mode: string = "Recommended Budget"
  constructor(private r: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("user") === null && localStorage.getItem("user") === null){
      this.r.navigate(['/denied']);
    }
    if(sessionStorage.getItem("initial") === "true" || localStorage.getItem("initial") === "true"){
      this.r.navigate(['/initial']);
    }

  }

  onToggle(event){
    if(event.checked === true){
      this.mode = "Custom Budget";
    } else{
      this.mode = "Recommended Budget";
    }
  }
}

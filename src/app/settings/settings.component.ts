import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  mode: string = "Recommended Budget"
  constructor() { }

  ngOnInit() {
  }

  onToggle(event){
    if(event.checked === true){
      this.mode = "Custom Budget";
    } else{
      this.mode = "Recommended Budget";
    }
  }
}

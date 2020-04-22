import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PennyPinchers';
  username: string = "";
  initial: boolean = false;

  constructor(private r: Router, private d: DataService){}
  
  ngOnInit(){
    this.d.userName.subscribe(data => {
      this.username = data;
    });
    if(localStorage.getItem("user") != null){
      this.username = localStorage.getItem("user");
    }
    if(sessionStorage.getItem("user") != null){
      this.username = sessionStorage.getItem("user");
    }
  }
  redirectToLogin(){
    localStorage.clear();
    sessionStorage.clear();
    this.d.changeUser("");
    this.r.navigate(['/login']);
  }
  redirectToHome(){
    this.r.navigate(['/home']);
  }
  redirectToGoals(){
    this.r.navigate(['/goals']);
  }
  redirectToEdit(){
    this.r.navigate(['/edit']);
  }
  redirectToArchive(){
    this.r.navigate(['/archive']);
  }
  redirectToSettings(){
    this.r.navigate(['/settings']);
  }
  redirectToInitial(){
    this.r.navigate(['initial']);
  }
  checkRes(){
    let wwt = window.innerWidth;
    if(wwt <= 460){
      return false;
    }
    return true;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PennyPinchers';

  constructor(private r: Router){}
  
  redirectToLogin(){
    localStorage.clear();
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
}

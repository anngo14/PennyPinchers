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
    this.r.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  initial = true;
  constructor(private r: Router) { }

  ngOnInit() {
  }

  redirectToHome(){
    if(this.initial){
      this.r.navigate(['/initial']);
    } else{
      this.r.navigate(['/home']);
    }
  }
  redirectToRegister(){
    this.r.navigate(['/register']);
  }
}

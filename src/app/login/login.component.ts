import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { transition, trigger, query, style, animate, state, keyframes } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginFail', [
      state('true', style({})),
      state('false', style({})),
      transition('* => true', animate("250ms", keyframes([
        style({transform: 'translate(-45%, 31.5%)'}),
        style({transform: 'translate(-50%, 31.5%)'}),
        style({transform: 'translate(-55%, 31.5%)'}),
        style({transform: 'translate(-50%, 31.5%'}),
        style({transform: 'translate(-45%, 31.5%)'}),
        style({transform: 'translate(-50%, 31.5%)'}),
        style({transform: 'translate(-55%, 31.5%)'}),
        style({transform: 'translate(-50%, 31.5%'})
      ])))
    ])
  ]
})
export class LoginComponent implements OnInit {

  initial = true;
  email = "";
  password = "";
  error = false;
  checked = false;
  userInput = new FormControl('', [Validators.required]);
  passInput = new FormControl('', [Validators.required]);
  constructor(private r: Router) { }

  ngOnInit() {
  }

  getErrorMessage(){
    return this.userInput.hasError('required') ? 'You must enter a value': 
      this.passInput.hasError('required') ? 'You must enter a value': 
      '';
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
  signIn(){
    this.error = true;
    setTimeout(() => {this.error = false}, 1000);
    //this.redirectToHome();
  }
}

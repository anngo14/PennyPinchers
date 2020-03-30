import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { transition, trigger, query, style, animate, state, keyframes } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('passwordHint', [
      state('true', style({
        transform: 'translate(200%, -85%)'
        
      })),
      state('false', style({})),
      transition('* => true', animate("500ms", keyframes([
        style({transform: 'translate(200%, -85%)'}), 
      ])))
    ]),
    trigger('registerFail', [
      state('true', style({})),
      state('fail', style({})),
      transition('* => true', animate("250ms", keyframes([
        style({transform: 'translate(-45%, 25%)'}),
        style({transform: 'translate(-50%, 25%)'}),
        style({transform: 'translate(-55%, 25%)'}),
        style({transform: 'translate(-50%, 25%'}),
        style({transform: 'translate(-45%, 25%)'}),
        style({transform: 'translate(-50%, 25%)'}),
        style({transform: 'translate(-55%, 25%)'}),
        style({transform: 'translate(-50%, 25%'})
      ])))
    ])
  ]
})
export class RegisterComponent implements OnInit {

  email = "";
  password = "";
  confirmPassword = "";
  emailInput = new FormControl('', [Validators.required]);
  passInput = new FormControl('', [Validators.required]);
  confirmInput = new FormControl('', [Validators.required]);
  showHint: boolean = false;
  error: boolean = false;

  constructor(private r: Router) { }

  ngOnInit() {
  }
  getErrorMessage(){
    return this.emailInput.hasError('required') ? 'You must enter a value': 
      this.passInput.hasError('required') ? 'You must enter a value': 
      this.confirmInput.hasError('required') ? 'You must enter a value':
      '';
  }
  redirectToHome(){
    this.r.navigate(['/home']);
  }
  createAccount(){
    this.error = true;
    setTimeout(() => {this.error = false}, 1000);
    //this.r.navigate(['/login']);
  }
  showPasswordHint(){
    this.showHint = true;
  }
  checkUpper(){
    if(this.password.match(/.*[A-Z].*/)){
      return true;
    }
    return false;
  }
  checkLower(){
    if(this.password.match(/.*[a-z].*/)){
      return true;
    }
    return false;
  }
  checkSpecial(){
    if(this.password.match(/.*[$!@#%&*^()-+=?<>:;'"|\\{}~`,\./].*/)){
      return true;
    }
    return false;
  }
  checkMatch(){
    if(this.password === this.confirmPassword && !this.password.match(/^\s*$/)){
      return true;
    }
    return false;
  }
}

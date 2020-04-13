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
      state('1', style({
        transform: 'translate(200%, -85%)'
      })),
      state('2', style({
        transform: 'translate(160%, -85%)'
      })),
      state('3', style({
        transform: 'translate(120%, -85%)'
      })),
      state('4', style({
        transform: 'translate(90%, -85%)'
      })),
      state('0', style({})),
      transition('* => 1', animate("500ms", keyframes([
        style({transform: 'translate(200%, -85%)'}), 
      ]))),
      transition('* => 2', animate("500ms", keyframes([
        style({transform: 'translate(160%, -85%'})
      ]))),
      transition('* => 3', animate("500ms", keyframes([
        style({transform: 'translate(120%, -85%'})
      ]))),
      transition('* => 4', animate("500ms", keyframes([
        style({transform: 'translate(90%, -85%'})
      ]))),
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
  showHint: number = 0;
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
    let wwt = window.innerWidth;
    if(wwt > 768){
      this.showHint = 1;
    } else if(wwt <= 768 && wwt > 550){
      this.showHint = 2;
    } else if(wwt <= 550 && wwt > 411){
      this.showHint = 3;
    } else if(wwt <= 411){
      this.showHint = 4;
    }
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

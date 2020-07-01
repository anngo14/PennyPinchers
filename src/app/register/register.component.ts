import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { transition, trigger, query, style, animate, state, keyframes } from '@angular/animations';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('passwordHint', [
      state('1', style({
        transform: 'translate(180%, -45%)'
      })),
      state('2', style({
        transform: 'translate(140%, -45%)'
      })),
      state('3', style({
        transform: 'translate(100%, -45%)'
      })),
      state('4', style({
        transform: 'translate(80%, -45%)'
      })),
      state('0', style({})),
      transition('* => 1', animate("500ms", keyframes([
        style({transform: 'translate(180%, -45%)'}), 
      ]))),
      transition('* => 2', animate("500ms", keyframes([
        style({transform: 'translate(140%, -45%'})
      ]))),
      transition('* => 3', animate("500ms", keyframes([
        style({transform: 'translate(100%, -45%'})
      ]))),
      transition('* => 4', animate("500ms", keyframes([
        style({transform: 'translate(80%, -45%'})
      ]))),
    ]),
    trigger('registerFail', [
      state('true', style({})),
      state('fail', style({})),
      transition('* => true', animate("250ms", keyframes([
        style({transform: 'translate(-5%, 0%)'}),
        style({transform: 'translate(0%, 0%)'}),
        style({transform: 'translate(5%, 0%)'}),
        style({transform: 'translate(0%, 0%'}),
        style({transform: 'translate(-5%, 0%)'}),
        style({transform: 'translate(0%, 0%)'}),
        style({transform: 'translate(5%, 0%)'}),
        style({transform: 'translate(0%, 0%'})
      ])))
    ])
  ]
})
export class RegisterComponent implements OnInit {

  email = "";
  password = "";
  confirmPassword = "";
  showHint: number = 0;
  error: boolean = false;
  valid: boolean = true;

  constructor(private r: Router, private s: UserService) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    if(event.keyCode === 13){
      if(this.validInput()){
        this.createAccount();
      } else{
        this.invalidAccount();
      }
    }
  }
  ngOnInit() {
  }

  createAccount(){
    this.s.registerUser(this.email, this.password).subscribe(data => {
      if(data.status === "success"){
        this.r.navigate(['/login']);
      } else {
        this.valid = false;
        setTimeout(() => {this.valid = true}, 8000);
        this.invalidAccount();
      }
    });
  }
  invalidAccount(){
    this.error = true;
    setTimeout(() => {this.error = false}, 1000);
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
  checkLength(){
    if(this.password.length < 8){
      return false;
    }
    return true;
  }
  checkEmail(){
    if(this.email.match(/.+@.+\..+/)){
      return true;
    }
    return false;
  }
  validInput(){
    if(this.checkEmail() && this.checkLower() && this.checkUpper() && this.checkSpecial() && this.checkMatch() && this.checkLength()){
      return true;
    }
    return false;
  }
}

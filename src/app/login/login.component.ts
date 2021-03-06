import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { transition, trigger, query, style, animate, state, keyframes } from '@angular/animations';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';
import { OVERLAY_KEYBOARD_DISPATCHER_PROVIDER } from '@angular/cdk/overlay/typings/keyboard/overlay-keyboard-dispatcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginFail', [
      state('true', style({})),
      state('false', style({})),
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
export class LoginComponent implements OnInit {

  initial: boolean;
  email = "";
  password = "";
  error = false;
  checked = false;
  valid: boolean = false;
  userInput = new FormControl('', [Validators.required]);
  passInput = new FormControl('', Validators.compose(
    [
      Validators.required,
      Validators.minLength(8)
    ]
  ));
  constructor(private r: Router, private s: UserService, private d: DataService) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    if(event.keyCode === 13){
      this.signIn();
    }
  }
  ngOnInit() {
    if(localStorage.getItem("user") != null || sessionStorage.getItem("user") != null){
      this.r.navigate(['/home']);
    }
  }
 
  getErrorMessage(){
    return this.userInput.hasError('required') ? 'Enter a Valid Value': 
      this.passInput.hasError('required') ? 'Enter a Valid Value': 
      '';
  }
  redirectToHome(){
    if(this.initial){
      this.r.navigate(['/initial']);
    } else{
      this.r.navigate(['/dashboard']);
    }
  }
  redirectToRegister(){
    this.r.navigate(['/register']);
  }
  signIn(){
    this.s.checkUser(this.email, this.password).subscribe(data => {
      if(data.status === "success"){
        this.d.changeUser(this.email);
        if(this.checked){
          localStorage.setItem("user", this.email);
          localStorage.setItem("initial", "false");
        }
        sessionStorage.setItem("user", this.email);
        localStorage.setItem("initial", "false");
        this.initial = false;
        this.redirectToHome();
      } else if(data.status === "initial"){
        this.d.changeUser(this.email);
        if(this.checked){
          localStorage.setItem("user", this.email);
          localStorage.setItem("initial", "true");
        }
        sessionStorage.setItem("user", this.email);
        sessionStorage.setItem("initial", "true");
        this.initial = true;
        this.redirectToHome();
      } else{
        this.error = true;
        setTimeout(() => {this.error = false}, 1000);
      }
    });
  }
  validCheck(){
    if(this.password.length >= 8 && (this.email.length > 0 && this.email.match(/.+@.+\..+/))){
      return true;
    }
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  oldPassword: string;
  newPassword: string = "";
  confirmPassword: string;

  constructor(private r: Router, private s: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    if(sessionStorage.getItem("user") === null && localStorage.getItem("user") === null){
      this.r.navigate(['/denied']);
    }
    if(sessionStorage.getItem("initial") === "true" || localStorage.getItem("initial") === "true"){
      this.r.navigate(['/initial']);
    }

  }

  redirectToHome(){
    this.r.navigate(['/dashboard']);
  }
  checkUpper(){
    if(this.newPassword.match(/.*[A-Z].*/)){
      return true;
    }
    return false;
  }
  checkLower(){
    if(this.newPassword.match(/.*[a-z].*/)){
      return true;
    }
    return false;
  }
  checkSpecial(){
    if(this.newPassword.match(/.*[$!@#%&*^()-+=?<>:;'"|\\{}~`,\./].*/)){
      return true;
    }
    return false;
  }
  checkMatch(){
    if(this.newPassword === this.confirmPassword && !this.newPassword.match(/^\s*$/)){
      return true;
    }
    return false;
  }
  checkLength(){
    if(this.newPassword.length < 8){
      return false;
    }
    return true;
  }
  validCheck(){
    if(this.newPassword != this.confirmPassword){
      return false;
    }
    if(this.newPassword.length < 8){
      return false;
    }
    if(!this.checkUpper() || !this.checkLower() || !this.checkSpecial() || !this.checkMatch()){
      return false;
    }
    if(this.newPassword.trim() === ""){
      return false;
    }
    return true;
  }
  saveSettings(){
    if(this.validCheck()){
      const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { msg: "Are you Sure you Wish to Change Your Password?" }
      });
      confirmDialogRef.afterClosed().subscribe(result => {
        if(result){
          this.s.changePassword(sessionStorage.getItem("user"), this.oldPassword, this.newPassword).subscribe(msg => {
            alert(msg.status);
            this.oldPassword = "";
            this.newPassword = "";
            this.confirmPassword = "";
          });
        }
      })
    } else{
      alert("Invalid Password! Please Try Again");
    }
  }
  deleteAccount(){
    const loginDialogRef = this.dialog.open(LoginDialogComponent);
    loginDialogRef.afterClosed().subscribe(result => {
      this.s.deleteUser(result.email, result.pass).subscribe(data => {
        if(data.status === "success"){
          sessionStorage.clear();
          localStorage.clear();
          this.r.navigate(['/login']);
        }
      });
    })
  }
}

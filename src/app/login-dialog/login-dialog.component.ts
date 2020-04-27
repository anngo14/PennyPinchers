import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  email: string;
  password: string;
  loginFlag: boolean = false;
  loginError: boolean = false;
  loginObj = {
    email: "",
    pass: ""
  };

  constructor(private dialogRef:MatDialogRef<LoginDialogComponent>, private s: UserService) { }

  ngOnInit() {
  }

  checkPassword(){
    if(this.email === sessionStorage.getItem("user")){
      this.s.checkUser(this.email, this.password).subscribe(data => {
        if(data.status === "success"){
          this.loginFlag = true;
          this.loginObj.email = this.email;
          this.loginObj.pass = this.password;
          setTimeout(() => {
            this.dialogRef.close(this.loginObj)
          }, 2500);
        } else if(data.status === "unsuccessful") {
          this.loginError = true;
          setTimeout(() => {
            this.loginError = false;
          }, 1500);
        }
      });
    } else{
      this.loginError = true;
      setTimeout(() => {
        this.loginError = false;
      }, 1500);
    }
  }
}

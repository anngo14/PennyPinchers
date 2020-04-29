import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../models/user';
import { BudgetObj } from '../models/BudgetObj';
import { ExpenseObj } from '../models/ExpenseObj';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protocol: string = "";
  registerUrl: string = 'pennypinchers.herokuapp.com/register';
  loginUrl: string = 'pennypinchers.herokuapp.com/login';
  saveUrl: string = 'pennypinchers.herokuapp.com/saveuser';
  getUserUrl: string = 'pennypinchers.herokuapp.com/getuser';
  updateUrl: string = 'pennypinchers.herokuapp.com/update';
  updateDateUrl: string = 'pennypinchers.herokuapp.com/updateDate';
  changePasswordUrl: string = 'pennypinchers.herokuapp.com/changePassword';
  deleteUserUrl: string = 'pennypinchers.herokuapp.com/deleteUser';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  registerUser(email: string, pass: string): any{
    this.protocol = window.location.protocol + "//";
    let userJSON = {
      "email": email,
      "pass": pass
    };
    return this.http.post(this.protocol + this.registerUrl, userJSON, this.httpOptions);
  }
  checkUser(email: string, pass: string): any{
    this.protocol = window.location.protocol + "//";
    let userJSON = {
      "email": email,
      "pass": pass
    };
    return this.http.post(this.protocol + this.loginUrl, userJSON, this.httpOptions);
  }
  saveUser(user: user){
    this.protocol = window.location.protocol + "//";
    return this.http.post(this.protocol + this.saveUrl, user, this.httpOptions);
  }
  getUser(email: string): any{
    this.protocol = window.location.protocol + "//";
    return this.http.post(this.protocol + this.getUserUrl, {"email": email}, this.httpOptions);
  }
  update(email: string, budget: BudgetObj, archive: BudgetObj[], expense: ExpenseObj, archiveExpense: ExpenseObj[]){
    this.protocol = window.location.protocol + "//";
    let update = {
      "email": email,
      "budget": budget,
      "archive": archive,
      "expense": expense,
      "archiveExpense": archiveExpense
    };
    return this.http.post(this.protocol + this.updateUrl, update, this.httpOptions);
  }
  updateDate(email: string, date: string){
    this.protocol = window.location.protocol + "//";
    let update = {
      "email": email,
      "date": date
    };
    return this.http.post(this.protocol + this.updateDateUrl, update, this.httpOptions);
  }
  changePassword(email: string, pass: string, newpass: string): any{
    this.protocol = window.location.protocol + "//";
    let update = {
      "email": email,
      "password": pass,
      "new": newpass
    };
    return this.http.post(this.protocol + this.changePasswordUrl, update, this.httpOptions);
  }
  deleteUser(email: string, pass: string): any{
    this.protocol = window.location.protocol + "//";
    let user = {
      "email": email,
      "password": pass
    };
    return this.http.post(this.protocol + this.deleteUserUrl, user, this.httpOptions);
  }
}

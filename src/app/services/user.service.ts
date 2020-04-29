import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../models/user';
import { BudgetObj } from '../models/BudgetObj';
import { ExpenseObj } from '../models/ExpenseObj';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerUrl: string = 'https://pennypinchers.herokuapp.com/register';
  loginUrl: string = 'https://pennypinchers.herokuapp.com/login';
  saveUrl: string = 'https://pennypinchers.herokuapp.com/saveuser';
  getUserUrl: string = 'https://pennypinchers.herokuapp.com/getuser';
  updateUrl: string = 'https://pennypinchers.herokuapp.com/update';
  updateDateUrl: string = 'https://pennypinchers.herokuapp.com/updateDate';
  changePasswordUrl: string = 'https://pennypinchers.herokuapp.com/changePassword';
  deleteUserUrl: string = 'https://pennypinchers.herokuapp.com/deleteUser';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  registerUser(email: string, pass: string): any{
    let userJSON = {
      "email": email,
      "pass": pass
    };
    return this.http.post(this.registerUrl, userJSON, this.httpOptions);
  }
  checkUser(email: string, pass: string): any{
    let userJSON = {
      "email": email,
      "pass": pass
    };
    return this.http.post(this.loginUrl, userJSON, this.httpOptions);
  }
  saveUser(user: user){
    return this.http.post(this.saveUrl, user, this.httpOptions);
  }
  getUser(email: string): any{
    return this.http.post(this.getUserUrl, {"email": email}, this.httpOptions);
  }
  update(email: string, budget: BudgetObj, archive: BudgetObj[], expense: ExpenseObj, archiveExpense: ExpenseObj[]){
    let update = {
      "email": email,
      "budget": budget,
      "archive": archive,
      "expense": expense,
      "archiveExpense": archiveExpense
    };
    return this.http.post(this.updateUrl, update, this.httpOptions);
  }
  updateDate(email: string, date: string){
    let update = {
      "email": email,
      "date": date
    };
    return this.http.post(this.updateDateUrl, update, this.httpOptions);
  }
  changePassword(email: string, pass: string, newpass: string): any{
    let update = {
      "email": email,
      "password": pass,
      "new": newpass
    };
    return this.http.post(this.changePasswordUrl, update, this.httpOptions);
  }
  deleteUser(email: string, pass: string): any{
    let user = {
      "email": email,
      "password": pass
    };
    return this.http.post(this.deleteUserUrl, user, this.httpOptions);
  }
}

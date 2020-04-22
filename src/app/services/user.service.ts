import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerUrl: string = 'http://localhost:5000/register';
  loginUrl: string = 'http://localhost:5000/login';
  saveUrl: string = 'http://localhost:5000/saveuser';
  getUserUrl: string = 'http://localhost:5000/getuser';

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
}

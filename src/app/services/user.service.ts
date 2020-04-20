import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerurl: string = 'http://localhost:5000/register'
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
    return this.http.post(this.registerurl, userJSON, this.httpOptions);
  }
}

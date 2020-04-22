import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private defaultUser = new BehaviorSubject("");
  userName = this.defaultUser.asObservable();

  constructor() { }

  changeUser(user: string){
    this.defaultUser.next(user);
  }
}

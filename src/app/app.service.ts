import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private username = new BehaviorSubject('default message');
  currentUsername = this.username.asObservable();

  constructor() { }

  changeUsername(message: string) {
    this.username.next(message)
  }

}
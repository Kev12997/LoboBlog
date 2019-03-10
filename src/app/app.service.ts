import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { firestore } from "nativescript-plugin-firebase";
const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class DataService {

  private username = new BehaviorSubject('default message');
  private message;
  public json;
  public json2;
  currentUsername = this.username.asObservable();

  constructor() { }

  changeUsername(message: string) {
    this.username.next(message)
  }

  posts(){
  //   firebase.push(
  //     '/posts',
  //     {
  //       'body': 'Como se escribe el inner join',
  //       'category': 'CCOM',
  //       'comments': {
  //         'comment': 'Eso es facil...'
  //       },
  //       'likes': 2,
  //       'title': 'SQL question',
  //       'user_email': 'test@test.com'
  //     }
  // ).then(
  //     function (result) {
  //       console.log("created key: " + result.key);
  //     }
  // );

    firebase.getValue('/posts')
    .then(result => this.json = JSON.parse(JSON.stringify(result)))
    .catch(error => console.log("Error: " + error));
  }

}
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class DataService {
  private username = new BehaviorSubject("default message");

  //public json; //Used in main menu, gets all the jsons in posts
  public category; // Gets the name of the category (Ex: CCOM, COMU, etc...)
  public categoryJson; //Gets the post JSON of the selected categories
  public cardKey; //Gets the JSON Key of a card
  public individualPostInfo; //Gets the JSON of said cardKey
  public comments;
  processing = false;

  currentUsername = this.username.asObservable();

  constructor() {}

  changeUsername(message: string) {
    this.username.next(message);
  }


  postComment(comment,key) {

    firebase.push(
      '/comments',
      {
        'body': comment,
        'postID': key,
      }
  ).then(
      (result) => {
        if(result){
          
          alert("Post Created!");
        }
      }
  ).catch(error => alert(error));

  }
}

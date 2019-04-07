import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
const firebase = require("nativescript-plugin-firebase");
import {LoadingIndicator} from "nativescript-loading-indicator";
var loader = new LoadingIndicator();

@Injectable()
export class DataService {
  private username = new BehaviorSubject("default message");

  //public json; //Used in main menu, gets all the jsons in posts
  public category; // Gets the name of the category (Ex: CCOM, COMU, etc...)
  public categoryJson; //Gets the post JSON of the selected categories
  public cardKey; //Gets the JSON Key of a card
  public individualPostInfo; //Gets the JSON of said cardKey
  public comments;
  public email;
  processing = false;

   options = { //Loader options across all the app
    message: 'Loading...',
    progress: 0.65,
    android: {
      indeterminate: true,
      cancelable: true,
      cancelListener: function(dialog) { console.log("Loading cancelled") },
      max: 100,
      progressNumberFormat: "%1d/%2d",
      progressPercentFormat: 0.53,
      progressStyle: 1,
      secondaryProgress: 1
    },
    ios: {
      details: "Additional detail note!",
      margin: 10,
      dimBackground: true,
      color: "#4B9ED6", // color of indicator and labels
      // background box around indicator
      // hideBezel will override this if true
      backgroundColor: "yellow",
      userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
      hideBezel: true, // default false, can hide the surrounding bezel
       // Target view to show on top of (Defaults to entire window)
      // see iOS specific options below
    }
  };

  

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

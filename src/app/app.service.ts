import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class DataService {
  private username = new BehaviorSubject("default message");

  public json; //Used in main menu, gets all the jsons in posts
  public category; // Gets the name of the category (Ex: CCOM, COMU, etc...)
  public categoryJson; //Gets the post JSON of the selected categories
  public cardKey; //Gets the JSON Key of a card
  public individualPostInfo; //Gets the JSON of said cardKey
  public comments;

  currentUsername = this.username.asObservable();

  constructor() {}

  changeUsername(message: string) {
    this.username.next(message);
  }

  posts() {
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

    firebase
      .getValue("/posts")
      .then(result => (this.json = JSON.parse(JSON.stringify(result))))
      .catch(error => console.log("Error: " + error));
  }

  post_category() {
    //Gets category selected and displays posts with said category
    console.log(this.category);

    var onQueryEvent = result => {
      // note that the query returns 1 match at a time
      // in the order specified in the query
      if (!result.error) {
        //this.categoryJson = JSON.stringify(result.value);

        this.categoryJson = JSON.parse(JSON.stringify(result)); //sets the category to a variable
      }
    };

    firebase.query(onQueryEvent, "/posts", {
      // set this to true if you want to check if the value exists or just want the event to fire once
      // default false, so it listens continuously.
      // Only when true, this function will return the data in the promise as well!
      singleEvent: true,
      orderBy: {
        type: firebase.QueryOrderByType.CHILD,
        value: "category" // mandatory when type is 'child'
      },
      ranges: [
        {
          type: firebase.QueryRangeType.START_AT,
          value: this.category
        },
        {
          type: firebase.QueryRangeType.END_AT,
          value: this.category
        }
      ],

      limit: {
        type: firebase.QueryLimitType.LAST,
        value: 5
      }
    });
  }

  viewPost() {
    firebase
      .getValue("/posts/" + this.cardKey)
      .then(
        result => (this.individualPostInfo = JSON.parse(JSON.stringify(result)))
      )
      .catch(error => console.log("Error: " + error));
    console.log(this.individualPostInfo);
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

  loadcomments(postKey){
    var onQueryEvent = result => {
      // note that the query returns 1 match at a time
      // in the order specified in the query
      if (!result.error) {
        //this.categoryJson = JSON.stringify(result.value);

        this.comments = JSON.parse(JSON.stringify(result)); //sets the category to a variable
      }
    };

    firebase.query(onQueryEvent, "/comments", {
      // set this to true if you want to check if the value exists or just want the event to fire once
      // default false, so it listens continuously.
      // Only when true, this function will return the data in the promise as well!
      singleEvent: true,
      orderBy: {
        type: firebase.QueryOrderByType.CHILD,
        value: "postID" // mandatory when type is 'child'
      },
      range:
        {
          type: firebase.QueryRangeType.EQUAL_TO,
          value: postKey
        },
        
      

      limit: {
        type: firebase.QueryLimitType.LAST,
        value: 5
      }
    });

  }
}

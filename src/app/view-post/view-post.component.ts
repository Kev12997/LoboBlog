import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
const firebase = require("nativescript-plugin-firebase");
var dialogs = require("tns-core-modules/ui/dialogs");


import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from "tns-core-modules/application";
import { DataService } from "../app.service";

import {Page} from 'tns-core-modules/ui/page';
import {Router} from "@angular/router";
import { TextField } from 'tns-core-modules/ui/text-field';

import { CardView } from 'nativescript-cardview';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { GridLayout,GridUnitType, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import { Label } from 'tns-core-modules/ui/label';



import application = require("tns-core-modules/application");



@Component({
  selector: 'ns-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
  moduleId: module.id,
})
export class ViewPostComponent implements OnInit {
  isNavVisible:boolean = false;
  isItemVisible:boolean = false;
  public drawer: RadSideDrawer;
  public actionBarTitle;
  public title;
  public body;
  public user_email;
  public comment;
  public key;
  public postComments;
  public likes;
  public userDetailsJson = {};
  processing;

  @ViewChild('textFId') textFieldComment : ElementRef; 
  @ViewChild('mainStack') mainStackLayout : ElementRef; 
  post: any;
  public jsons = [];

  constructor(private router: Router, private page: Page, private data: DataService) { }

  ngOnInit() {
    if (application.ios) {
      this.page.ios.navigationItem.hidesBackButton = true
       this.isNavVisible = false;
       this.isItemVisible = true;
       
   } else if (application.android) {
       this.isNavVisible = true;
       this.isItemVisible = false;
   }
    this.drawer = <RadSideDrawer>getRootView();
    
    
      
    this.loadPost();
    
    
    

  }

  public openDrawer(){
    this.drawer.showDrawer();
    console.log(this.comment);
    
  }

  public postComment(){
    dialogs.prompt({
      title: "Comment",
      message: "Write a comment!",
      okButtonText: "Post Comment",
      cancelButtonText: "Cancel",
      inputType: dialogs.inputType.TextField
  }).then( (r) => {
     
      this.data.postComment(r.text, this.key);
  });
   
    
  }

  public loadPost(){
    //loader.show(this.data.options);
    firebase
    .getValue("/posts/" + this.data.cardKey)
    .then(
      result => 
      {
        (this.data.individualPostInfo = JSON.parse(JSON.stringify(result)))
        console.log(this.data.individualPostInfo);
        this.actionBarTitle = this.data.individualPostInfo.value.category;
        this.title = this.data.individualPostInfo.value.title;
        this.body = this.data.individualPostInfo.value.body;
        this.user_email = this.data.individualPostInfo.value.user_email;
        this.key = this.data.individualPostInfo.key;
        this.likes = this.data.individualPostInfo.value.likes;
        
        this.loadComments();
        //loader.hide(); 
      }
    )
    .catch(error => console.log("Error: " + error));
    


    

  }

  public loadComments(){

    var onQueryEvent = result => {
      // note that the query returns 1 match at a time
      // in the order specified in the query
      if (!result.error) {
        //this.categoryJson = JSON.stringify(result.value);

        this.postComments = JSON.parse(JSON.stringify(result)); //sets the category to a variable
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
          value: this.key
        },
      limit: {
        type: firebase.QueryLimitType.LAST,
        value: 5
      }
    }).then( (result) => {

      (this.post = JSON.parse(JSON.stringify(result)))
      Object.keys(this.post.value).forEach(key => { //iterate on each value attribute
      this.post.value[key]['key']=key;
      this.jsons.push(this.post.value[key]);
      });
    });

  }

  public like(){
    var onQueryEvent = function(result) {
      // note that the query returns 1 match at a time
      // in the order specified in the query
      if (!result.error) {
          //console.log(result);
      } 
  };

  
  
  

  firebase.query(onQueryEvent, "/user_detail", {
    // set this to true if you want to check if the value exists or just want the event to fire once
    // default false, so it listens continuously.
    // Only when true, this function will return the data in the promise as well!
    singleEvent: true,
    orderBy: {
      type: firebase.QueryOrderByType.CHILD,
      value: "email" // mandatory when type is 'child'
    },
    range:
      {
        type: firebase.QueryRangeType.EQUAL_TO,
        value: this.data.email
      },
    limit: {
      type: firebase.QueryLimitType.LAST,
      value: 1
    }
  }).then( (result) => {
     console.log(result);
  Object.keys(result.value).forEach(key => { //iterate on each value attribute
    var likes = result.value[key].likedPosts;
    firebase.query(onQueryEvent, "/user_detail/"+ key +"/likedPosts", {
      // set this to true if you want to check if the value exists or just want the event to fire once
      // default false, so it listens continuously.
      // Only when true, this function will return the data in the promise as well!
      singleEvent: true,
      orderBy: {
        type: firebase.QueryOrderByType.CHILD,
        value: "postKey" // mandatory when type is 'child'
      },
      range:
        {
          type: firebase.QueryRangeType.EQUAL_TO,
          value: this.data.cardKey
        },
      limit: {
        type: firebase.QueryLimitType.LAST,
        value: 1
      }
    }).then((result) => {
      if(Object.keys(result.value).length == 0){
        firebase.query(onQueryEvent, "/user_detail/"+ key +"/dislikedPosts", {
          // set this to true if you want to check if the value exists or just want the event to fire once
          // default false, so it listens continuously.
          // Only when true, this function will return the data in the promise as well!
          singleEvent: true,
          orderBy: {
            type: firebase.QueryOrderByType.CHILD,
            value: "postKey" // mandatory when type is 'child'
          },
          range:
            {
              type: firebase.QueryRangeType.EQUAL_TO,
              value: this.data.cardKey
            },
          limit: {
            type: firebase.QueryLimitType.LAST,
            value: 1
          }
        }).then((result)=>
        {
          Object.keys(result.value).forEach(delKey => {
          firebase.remove("/user_detail/"+key+"/dislikedPosts/" + delKey);
          })
        }
        )

        firebase.push("/user_detail/"+ key +"/likedPosts",
          {
            'postKey': this.data.cardKey
          }
        )
        var path;
    path = "/posts/" + this.key + "/likes";
    firebase.transaction(path, (currentValue => {
      if (currentValue === null) {
        return 0;
      } else {
        return ++currentValue; // Increment the current value. Do not try to increment currentValue if its NaN!
      }
    }))
     .then((result) => {
       console.log("Succes");
       firebase.getValue(path)
      .then(result => {
        var json;
        console.log(JSON.stringify(result))
        json = JSON.parse(JSON.stringify(result))
        this.likes = json.value;
      }
        )
      .catch(error => console.log("Error: " + error));
      }).catch(err => console.log("Encountered an error " + err));
      }
    })
          
    
  });
  }).catch((error) => console.log(error));

    
    
  }

  public dislike(){

    var onQueryEvent = function(result) {
      // note that the query returns 1 match at a time
      // in the order specified in the query
      if (!result.error) {
          //console.log(result);
      } 
  };

  firebase.query(onQueryEvent, "/user_detail", {
    // set this to true if you want to check if the value exists or just want the event to fire once
    // default false, so it listens continuously.
    // Only when true, this function will return the data in the promise as well!
    singleEvent: true,
    orderBy: {
      type: firebase.QueryOrderByType.CHILD,
      value: "email" // mandatory when type is 'child'
    },
    range:
      {
        type: firebase.QueryRangeType.EQUAL_TO,
        value: this.data.email
      },
    limit: {
      type: firebase.QueryLimitType.LAST,
      value: 1
    }
  }).then( (result) => {
     console.log(result);
  Object.keys(result.value).forEach(key => { //iterate on each value attribute
    
    firebase.query(onQueryEvent, "/user_detail/"+ key +"/dislikedPosts", {
      // set this to true if you want to check if the value exists or just want the event to fire once
      // default false, so it listens continuously.
      // Only when true, this function will return the data in the promise as well!
      singleEvent: true,
      orderBy: {
        type: firebase.QueryOrderByType.CHILD,
        value: "postKey" // mandatory when type is 'child'
      },
      range:
        {
          type: firebase.QueryRangeType.EQUAL_TO,
          value: this.data.cardKey
        },
      limit: {
        type: firebase.QueryLimitType.LAST,
        value: 1
      }
    }).then((result) => {
      if(Object.keys(result.value).length == 0){
        firebase.query(onQueryEvent, "/user_detail/"+ key +"/likedPosts", {
          // set this to true if you want to check if the value exists or just want the event to fire once
          // default false, so it listens continuously.
          // Only when true, this function will return the data in the promise as well!
          singleEvent: true,
          orderBy: {
            type: firebase.QueryOrderByType.CHILD,
            value: "postKey" // mandatory when type is 'child'
          },
          range:
            {
              type: firebase.QueryRangeType.EQUAL_TO,
              value: this.data.cardKey
            },
          limit: {
            type: firebase.QueryLimitType.LAST,
            value: 1
          }
        }).then((result)=>
        {
          Object.keys(result.value).forEach(delKey => {
          firebase.remove("/user_detail/"+key+"/likedPosts/" + delKey);
          })
        }
        )
        firebase.push("/user_detail/"+ key +"/dislikedPosts",
          {
            'postKey': this.data.cardKey
          }
        )
        var path;
    path = "/posts/" + this.key + "/likes";
    firebase.transaction(path, (currentValue => {
      if (currentValue === null) {
        return 0;
      } else {
        return --currentValue; // Increment the current value. Do not try to increment currentValue if its NaN!
      }
    }))
     .then((result) => {
       console.log("Succes");

       firebase.getValue(path)
      .then(result => {
        var json;
        console.log(JSON.stringify(result))
        json = JSON.parse(JSON.stringify(result))
        this.likes = json.value;
      }
        )
      .catch(error => console.log("Error: " + error));


      }).catch(err => console.log("Encountered an error " + err));
      }
    })
          
    
  });
  }).catch((error) => console.log(error));
    
    
    
  }


}
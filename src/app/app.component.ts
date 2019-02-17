import { Component } from "@angular/core";
import {Router} from "@angular/router";// includes router navigation
const firebase = require("nativescript-plugin-firebase"); //includes firebase plugin

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { 
    
    constructor(){
        firebase.init({// initialized firebase, this function is a listener, knows when a user is logged in or not
            onAuthStateChanged: function(data,router: Router) { // optional but useful to immediately re-logon the user when he re-visits your app
              console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
              if (data.loggedIn) {
                  
                console.log("user's email address: " + (data.user.email ? data.user.email : "N/A")); // Prints in console logged in user's email
              }
            }
          });
    }
}

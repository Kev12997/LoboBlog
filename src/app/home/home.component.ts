import { Component, OnInit } from "@angular/core";
import { TextField } from "tns-core-modules/ui/text-field";
import {Router} from "@angular/router";// includes router navigation


const firebase = require("nativescript-plugin-firebase"); //includes firebase plugin


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) {
        // Use the component constructor to inject providers.
        firebase.init({// initialized firebase, this function is a listener, knows when a user is logged in or not
            onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
              console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
              if (data.loggedIn) {
                console.log("user's email address: " + (data.user.email ? data.user.email : "N/A")); // Prints in console logged in user's email
              }
            }
          });
    }

    ngOnInit(): void {
        
        // Init your component properties here.
        
    }

    

    public submit(textEmail, textPassword){
        //this.router.navigate(['/homepage']);
        firebase.login( // logs in user
          {
            type: firebase.LoginType.PASSWORD, //the type of login by the plugin
            passwordOptions: {
              email: textEmail, //textEmail and textPassword come from the html component
              password: textPassword
            }
          })
          .then(this.router.navigate(['homepage'])) //after the function starts navigates to the homepage NOTE: THIS ALWAYS RUNS! NEEDS TO BE FIXED
          .catch(error => console.log(error)); // Passes error to console

          

              
    }

    public logout(){
      firebase.logout();//Logouts user from whatever methos hes logged in, gives console error cause facebook is not initialized
    }

    public submitSignUp(){
      this.router.navigate(['signUp']); // navigates to sign up page
          
    }
}

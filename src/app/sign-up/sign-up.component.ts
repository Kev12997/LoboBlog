import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";

const firebase = require("nativescript-plugin-firebase"); //needed to use firebase plugin

@Component({
  selector: 'ns-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  moduleId: module.id,
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public submitLogin(){
    this.router.navigate(['home']); //Navigate  back to login page
  }

  public submit(email, password){   //gets user email and password to create an account
    firebase.createUser({
      email: email,
      password: password
    }).then(this.router.navigate(['homepage'])).then( 
      
        function (user) { //succes dialog
         
          dialogs.alert({ //Dialogs: imported function, displays pop up dialog
            title: "User created", // title of the dialog
            message: "email: " + user.email, // dialog content
            okButtonText: "Nice!" //Text of dialog button
          })
          

          
        },
        function (errorMessage) { // error dialog
          dialogs.alert({
            title: "No user created",
            message: errorMessage,
            okButtonText: "OK, got it"
          })
        }
    );
  }

}
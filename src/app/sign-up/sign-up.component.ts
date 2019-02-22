import { Component, OnInit } from '@angular/core';
import {Page} from 'tns-core-modules/ui/page';

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

  constructor(private router: Router, private page: Page) { 

  }

  ngOnInit() {
    //this.page.backgroundColor = '#ffffa3';
  }

  public submitLogin(){
    this.router.navigate(['home']); //Navigate  back to login page
  }

  public submit(email, password){   //gets user email and password to create an account
    firebase.createUser({
      email: email,
      password: password
    }).then( 
      
         (user) => { //succes dialog
         
          dialogs.alert({ //Dialogs: imported function, displays pop up dialog
            title: "User created", // title of the dialog
            message: "email: " + user.email + "\nYou are now logged in!", // dialog content
            okButtonText: "Nice!" //Text of dialog button
          })
          this.router.navigate(['homepage']);
          

          
        },
         (errorMessage) => { // error dialog
          dialogs.alert({
            title: "No user created",
            message: errorMessage,
            okButtonText: "OK, got it"
          })
        }
    );
  }

}

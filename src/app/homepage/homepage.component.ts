import { Component, OnInit } from '@angular/core';
import { BindingOptions } from "tns-core-modules/ui/core/bindable";
import {Router} from "@angular/router";

const firebase = require("nativescript-plugin-firebase");





@Component({
  selector: 'ns-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  moduleId: module.id,
})
export class HomepageComponent implements OnInit {

  username: String = "Test" // username is from the html 2 way binding, here im setting it to a string 

  

  constructor() { 
    
  }

  ngOnInit() {
    firebase.getCurrentUser() // my idea here was to get the current user thats logged in and put the email in the action bar, giving problems
                              // hence why I declared username as Test at the top
    .then(user => alert("User Email: " + user.email))
    .catch(error => console.log("Trouble in paradise: " + error)) //logged in error message

    
  }


  



}

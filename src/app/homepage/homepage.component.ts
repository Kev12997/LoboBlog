import { Component, OnInit } from '@angular/core';
import {Page} from 'tns-core-modules/ui/page';
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

  

  constructor(private router: Router, private page: Page) {

    
    
  }

  ngOnInit() {
     // my idea here was to get the current user thats logged in and put the email in the action bar, giving problems
                              // hence why I declared username as Test at the top
    
     

    
  }


  public onTap(){
    firebase.logout();//Logouts user from whatever methos hes logged in, gives console error cause facebook is not initialized
    this.router.navigate(['home']);
    alert("Logged out from account");
  }

  

  


  



}

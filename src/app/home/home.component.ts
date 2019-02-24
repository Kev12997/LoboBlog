import { Component, OnInit, Output, EventEmitter  } from "@angular/core";
import {Page} from 'tns-core-modules/ui/page'; //

import { TextField } from "tns-core-modules/ui/text-field";
import {Router} from "@angular/router";// includes router navigation
import { routerNgProbeToken } from "@angular/router/src/router_module";
const firebase = require("nativescript-plugin-firebase"); //includes firebase plugin

import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
import { DataService } from "../app.service";

// and later during the page initialization







@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  
  public drawer: RadSideDrawer;
  
  

    constructor(private router: Router, private page: Page, private data: DataService) {
        // Use the component constructor to inject providers.
        
    }

    ngOnInit(): void {
      setTimeout(() => {
        this.drawer = <RadSideDrawer>getRootView();
        this.drawer.gesturesEnabled = false; 
    }, 100);
        
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
          }).then(
            (user) => {
              var letter;
              this.router.navigate(['homepage']); //after the function starts navigates to the homepage
              letter = this.capitalLetter(user.email)
              letter = letter.substring(0,letter.indexOf("."));
              this.data.changeUsername(letter)
            } 
          )
          .catch(error => alert(error)); // Passes error to console

          

          

              
    }

    

    public submitSignUp(){
      this.router.navigate(['signUp']); // navigates to sign up page
          
    }

    public capitalLetter(string) 
    {
        return string.charAt(0).toUpperCase() + string.slice(1);  //Function to turn a string to capital first letter
    }
}

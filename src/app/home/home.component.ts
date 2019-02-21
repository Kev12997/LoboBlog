import { Component, OnInit } from "@angular/core";
import {Page} from 'tns-core-modules/ui/page'; //

import { TextField } from "tns-core-modules/ui/text-field";
import {Router} from "@angular/router";// includes router navigation
import { routerNgProbeToken } from "@angular/router/src/router_module";
const firebase = require("nativescript-plugin-firebase"); //includes firebase plugin




@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    constructor(private router: Router, private page: Page) {
        // Use the component constructor to inject providers.
        
    }

    ngOnInit(): void {
        
        // Init your component properties here.
        this.page.backgroundColor = '#ffffa3';
        
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
              this.router.navigate(['homepage']); //after the function starts navigates to the homepage
            } 
          )
          .catch(error => alert(error)); // Passes error to console

          

          

              
    }

    

    public submitSignUp(){
      this.router.navigate(['signUp']); // navigates to sign up page
          
    }
}

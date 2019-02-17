import { Component, OnInit } from "@angular/core";
import { TextField } from "tns-core-modules/ui/text-field";
import {Router} from "@angular/router";// includes router navigation
import { routerNgProbeToken } from "@angular/router/src/router_module";
const firebase = require("nativescript-plugin-firebase"); //includes firebase plugin




@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) {
        // Use the component constructor to inject providers.
        
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
          }).then(
            (user) => {
              this.router.navigate(['homepage']);
            } 
          )
          
            
        //after the function starts navigates to the homepage NOTE: THIS ALWAYS RUNS! NEEDS TO BE FIXED
          .catch(error => console.log(error)); // Passes error to console

          

          

              
    }

    public logout(){
      firebase.logout();//Logouts user from whatever methos hes logged in, gives console error cause facebook is not initialized
    }

    public submitSignUp(){
      this.router.navigate(['signUp']); // navigates to sign up page
          
    }
}

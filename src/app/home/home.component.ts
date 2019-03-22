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
import { Image } from "tns-core-modules/ui/image";

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
        // this.page.backgroundImage = "res://lobo";
        // let pageCss = ".image{background-repeat: no-repeat;background-position: center;background-size: cover;}";
        // this.page.css = pageCss;
        this.drawer = <RadSideDrawer>getRootView();
        this.drawer.gesturesEnabled = false; 
    }, 100);
        
    }

    

    public submit(){
     
        //this.router.navigate(['/homepage']);
        firebase.login( // logs in user
          {
            
            type: firebase.LoginType.GOOGLE, //the type of login by the plugin
            googleOptions: {
              hostedDomain: "upr.edu"
            }
          }).then(
            (user) => {
              var letter;
              this.router.navigate(['homepage']); //after the function starts navigates to the homepage
              this.data.changeUsername(user.name)
            } 
          )
          .catch(error => alert(error)); // Passes error to console 

          

          

              
    }

    

    
    public menu(){
      this.router.navigate(['homepage']); // navigates to sign up page
       
    }
}

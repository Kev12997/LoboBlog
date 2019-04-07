import { Component, OnInit } from "@angular/core";
import {Page} from 'tns-core-modules/ui/page'; //

import {Router} from "@angular/router";// includes router navigation
const firebase = require("nativescript-plugin-firebase"); //includes firebase plugin

import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from "tns-core-modules/application";
import { DataService } from "../app.service";

import {LoadingIndicator} from "nativescript-loading-indicator";
var loader = new LoadingIndicator();










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
      //loader.show(this.data.options);
     
        //this.router.navigate(['/homepage']);
        firebase.login(  // logs in user
          {
            
            type: firebase.LoginType.GOOGLE, //the type of login by the plugin
            googleOptions: {
              hostedDomain: "upr.edu"
            }
          }).then(
            (user) => {
              var onQueryEvent = result => {
                // note that the query returns 1 match at a time
                // in the order specified in the query
                if (!result.error) {
                }
              }
                firebase.query(onQueryEvent, "/user_detail", {
                  // set this to true if you want to check if the value exists or just want the event to fire once
                  // default false, so it listens continuously.
                  // Only when true, this function will return the data in the promise as well!
                  singleEvent: true,
                  orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: "email" // mandatory when type is 'child'
                  },
                  range:
                    {
                      type: firebase.QueryRangeType.EQUAL_TO,
                      value: user.email
                    },
                  limit: {
                    type: firebase.QueryLimitType.LAST,
                    value: 1
                  }
                }).then( (result) => {
                  //console.log(result)
                    if (Object.keys(result.value).length != 0){
                       
                    }else{
                      firebase.push(
                        '/user_detail/',  
                        {
                          email: user.email
                        }
                    );
                    }
                });
              
              
              this.data.email = user.email;
              this.router.navigate(['homepage']); //after the function starts navigates to the homepage
              this.data.changeUsername(user.name)
              //loader.hide();
            } 
          )
          .catch(error => alert(error)); // Passes error to console 

          

          

              
    }

    

    
    public menu(){
      this.router.navigate(['homepage']); // navigates to sign up page
       
    }
}

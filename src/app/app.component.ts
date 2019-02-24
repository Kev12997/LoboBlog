import { Component,ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, Input, Output } from "@angular/core";
import {Router} from "@angular/router";// includes router navigation
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { DataService } from "./app.service";

const firebase = require("nativescript-plugin-firebase"); //includes firebase plugin


@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements AfterViewInit, OnInit {
    username:string;

    
    constructor(private _changeDetectionRef: ChangeDetectorRef, private router: Router, private data: DataService){
        //var username;
        firebase.init({// initialized firebase, this function is a listener, knows when a user is logged in or not
            onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
              console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
              if (data.loggedIn) {
                console.log("user's email address: " + (data.user.email ? data.user.email : "N/A")); // Prints in console logged in user's email
                //username = data.user.email;
                
                
              }
            }
          });
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.data.currentUsername.subscribe(username => this.username = username)
        
    }

    public logOut(){
        firebase.logout();//Logouts user from whatever methos hes logged in, gives console error cause facebook is not initialized
        this.router.navigate(['home']);
        this.drawer.closeDrawer();
        alert("Logged out from account");
      }

      
    
      

    
}

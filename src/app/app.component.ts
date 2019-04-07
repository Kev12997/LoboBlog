import { Component,ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, Input, Output } from "@angular/core";
import {Router, RouterModule} from "@angular/router";// includes router navigation
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";//used for clear History
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { DataService } from "./app.service";

import { Location } from "@angular/common";

const firebase = require("nativescript-plugin-firebase"); //includes firebase plugin


@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements AfterViewInit, OnInit {
    username:string;

    
    constructor(location: Location, private _changeDetectionRef: ChangeDetectorRef, private router: Router, private data: DataService, private routerExtension: RouterExtensions){
        //var username;
       
       
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();

        
    }

    ngOnInit() {
      firebase.init({
        onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
            console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
            if (data.loggedIn) {
                console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
            }
            }
    })
        this.data.currentUsername.subscribe(username => this.username = username)
    
      
        
    }

    public logOut(){
        this.routerExtension.navigate(['/home'], { clearHistory: true });
        firebase.logout();//Logouts user from whatever methos hes logged in, gives console error cause facebook is not initialized
        this.drawer.closeDrawer();
        alert("Logged out from account");
      }

    public category(category){
        this.router.routeReuseStrategy.shouldReuseRoute = function(){ //Allows router reuse, works with a new setting in router module
            return false;
         }
        
        this.data.category = category;
        this.router.navigate(['category-page']);
        this.drawer.closeDrawer();
        
        
    }

    public menu(){
        this.router.navigate(['homepage']);
        this.drawer.closeDrawer();
    }

    public writePost(){
        this.router.navigate(['writePost']);
        this.drawer.closeDrawer();

    }

      
    
      

    
}

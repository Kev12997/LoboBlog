import { Component, OnInit, Input } from '@angular/core';
import {Page} from 'tns-core-modules/ui/page';
import { BindingOptions } from "tns-core-modules/ui/core/bindable";
import {Router} from "@angular/router";
const firebase = require("nativescript-plugin-firebase");

import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
import { DataService } from "../app.service";






@Component({
  selector: 'ns-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  moduleId: module.id,
})
export class HomepageComponent implements OnInit {
  username:string;
  
  public drawer: RadSideDrawer;


  

  constructor(private router: Router, private page: Page) {

    
    
  }

  ngOnInit() {
    setTimeout(() => {
        this.drawer = <RadSideDrawer>getRootView();
        this.drawer.gesturesEnabled = true; 
    }, 100);
    //firebase.getCurrentUser().then(user => this.username = user.email);
     // my idea here was to get the current user thats logged in and put the email in the action bar, giving problems
                              // hence why I declared username as Test at the top
    
     

    
  }



  public openDrawer(){
    this.drawer.showDrawer();
}

  

  


  



}

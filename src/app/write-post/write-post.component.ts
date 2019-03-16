import { Component, OnInit } from '@angular/core';
import { firestore } from "nativescript-plugin-firebase";
const firebase = require("nativescript-plugin-firebase");
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
import { DataService } from "../app.service";
import {Page} from 'tns-core-modules/ui/page';
import {Router} from "@angular/router";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";


@Component({
  selector: 'ns-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css'],
  moduleId: module.id,
})
export class WritePostComponent implements OnInit {
  public drawer: RadSideDrawer;
  public selectedIndex = null;
  public items: Array<string>;
  public selectedCategory;
  public author;   
  public bodyText;
  public titleText;
  public email;

  constructor(private router: Router, private page: Page, private data: DataService) { 
    this.items = ["CCOM", "COMU","ADEM","BIOL","SIFI","ESPA","ENGL","CISO", "HUMA", "FISI","ENFER"];
    this.selectedCategory = this.items[0];  
    firebase.getCurrentUser()
    .then(user => this.email = user.email);
   
  }

  ngOnInit() {
    this.drawer = <RadSideDrawer>getRootView();
  }

  public openDrawer(){
    this.drawer.showDrawer();
  }

  public onchange(args: SelectedIndexChangedEventData) {
    this.selectedCategory = this.items[args.newIndex];
}

  public post(){
    firebase.push(
      '/posts',
      {
        'title': this.titleText,
        'body': this.bodyText,
        'category': this.selectedCategory,
        'user_email': this.email,
        'likes': 0,
      }
  ).then(
      (result) => {
        if(result){
          this.router.navigate(['homepage']);
          alert("Post Created!");
        }
      }
  ).catch(error => alert(error));
  

  }

  


}

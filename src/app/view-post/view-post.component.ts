import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
const firebase = require("nativescript-plugin-firebase");


import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
import { DataService } from "../app.service";

import {Page} from 'tns-core-modules/ui/page';
import { BindingOptions } from "tns-core-modules/ui/core/bindable";
import {Router} from "@angular/router";
import { ActionBar } from 'tns-core-modules/ui/action-bar';
import { TextField } from 'tns-core-modules/ui/text-field';

import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { GridLayout,GridUnitType, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import { Label } from 'tns-core-modules/ui/label';

import application = require("tns-core-modules/application");



@Component({
  selector: 'ns-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
  moduleId: module.id,
})
export class ViewPostComponent implements OnInit {
  isNavVisible:boolean = false;
  isItemVisible:boolean = false;
  public drawer: RadSideDrawer;
  public actionBarTitle;
  public title;
  public body;
  public user_email;
  public comment;
  public key;
  @ViewChild('textFId') textFieldComment : ElementRef; 
  @ViewChild('mainStack') mainStackLayout : ElementRef; 

  constructor(private router: Router, private page: Page, private data: DataService) { }

  ngOnInit() {
    if (application.ios) {
      this.page.ios.navigationItem.hidesBackButton = true
       this.isNavVisible = false;
       this.isItemVisible = true;
       
   } else if (application.android) {
       this.isNavVisible = true;
       this.isItemVisible = false;
   }
    this.drawer = <RadSideDrawer>getRootView();
    this.data.viewPost();
    setTimeout( () => {
      
      this.actionBarTitle = this.data.individualPostInfo.value.category;
      this.title = this.data.individualPostInfo.value.title;
      this.body = this.data.individualPostInfo.value.body;
      this.user_email = this.data.individualPostInfo.value.user_email;
      this.key = this.data.individualPostInfo.key;
      this.data.loadcomments(this.key);
      console.log(this.data.comments);


      Object.keys(this.data.comments.value).forEach(key => {
        const card = new CardView();//create card and labels
        const lblAuth = new Label();
        const lblBody = new Label();

        

        let pageCSS = ".title { font-size: 30; font-weight: bold;} .body{ font-size: 20;} .background { background-color: white;}";

        lblBody.text = this.data.comments.value[key].body;
        lblBody.className = "body";
        lblBody.marginLeft = 20;
        
        card.className = "background";
        card.elevation=10;
        card.marginBottom = 5;
        card.marginTop=5;
        card.radius=5;
        card.height = 200;
        card.ripple = true;
        
        const inGrid = new GridLayout(); //Create grid layout

        //EVERY CARD HAS A GRID LAYOUT INSIDE OF IT 

        card.content = inGrid; //add the layout inside the card
        inGrid.addChild(lblBody);//add labels to grid layout
        // inGrid.addChild(lblTitle);
        // inGrid.addChild(lblbody);

        inGrid.addColumn(new ItemSpec(1, GridUnitType.STAR)); //Layout properties
        inGrid.addColumn(new ItemSpec(1, GridUnitType.AUTO));
        inGrid.addColumn(new ItemSpec(1, GridUnitType.AUTO));

        inGrid.addRow(new ItemSpec(1, GridUnitType.AUTO));
        inGrid.addRow(new ItemSpec(1, GridUnitType.AUTO));
        inGrid.addRow(new ItemSpec(1, GridUnitType.AUTO));
        

        //GridLayout.setRow(lblCat, 0);//collums and rows of each grid element
        // GridLayout.setRow(lblTitle, 0);
         GridLayout.setRow(lblBody, 1);

        // GridLayout.setColumn(lblCat, 1)
        // GridLayout.setColumn(lblTitle, 0);
        GridLayout.setColumn(lblBody, 0);

        let stack = <StackLayout>this.mainStackLayout.nativeElement;
        
        stack.addChild(card);//add the card to the XML stackLayout

      } )




    }, 1000);
    
    

  }

  public openDrawer(){
    this.drawer.showDrawer();
    console.log(this.comment);
    
  }

  public postComment(){
    let tfElement = <TextField>this.textFieldComment.nativeElement;
    tfElement.text = "";
    this.data.postComment(this.comment, this.key);
  }

}
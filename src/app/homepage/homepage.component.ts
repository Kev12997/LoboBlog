import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { Observable, EventData } from "tns-core-modules/data/observable";
import {Page} from 'tns-core-modules/ui/page';
import { BindingOptions } from "tns-core-modules/ui/core/bindable";
import {Router} from "@angular/router";
import { firestore } from "nativescript-plugin-firebase";
const firebase = require("nativescript-plugin-firebase");


import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
import { DataService } from "../app.service";


import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { GridLayout,GridUnitType, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import { Label } from 'tns-core-modules/ui/label';
import { stringify } from '@angular/core/src/render3/util';


registerElement('CardView', () => CardView);

@Component({ 
  selector: 'ns-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  moduleId: module.id,
})
export class HomepageComponent implements OnInit  {
  post;
  @ViewChild('stack') stack : StackLayout;
  username:string;
  
  public drawer: RadSideDrawer;
  


  

  constructor(private router: Router, private page: Page, private data: DataService) {
    
    
    
    
  }
  
  

  ngOnInit() {
    
        this.drawer = <RadSideDrawer>getRootView();
        this.drawer.gesturesEnabled = true; 
        const stack = <StackLayout>this.page.getViewById("outStack");
        
        
    
    this.data.posts(); //Call function in app.service to get post data
    setTimeout( () => {
      this.post = this.data.json;// assign to local variable
      //console.log(this.post);

      Object.keys(this.post.value).forEach(key => { //iterate on each value attribute

        const card = new CardView();//create card and labels
        const lblbody = new Label();
        const lblTitle = new Label();
        const lblCat = new Label();

        lblCat.horizontalAlignment = "right";
        let pageCSS = ".title { font-size: 30; font-weight: bold;} .body{ font-size: 20;}";
        this.page.css = pageCSS;
        lblCat.text = this.post.value[key].category; //value is json content, key acts as sub number 
        lblCat.className = "category";
        lblbody.text = this.post.value[key].body;
        lblbody.className = "body";
        lblbody.marginLeft = 20;
        lblTitle.text = this.post.value[key].title;
        lblTitle.className = "title";
        lblbody.style.verticalAlignment = "middle";
        card.elevation=10;
        card.marginBottom = 5;
        card.marginTop=5;
        card.radius=5;
        card.height = 200;
        card.ripple = true;
        card.notify({ eventName: "tap", object: card});
        card.on("tap", (eventData) => {
          this.cardTap(key);
        })
        
        
        
        const inGrid = new GridLayout(); //Create grid layout

        

        card.content = inGrid; //add the layout inside the card
        inGrid.addChild(lblCat);//add labels to grid layout
        inGrid.addChild(lblTitle);
        inGrid.addChild(lblbody);

        inGrid.addColumn(new ItemSpec(1, GridUnitType.STAR)); //Layout properties
        inGrid.addColumn(new ItemSpec(1, GridUnitType.AUTO));
        inGrid.addColumn(new ItemSpec(1, GridUnitType.AUTO));

        inGrid.addRow(new ItemSpec(1, GridUnitType.AUTO));
        inGrid.addRow(new ItemSpec(1, GridUnitType.AUTO));
        inGrid.addRow(new ItemSpec(1, GridUnitType.AUTO));
        

        GridLayout.setRow(lblCat, 0);//collums and rows of each grid element
        GridLayout.setRow(lblTitle, 0);
        GridLayout.setRow(lblbody, 1);

        GridLayout.setColumn(lblCat, 1)
        GridLayout.setColumn(lblTitle, 0);
        GridLayout.setColumn(lblbody, 0);
        
        stack.addChild(card);//add the card to the XML stackLayout
        
        
      });

      

    }, 1000);

    
   
    
    
    
  }



    public openDrawer(){
      this.drawer.showDrawer();
  }
  
  public pageLoaded(){
    //console.log(this.body);
    
  }
  
  public cardTap(key){
    this.data.cardKey = key;
    this.router.navigate(['viewPost']);
  }


  

  


  



}

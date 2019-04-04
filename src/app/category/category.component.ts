import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {Page} from 'tns-core-modules/ui/page';
import {Router} from "@angular/router";

import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from "tns-core-modules/application";
import { DataService } from "../app.service";

import { CardView } from 'nativescript-cardview';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { GridLayout,GridUnitType, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import { Label } from 'tns-core-modules/ui/label';
import application = require("tns-core-modules/application");
const firebase = require("nativescript-plugin-firebase");
import {LoadingIndicator} from "nativescript-loading-indicator";
var loader = new LoadingIndicator();



@Component({
  selector: 'ns-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  moduleId: module.id,
})
export class CategoryComponent implements OnInit {
  isNavVisible:boolean = false;
  isItemVisible:boolean = false;

  category; //Used for the name of the category selected
  categoryPost; //Used to get the Json locally

  public drawer: RadSideDrawer;
  public categoryJson;

  @ViewChild('stack') stack : ElementRef; //Locates local stack in xml
  

  constructor(private router: Router, private page: Page, private data: DataService) { }

  ngOnInit() {
    if (application.ios) { //Detecs os and selects action bar items to display     
       this.isNavVisible = false;
       this.isItemVisible = true;
       this.page.ios.navigationItem.hidesBackButton = true
   } else if (application.android) {
       this.isNavVisible = true;
       this.isItemVisible = false;
   }
    
    this.category = this.data.category;
    this.drawer = <RadSideDrawer>getRootView();
    this.drawer.gesturesEnabled = true; 
    const stack = <StackLayout>this.page.getViewById("outStack");


    this.postByCategory();


  }
  public openDrawer(){
    this.drawer.showDrawer(); //Opens side menu
}

public cardTap(key){
  this.data.cardKey = key; //Gives selected card JSON Ket to the aplication service
  this.router.navigate(['viewPost']); //Navigates to the Post page
}

  public postByCategory(){

    //Gets category selected and displays posts with said category
    console.log(this.category);

    var onQueryEvent = result => {
      // note that the query returns 1 match at a time
      // in the order specified in the query
      if (!result.error) {
        //this.categoryJson = JSON.stringify(result.value);

        this.categoryJson = JSON.parse(JSON.stringify(result)); //sets the category to a variable
      }
    };

    firebase.query(onQueryEvent, "/posts", {
      // set this to true if you want to check if the value exists or just want the event to fire once
      // default false, so it listens continuously.
      // Only when true, this function will return the data in the promise as well!
      singleEvent: true,
      orderBy: {
        type: firebase.QueryOrderByType.CHILD,
        value: "category" // mandatory when type is 'child'
      },
      ranges: [
        {
          type: firebase.QueryRangeType.START_AT,
          value: this.category
        },
        {
          type: firebase.QueryRangeType.END_AT,
          value: this.category
        }
      ],

      limit: {
        type: firebase.QueryLimitType.LAST,
        value: 5
      }
    }).then( () => {
      console.log(this.categoryJson.value)
      if(this.categoryJson.value){

      Object.keys(this.categoryJson.value).forEach(key => { //iterate on each value attribute
        

        const card = new CardView();//create card and labels
        const lblbody = new Label();
        const lblTitle = new Label();
        const lblCat = new Label();

        lblCat.horizontalAlignment = "right";

        let pageCSS = ".title { font-size: 30; font-weight: bold;} .body{ font-size: 20;} .background { background-color: white;}"; //CSS for page
        this.page.css = pageCSS;

        lblCat.text = this.categoryJson.value[key].category; //value is json content, key acts as sub number 
        lblCat.className = "category";
        lblbody.text = this.categoryJson.value[key].body;
        lblbody.className = "body";
        lblbody.marginLeft = 20;
        lblTitle.text = this.categoryJson.value[key].title;
        lblTitle.className = "title";
        lblbody.style.verticalAlignment = "middle";

        card.className = "background";
        card.elevation=10;
        card.marginBottom = 5;
        card.marginTop=5;
        card.radius=5;
        card.height = 200;
        card.ripple = true;

        card.notify({ eventName: "tap", object: card}); //Add tap event to every card
        card.on("tap", (eventData) => {
          this.cardTap(key);
        })
        
        const inGrid = new GridLayout(); //Create grid layout


        //EVERY CARD HAS A GRID LAYOUT INSIDE OF IT 

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
        
        let stack = <StackLayout>this.stack.nativeElement;
        stack.addChild(card);//add the card to the XML stackLayout
        
        
        
      });

    }else{
      console.log("No result");
    }
  }

    ).catch( (error) => {
      console.log(error);
      
    });

  }



}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Page} from 'tns-core-modules/ui/page';
import {Router} from "@angular/router";



import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from "tns-core-modules/application";
import { DataService } from "../app.service";


import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { GridLayout,GridUnitType, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import { Label } from 'tns-core-modules/ui/label';

import application = require("application");


registerElement('CardView', () => CardView);

@Component({ 
  selector: 'ns-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  moduleId: module.id,
})
export class HomepageComponent implements OnInit  {
  isNavVisible:boolean = false;
  isItemVisible:boolean = false;
  
  post;

  @ViewChild('stack') stack : StackLayout;
  username:string;
  
  public drawer: RadSideDrawer;
  


  

  constructor(private router: Router, private page: Page, private data: DataService) {
    
    
    
    
  }
  
  

  ngOnInit() {
    if (application.ios) {
     // this.page.actionBarHidden
     
      this.isNavVisible = false;
      this.isItemVisible = true;
      this.page.ios.navigationItem.hidesBackButton = true
  } else if (application.android) {
      this.isNavVisible = true;
      this.isItemVisible = false;
  }
    
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

        let pageCSS = ".title { font-size: 30; font-weight: bold;} .body{ font-size: 20;} .background { background-color: white;}";
        this.page.css = pageCSS;

        lblCat.text = this.post.value[key].category; //value is json content, key acts as sub number 
        lblCat.className = "category";
        lblbody.text = this.post.value[key].body;
        lblbody.className = "body";
        lblbody.marginLeft = 20;
        lblTitle.text = this.post.value[key].title;
        lblTitle.className = "title";
        lblbody.style.verticalAlignment = "middle";

        card.className = "background";
        card.elevation=10;
        card.marginBottom = 5;
        card.marginTop=5;
        card.radius=5;
        card.height = 200;
        card.ripple = true;

        card.notify({ eventName: "tap", object: card}); //Adds tap to every card 
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
        
        stack.addChild(card);//add the card to the XML stackLayout
        
        
      });

      

    }, 1000);

    
   
    
    
    
  }



    public openDrawer(){
      this.drawer.showDrawer(); //Opends side menu
  }
  
  public pageLoaded(){
    //console.log(this.body);
    
  }
  
  public cardTap(key){
    this.data.cardKey = key; //Sends JSON key of the selected card to the data service
    this.router.navigate(['viewPost']); //navigates 
  }


  

  


  



}

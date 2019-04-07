import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import {Page} from 'tns-core-modules/ui/page';
import {Router} from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";//used for clear History




import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from "tns-core-modules/application";
import { DataService } from "../app.service";


import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { GridLayout,GridUnitType, ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout';
import { Label } from 'tns-core-modules/ui/label';

import application = require("tns-core-modules/application");
const firebase = require("nativescript-plugin-firebase");
import {LoadingIndicator} from "nativescript-loading-indicator";
var loader = new LoadingIndicator();

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
  public fruitList: Array<string> = [];
  public jsons = [];
  public keys = new Object();
  
  post;
  objectKeys;

  @ViewChild('stack') stack : ElementRef;
  username:string;
  
  public drawer: RadSideDrawer;
  


  

  constructor(private ngZone: NgZone,private router: Router, private page: Page, private data: DataService, private routerExtension: RouterExtensions) {
    
    this.fruitList.push('manzana');
    this.fruitList.push('banana');
    this.fruitList.push('ana');
    
    
    
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

        
        this.posts();
        
        
   

    
   
    
    
    
  }

  public posts(){
    
    
    //loader.show(this.data.options);
    firebase
    .getValue("/posts")
    .then(result => {
     
      (this.post = JSON.parse(JSON.stringify(result)))
      Object.keys(this.post.value).forEach(key => { //iterate on each value attribute
      this.post.value[key]['key']=key;
      this.jsons.push(this.post.value[key]);
      
      
      });
      console.log(this.jsons);

      
      

    })
    .catch(error => console.log("Error: " + error));

  }



    public openDrawer(){
      this.drawer.showDrawer(); //Opends side menu
      
      //console.log(this.post);
  }
  
  public pageLoaded(){
    //console.log(this.body);
    
  }
  
  public cardTap(key){
    this.data.cardKey = key; //Sends JSON key of the selected card to the data service
    this.ngZone.run(() => this.router.navigate(['viewPost'])).then();
    //this.router.navigate(['viewPost']); //navigates 
    //this.routerExtension.navigate(['viewPost'], { clearHistory: true });
    //console.log("test");  
  }


  

  


  



}

import { Component, OnInit } from '@angular/core';
const firebase = require("nativescript-plugin-firebase");


import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { getRootView } from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
import { DataService } from "../app.service";

import {Page} from 'tns-core-modules/ui/page';
import { BindingOptions } from "tns-core-modules/ui/core/bindable";
import {Router} from "@angular/router";

@Component({
  selector: 'ns-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
  moduleId: module.id,
})
export class ViewPostComponent implements OnInit {
  public drawer: RadSideDrawer;

  constructor(private router: Router, private page: Page, private data: DataService) { }

  ngOnInit() {
  }

  public openDrawer(){
    this.drawer.showDrawer();
  }

}

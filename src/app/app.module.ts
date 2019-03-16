import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomepageComponent } from './homepage/homepage.component';
import { SignUpComponent } from './sign-up/sign-up.component';



import {NativeScriptRouterModule} from "nativescript-angular/router";

import { DataService } from "./app.service";
import { CategoryComponent } from './category/category.component';
import { WritePostComponent } from './write-post/write-post.component';

import { DropDownModule } from "nativescript-drop-down/angular";
import { ViewPostComponent } from './view-post/view-post.component';






@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        DropDownModule
        
    
    ],
    declarations: [
        AppComponent,
        HomepageComponent,
        SignUpComponent,
        CategoryComponent,
        WritePostComponent,
        ViewPostComponent,
       
       
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        DataService
    ]
})
export class AppModule { }

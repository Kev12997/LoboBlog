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








@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptRouterModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule
        
    
    ],
    declarations: [
        AppComponent,
        HomepageComponent,
        SignUpComponent,
       
       
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        DataService
    ]
})
export class AppModule { }

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomepageComponent } from './homepage/homepage.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CategoryComponent } from './category/category.component';
import { WritePostComponent } from './write-post/write-post.component';
import { ViewPostComponent } from './view-post/view-post.component';
const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" }, 
    { path: "homepage", component: HomepageComponent},
    { path: "signUp", component: SignUpComponent},
    { path: "category-page", component: CategoryComponent},
    { path: "writePost", component: WritePostComponent},
    { path: "viewPost", component: ViewPostComponent},
    

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload'
    })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

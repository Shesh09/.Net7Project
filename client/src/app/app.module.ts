import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import{AppRoutingModule} from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavComponent } from "./nav/nav.component";
import { AppComponent } from "./app.component";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
    

NgModule({
    declarations:[
        NavComponent,
        AppComponent
    ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule
    ],
    providers:[],
    bootstrap: []
  })
  export class AppModule{}
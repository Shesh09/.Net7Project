import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HomeComponent } from "./home/home.component";



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, NavComponent, HomeComponent]
})
export class AppComponent implements OnInit{

  title = 'Dating App';
  

  constructor(private accountService: AccountService) {
    

  }
  //Conexiune intre back si front
  ngOnInit(): void {
this.setCurrentUser();
  }


  setCurrentUser(){
    const userString = localStorage.getItem("user");
      if(!userString) return;
      const user: User= JSON.parse(userString);
      this.accountService.setCurrentUser(user);
    }
  }


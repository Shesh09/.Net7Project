import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

//ng add @ng-bootstrap/ng-bootstrap de downloadat ca sa mearga bootstrap-u;


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CommonModule], //importi direct in component ce vrei sa folosesti
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  model: any= {}

  constructor(public accountService: AccountService){}

ngOnInit(): void{
}



login(){
  this.accountService.login(this.model).subscribe({
    next: response => {
      console.log(response);
    },
    error:error=> console.log(error)
  })
}

logout(){
  this.accountService.logout();
}
}

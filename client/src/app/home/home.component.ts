import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { AccountService } from '../_services/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [FormsModule, CommonModule, RegisterComponent]
})
export class HomeComponent implements OnInit {
registerMode=false;
users: any;

constructor(private accountService: AccountService, private http: HttpClient){}

  ngOnInit(): void {
    this.getUsers();
}
registerToggle(){
  this.registerMode=!this.registerMode;
}

getUsers(){
  this.http.get("https://localhost:5001/api/users").subscribe({
    next: response => this.users= response,
    error: error => console.log(error),
    complete: () => console.log("Request has completed")
  })
}

cancelRegisterMode(event: boolean) {
  this.registerMode=event;
}
}

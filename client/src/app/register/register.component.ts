import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
model: any = {}
@Output() cancelRegister= new EventEmitter();
 
constructor(private accounntService: AccountService){

}
ngOnInit(): void {
}

register(){ this.accounntService.register(this.model).subscribe({
next:response => {
  console.log(response);
  this.cancel();
},
error: error => console.log(error)
})
}

cancel(){
  this.cancelRegister.emit(false);
}
}

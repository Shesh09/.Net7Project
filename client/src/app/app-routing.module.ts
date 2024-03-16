import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MembersMemberDetailComponent } from './members/member-detail/members-member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes= [
  //Obiecte= acolade
  {path: "", component: HomeComponent},
  {path: "members", component: MemberListComponent},
  {path: "members/:id", component: MembersMemberDetailComponent},
  {path: "lists", component: ListsComponent},
  {path: "messages", component: MessagesComponent},
  {path: "**", component: HomeComponent, pathMatch: "full"}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

//serviciile sunt injectabile,singleton, instantiate cand aplicatia incepe si sterse cand se inchide
//componentele au informatii in memorie
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl= "https://localhost:5001/api";
  private currentUserSource= new BehaviorSubject<User | null>(null);
  curentUsers$= this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }
//daca apare vreo eroare e de la map

  login(model: any){
    return this.http.post<User>(this.baseUrl + "/account/login", model).pipe(
      map((response: User) => {
        const user= response;
        if(user){
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl + "/account/register",model).pipe(
      map(user => { 
        if(user){
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }
  logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/model/user.interface';
import { v4 as uuidv4 } from 'uuid'
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER: string = 'user';

  public apiUrl = environment.api_Url;

  constructor(private router: Router, private http: HttpClient) { }

  createUser(Userdata: any): Observable<any> {
    // const user: User = {
    //   id: uuidv4(),
    //   name: name
    // }

    console.log(Userdata);
    return this.http.post<any>(`${this.apiUrl}/user/create-account`, Userdata);
  }

  loginUser(userData: any): Observable<any> {
    console.log("UserData : ", userData);

    return this.http.post<any>(`${this.apiUrl}/user/login`, userData)
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem(this.USER) || '{}') as User
  }

  deleteUserAccount() {
    localStorage.clear();
    this.router.navigateByUrl('create-account');
    window.location.reload();
  }

  isLoggedIn() {

    const me = localStorage.getItem("ET_User");
    if (me) {
      return true
    }
    else {
      return false;
    }
    //   return Object.keys(this.getUser()).length > 0;
  }

  logout(): Observable<any> {
    localStorage.removeItem("ET_User");
    return of(true);
  }
}

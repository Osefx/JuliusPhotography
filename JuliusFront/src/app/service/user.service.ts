import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post('http://localhost:3000/users', user);
  }

  loginUser(user: User) {
    return this.http.post('http://localhost:3000/login', user);
  }

}

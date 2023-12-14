import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    console.log('token'+token);
    return !!token;
  }
  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    console.log('role'+role);
    return role === 'Admin';
  }

  isClient(): boolean {
    const role = localStorage.getItem('role');
    console.log('role'+role);
    return role === 'Client';
  }
}

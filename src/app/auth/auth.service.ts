import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private myRoute: Router) {}

  setLoginDetails(data: Object) {
    sessionStorage.setItem('userdata',JSON.stringify(data));
  }
  getLoginDetails() {
    return sessionStorage.getItem("userdata");
  }
  isLoggednIn() {
    return this.getLoginDetails() !== null;
  }
  getLoggedInRole() {
    return JSON.parse(sessionStorage.getItem("userdata")).role;
  }
  logout() {
    sessionStorage.removeItem("userdata");
    sessionStorage.clear();
    this.myRoute.navigate(["login"]);
  }
}

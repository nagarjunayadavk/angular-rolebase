import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private route: Router, private authService: AuthService) { }
  loginForm: FormGroup;
  userType: String;
  ngOnInit() {
    document.querySelector('body').classList.add('login-bg-color');
    this.loginForm = this.formBuilder.group({
      userType: ['', [Validators.required]],
     });
  }

    
  login(){
   this.userType = this.loginForm.value["userType"];
   this.authService.setLoginDetails({'role' : this.userType});
   console.log("User Sucessfully Logged in!.");
   if(this.userType === 'user'){
    this.route.navigate(['/dashboard']);
  }else if(this.userType === 'admin'){
    this.route.navigate(['/admin/dashboard']);
  }
  }
  ngOnDestroy(){
    document.querySelector('body').classList.remove('login-bg-color');
  }
  
}

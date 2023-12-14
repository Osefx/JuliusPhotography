import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });

    this.loginForm = this.formBuilder.group({ // Add this block
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isClient(): boolean {
    return this.authService.isClient();
  }
  createUser() {
    const user: User = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      role: this.userForm.value.role
    };

    this.userService.createUser(user).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/']); // Redirect to home page
      },
      error => {
        console.error(error);
      }
    );
  }

  loginUser() {
    const user: User = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      email: '',
      role: ''
    };

    this.userService.loginUser(user).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token); // Save the token to local storage
        localStorage.setItem('role', response.role); // Save the role to local storage
        this.router.navigate(['/portfolio']); // Redirect to home page
      },
      error => {
        console.error(error);
      }
    );
  }

}

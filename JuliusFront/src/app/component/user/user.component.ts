import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private router: Router
  ) {}

  ngOnInit() {
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.formBuilder.group({ // Add this block
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // This could be checking if there's a valid JWT in local storage, for example
    return !!localStorage.getItem('token');
  }

  createUser() {
    const user: User = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password
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
    };

    this.userService.loginUser(user).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token); // Save the token to local storage
        this.router.navigate(['/']); // Redirect to home page
      },
      error => {
        console.error(error);
      }
    );
  }

}

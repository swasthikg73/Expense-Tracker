import { Validator } from './../../../../server/node_modules/sequelize/types/utils/validator-extras.d';
import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  register: boolean = false;
  dispalyForm: boolean = false;
  accountForm: FormGroup = new FormGroup({
    Name: new FormControl('', Validators.required),
    password: new FormControl("", Validators.required)
  });

  constructor(private userService: UserService, private router: Router) { }

  OnClickRegister() {
    this.register = true;
    this.dispalyForm = true;
  }

  OnClickLogin() {
    this.dispalyForm = true;
    this.register = false;
  }

  createAccount() {
    const userData = this.accountForm.value;
    this.userService.createUser(userData).subscribe({
      next: (res) => {
        this.accountForm.reset();
        this.router.navigateByUrl('/');
        localStorage.setItem('ET_User', JSON.stringify(res));
        this.register = false;
        // console.log("res : ", res);

      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message)
      }
    });
  }

  Login() {
    const userData = this.accountForm.value;
    this.userService.loginUser(userData).subscribe({
      next: (res) => {
        this.accountForm.reset();
        this.router.navigateByUrl('/');
        localStorage.setItem('ET_User', JSON.stringify(res.user));
        this.dispalyForm = false;
        this.register = false;
        // console.log("res : ", res);

      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message)
      }
    });
  }
}

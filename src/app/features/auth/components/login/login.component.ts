import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import {
  IBaseUser,
  IUser,
  IUserCredentials,
} from '../../../../shared/models/iuser';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [''],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  disableAllInputs(): void {
    this.username?.disable();
    this.password?.disable();
    this.rememberMe?.disable();
  }

  enableAllInputs(): void {
    this.username?.enable();
    this.password?.enable();
    this.rememberMe?.enable();
  }

  getCurrentUser(): void {
    const observer = {
      next: (user: IUser) => {
        this.spinner.hide();
        subscribtion.unsubscribe();
        localStorage.setItem('role', user.role);
        if (user.role === 'user') {
          this.router.navigate(['/']);
        }
      },
      error: (error: any) => {
        this.spinner.hide();
        console.error('Login error: ', error);
      },
    };
    const subscribtion = this.authService.getCurrentUser().subscribe(observer);
  }

  onLoginFormSubmit(): void {
    this.spinner.show();

    this.disableAllInputs();

    const { username, password } = this.loginForm.value;
    const userCredentials: IUserCredentials = { username, password };

    const observer = {
      next: (user: IBaseUser) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.getCurrentUser();
      },
      error: (error: any) => {
        this.loginForm.reset();
        this.enableAllInputs();
        this.spinner.hide();
        console.error('Login error: ', error);
      },
    };
    this.authService
      .login(userCredentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

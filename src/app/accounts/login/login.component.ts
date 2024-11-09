import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/services/AuthenticationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailOrUsername!: string;
  password!: string;
  errorMessage: string = '';
  showError: boolean = false;
  loading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private authenService: AuthenticationService)
  {
  }

  loginFn() {
    let returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
    this.loading = true;

    this.authenService.login(this.emailOrUsername, this.password).subscribe({
      next: (token) => {
        this.loading = false;
        localStorage.setItem('token', token.token);
        localStorage.setItem('userId', token.userId);

        if (returnUrl === undefined || returnUrl === '' || returnUrl === '/account/login') {
          this.route.navigate(['app/teams']);
        } else {
          this.route.navigate([returnUrl]);
        }
      },
      error: (errorRes) => {
        if (!(errorRes instanceof HttpErrorResponse)) {
          console.error('Lỗi khi kết nối đến server ', errorRes);
        }

        if (errorRes.error.type === 'https://tools.ietf.org/html/rfc7231#section-6.6.1') {
          this.errorMessage = errorRes.error.title;
        } else {
          this.errorMessage = 'Xảy ra lỗi khi kết nối đến server ' + errorRes;
        }

        this.loading = false;
        this.showError = true;
      }
    })
  }

  isFormValid() {
    if (this.emailOrUsername === undefined || this.emailOrUsername === '') {
      return false;
    }

    if (this.password === undefined || this.password === '') {
      return false;
    }

    return true;
  }
}

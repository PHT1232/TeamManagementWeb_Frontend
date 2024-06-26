import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { ApplicationUser } from "./models/authModel/ApplicationUser";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenInfo } from "./models/authModel/TokenInfo";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/shared/environment";

const authenServiceUrl = environment.baseUrl + '/authenticate' 
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private jwtHelper: JwtHelperService
    ) {
    }

    public isGranted = (permission: string): boolean => {
        const token = localStorage.getItem('token');
        if (this.jwtHelper.isTokenExpired(token)) {
            return false;
        }
        if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);

            let role: any[] = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

            if (role === undefined) {
                return false;
            }

            let roleMatchPermission = role.find(element => element === permission);
            
            if (roleMatchPermission !== undefined) {
                return true;
            }
        }
        return false;
    }

    login(username: string, password: string) {
        let loginUser = new ApplicationUser();
        loginUser.username = username;
        loginUser.password = password;
        let loginUrl = authenServiceUrl + '/login';

        return this.http.post<TokenInfo>(loginUrl, loginUser);
    }

    register(email: string, userName: string, password: string) {
        let registerUser = new ApplicationUser();
        registerUser.email = email;
        registerUser.username = userName;
        registerUser.password = password;
        let registerUrl = authenServiceUrl + '/register';

        let options: any = {
            observe: "response",
            responseType: "text",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                Accept: "text/plain",
            }),
        }
        return this.http.post(registerUrl, registerUser, options);
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/account/login'])
    }
}
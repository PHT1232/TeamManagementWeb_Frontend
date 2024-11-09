import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { ApplicationUser } from "./models/authModel/ApplicationUser";
import { Router } from "@angular/router";
import { HttpClient, HttpContext, HttpHeaders } from "@angular/common/http";
import { TokenInfo } from "./models/authModel/TokenInfo";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/shared/environment";
import { SkipLoading } from "./LoadingInterceptor";
import { EncryptionService } from "./EncryptionService";

const authenServiceUrl = environment.baseUrl + '/authenticate'
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private jwtHelper: JwtHelperService, private encryptionService: EncryptionService
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
            let roleMatchPermission = undefined;

            if (role instanceof Array) {
                roleMatchPermission = role.find(element => element === permission);
            } else if (role === permission) {
                roleMatchPermission = role;
            }

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

        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

        return this.http.post<TokenInfo>(loginUrl, loginUser, {
            headers: headers,
            context: new HttpContext().set(SkipLoading, true),
        });
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/account/login'])
    }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/services/AuthenticationService";
import { environment } from "src/shared/environment";

const apiUrl = 'https://192.168.1.14:7279/api/'
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        const isLoggedIn = token;
        const isApiUrl = req.url.startsWith(environment.baseUrl + '/');
        if (isLoggedIn && isApiUrl) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }
}
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/services/AuthenticationService";
import { EncryptionService } from "src/services/EncryptionService";
import { environment } from "src/shared/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenService: AuthenticationService, private encryptionService: EncryptionService) {}

    ExcludeUrlList = [
      environment.baseUrl + "/api/Common/commonFileuploaddata",
      environment.baseUrl + "/api/Users/UploadProfilePicture",
      environment.baseUrl + "/api/Common/downloadattachedfile"];

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

import { Injectable } from "@angular/core";
import { EncryptionService } from "./EncryptionService";
import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/shared/environment";

@Injectable()
export class EncryptionInterceptor {
    constructor(private encryptionService: EncryptionService) {}

    ExcludeUrlList = [
      environment.baseUrl + "/api/chat/negotiate",
      environment.baseUrl + "/api/file/GetUserProfile",
      environment.baseUrl + "/api/chat"
    ]
      intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
        let exludeFound = this.ExcludeUrlList.filter(element => {
            return req.url.includes(element)
        });

        // We have Encrypt the GET and POST call before pass payload to API
        if (!(exludeFound && exludeFound.length > 0)) {
            if (req.method == "GET") {
                if (req.url.indexOf("?") > 0) {
                    let encryptURL = req.url.substring(0, req.url.indexOf("?") + 1) + this.encryptionService.encryptGetDataUsingAES256(req.url.substring(req.url.indexOf("?") + 1, req.url.length));
                    const cloneReq = req.clone({
                      url: encryptURL,
                    });
                    return next.handle(cloneReq);
                }
                return next.handle(req);
            } else if (req.method == "POST") {
                if (req.body || req.body.length > 0) {
                    const cloneReq = req.clone({
                        headers: req.headers.append('Content-Type', 'application/json'),
                        body: this.encryptionService.encryptPostDataUsingAES256(req.body)
                    });
                    return next.handle(cloneReq);
                }
                let data = req.body as FormData;
                return next.handle(req);
            }
        }
        return next.handle(req);
    }
}

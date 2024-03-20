import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "src/services/AuthenticationService";

@Injectable({
    providedIn: 'root'
}) 
class PermissionService {
    constructor (private router: Router,
        private authenService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = localStorage.getItem('user');
        if (user == null) {
            this.router.navigate(['/account/login'], { queryParams: {returnUrl: state.url}});
            return false;
        }
        
        let permission = route.data['permission'];

        if (this.authenService.isGranted(permission)) {
            return true;
        }

        this.router.navigate(['account/login'], { queryParams: {returnUrl: state.url}});
        return false;
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionService).canActivate(next, state);
}
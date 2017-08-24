import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

	constructor (private authSvc:AuthService) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		//console.log('in AuthGuard');
		return this.authSvc.isAuthenticated();
	}

}
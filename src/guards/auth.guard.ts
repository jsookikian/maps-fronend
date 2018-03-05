import { Injectable }     from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Angular2TokenService} from "angular2-token";
  import { AuthService } from '../app/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authTokenService:Angular2TokenService,
    private authService: AuthService,

              private router:Router){}

  canActivate() {
    if(this.authService.userLoggedIn){
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }

}
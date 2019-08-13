import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '../shared/services/token.service';
import { NotificationService } from '../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private tokenService: TokenService,
              private notificationService: NotificationService) {}

  canActivate(): Observable<boolean> | boolean {
    if(this.authService.userLogged || this.tokenService.getSession()['access-token']) {
      console.log(this.tokenService.getSession())
      return true;
    }
  
    this.notificationService.notify('Acesso não permitido para o usuário')
    this.router.navigate(['/login'])
    return false;
  }
}

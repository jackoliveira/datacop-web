import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: boolean = false;
  constructor(private usersService: UsersService,
              private router: Router) { }

  authUser(user: any): any {
    return this.usersService.attemptAuth(user).pipe(
      tap((data) => {
          this.isLogged = true;
          this.router.navigate(['/occurrences']);
          return data;
        }
      ),
    )
  }

  public get userLogged(): boolean {
    return this.isLogged;
  }
}

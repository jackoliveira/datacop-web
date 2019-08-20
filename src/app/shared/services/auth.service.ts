import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: boolean = false;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private usersService: UsersService,
              private router: Router) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  authUser(user: any): any {
    return this.usersService.attemptAuth(user).pipe(
      map((data) => {
          console.log(data);
          this.loggedIn.next(true);
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

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}

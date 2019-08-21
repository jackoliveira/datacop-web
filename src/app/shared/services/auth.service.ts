import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private usersService: UsersService,
              private router: Router) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public authUser(user: any): any {
    return this.usersService.attemptAuth(user).pipe(
      map((data) => {
          this.loggedIn.next(true);
          
          this.router.navigate(['/occurrences']);
          return data;
        }
      ),
    )
  }
  
  public logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}

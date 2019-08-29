import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private usersService: UsersService,
              private tokenService: TokenService,
              private router: Router) {
                this.currentUserSubject = new BehaviorSubject<any>(this.tokenService.getSession());
                this.currentUser = this.currentUserSubject.asObservable();
              }

  get currentUserValue() { return this.currentUserSubject.value; }

  public authUser(user: any): any {
    return this.usersService.attemptAuth(user).pipe(
      map(({ body }) => {
          this.currentUserSubject.next(this.tokenService.getSession());
          this.router.navigate(['/occurrences']);
          return body;
        }
      ),
    )
  }
  
  public logout(): void {
    this.currentUserSubject.next(null)
    this.tokenService.destroySession();
    this.router.navigate(['/login']);
  }
}

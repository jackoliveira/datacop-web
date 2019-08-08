import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private api: ApiService,
              private router: Router,
              private tokenService: TokenService) { }

  public attemptAuth(user: any): Observable<any> {
    return this.api.post('/auth/sign_in', user)
  }

  setAuth() {

  }
  
  
}

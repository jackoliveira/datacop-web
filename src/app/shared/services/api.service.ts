import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpResponse } from "@angular/common/http";
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = ''
  constructor(private http: HttpClient,
              private tokenService: TokenService) { }

  private setHeaders(): HttpHeaders {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    })

    if(this.tokenService.getToken())
      httpHeaders = httpHeaders.set('access_token', this.tokenService.getToken())
    if(this.tokenService.getClient())
      httpHeaders = httpHeaders.set('client', this.tokenService.getClient())
    if(this.tokenService.getUID())
      httpHeaders = httpHeaders.set('uid', this.tokenService.getUID())
    
    
    return httpHeaders
  }

  private httpOptions(): Object {
    return { headers: this.setHeaders(), observe: 'response', responseType: 'json' }
  }

  public get(path: string, params: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${path}${params}`, this.httpOptions())
      .pipe(tap((data) => { 
        const { headers } = data;
        this.tokenService.saveSession({ access_token: headers.get('access_token'), client: headers.get('client'), uid: headers.get('uid') });
        return data;
      }))
  }

  public post(path: string, body: Object = {}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${path}`, body, this.httpOptions())
      .pipe(tap((data) => {
        const { headers } = data;
        this.tokenService.getSession()
        this.tokenService.saveSession({ access_token: headers.get('access_token'), client: headers.get('client'), uid: headers.get('uid') });
        this.tokenService.getSession()
        return data;
      }))
  }

  public put(path: string, body: Object = {}): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${path}`, body, this.httpOptions())
      .pipe(tap((data) => { 
        const { headers } = data;
        this.tokenService.saveSession({ access_token: headers.get('access_token'), client: headers.get('client'), uid: headers.get('uid') });
        return data;
      }))
  }

  public delete(path: string, params: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${path}${params}`, this.httpOptions())
      .pipe(tap((data) => { 
        const { headers } = data;
        this.tokenService.saveSession({ access_token: headers.get('access_token'), client: headers.get('client'), uid: headers.get('uid') });
        return data;
      }))
  }
}

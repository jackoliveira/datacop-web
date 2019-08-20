import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(private api: ApiService,
    private router: Router,
    private tokenService: TokenService) { }

  get(params: string = ''): Observable<any> {
    return this.api.get(`/v1/occurrences/${params}/answers`)
  }

  save(occurrence_id: number, answer: object = {}): Observable<any> {
    return this.api.post(`/v1/occurrences/${occurrence_id}/answers`, answer)
  }
}

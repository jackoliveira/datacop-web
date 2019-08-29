import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(private api: ApiService) { }

  get(params: string = ''): Observable<any> {
    return this.api.get('/v1/organizations/', params)
  }
}

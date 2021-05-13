import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userDetails } from '../model/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = 'http://localhost:4200';
  constructor(private http: HttpClient) { }

  addUserDetail(userDetails: userDetails): Observable<userDetails> {
    return this.http.post<userDetails>(this.url, userDetails);
  }
}

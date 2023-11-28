import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import User from '../../../models/User';
import { API_URL } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SignupService {
  constructor(private http: HttpClient) { }

  signup(userData: User): Observable<User> {
    return this.http.post<User>(API_URL + "/signup", userData)
  }
}

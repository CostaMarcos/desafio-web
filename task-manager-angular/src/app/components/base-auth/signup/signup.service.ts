import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import User from '../../../models/User';

@Injectable({
  providedIn: 'root'
})

export class SignupService {
  private readonly API: string = 'http://localhost:8000'
  constructor(private http: HttpClient) { }

  signup(userData: User): Observable<User> {
    return this.http.post<User>(this.API + "/signup", userData)
  }
}

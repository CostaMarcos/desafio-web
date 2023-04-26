import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs';
import Auth from '../models/Auth';
import RefreshToken from 'src/app/models/ResfreshToken';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { API_URL } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, private localStoreService: LocalStorageService) { }

  auth(userData: Auth): Observable<Auth> {
    return this.http.post<Auth>(API_URL + "login", userData)
  }

  refreshToken(): Observable<RefreshToken> {
    const refreshToken: string | null = this.getRefreshToken();


    return this.http.post<RefreshToken>(API_URL + "token/refresh",{ refresh: refreshToken }).pipe(
      tap((response) => {
        console.log(response)
        this.localStoreService.setObject(response);
      }
    ))
  }

  getAccessToken(): string | null {
    return this.localStoreService.get("access")
  }

  getRefreshToken(): string | null {
    return this.localStoreService.get("refresh")
  }

  clearTokens(): void {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

  logout(): void {
    this.clearTokens();
  }
}

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    // Envie a requisição HTTP modificada para o próximo manipulador
    return next.handle(req).pipe(
      // Adicione um manipulador de erro que verifica se a resposta HTTP é um erro 401
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Se a resposta for um erro 401, renove o token de acesso e tente novamente a requisição original
          return from(this.authService.refreshToken()).pipe(
            switchMap(() => {
              // Atualize o token de acesso no cabeçalho da requisição original
              const newAccessToken = this.authService.getAccessToken();
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`
                }
              });
              // Tente novamente a requisição original com o novo token de acesso
              return next.handle(req);
            }),
            catchError((error) => {
              // Se ocorrer outro erro, emita-o como uma exceção
              return throwError(error);
            })
          );
        } else {
          // Se o erro não for um erro 401, emita-o como uma exceção
          return throwError(error);
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { NotificationService } from '../shared/services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
                private notificationService: NotificationService,
                private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request)
      return next.handle(request).pipe(catchError(err => {
        console.log(err.status)

        // Unauthorized
        if (err.status == 401) {
          this.notificationService.notify('Acesso não permitido.');
          this.authService.logout();
        }

        // Timeout
        if (err.status == 408) {
          this.notificationService.notify('Tempo de resposta excedido, tente novamente mais tarde.');
        }

        // Conectivity error
        if (err.status == 0) {
          this.notificationService.notify('Serviço indisponível, tente novamente mais tarde.');
        }

        if (err.status == 500) {
          this.notificationService.notify('Erro no servidor.');
        }

        this.router.navigate(['/login']);
        const error = err.errors || err.statusText || err.error.message;
        return throwError(error);
      }))
  }
}
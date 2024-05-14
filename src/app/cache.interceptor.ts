import { Injectable } from '@angular/core';
const TIME_TO_LIVE = 1000;
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { CacheResolverService } from './services/cache-resolver.service';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(
    private apiService:ApiService,
    private cacheResolver: CacheResolverService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    if (req.headers.get('x-refresh')) {
      return this.sendRequest(req, next);
    }
    const cachedResponse = this.cacheResolver.get(req.url);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
  }
  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cacheResolver.set(req.url, event);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status===403){

          this.apiService.setError("API Rate limit exceeded.")
        }
        else{
          this.apiService.setError("Entered user does not exist.")
        }
        return throwError(error);
      })
    );
  }
}

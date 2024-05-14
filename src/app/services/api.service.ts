import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { CacheResolverService } from './cache-resolver.service';
const TIME_TO_LIVE = 1000;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  userNotFoundError:string=''
  constructor(
    private httpClient: HttpClient,
    private cacheResolver: CacheResolverService
  ) {}

  getError():string{
    return this.userNotFoundError;
  }
  setError(value:string):void{
    this.userNotFoundError=value;
  }

  getUser(githubUsername: string): Observable<any> {
    const cachedResponse=this.httpClient
      .get(`https://api.github.com/users/${githubUsername}`, {
        observe: 'response',
      })
      .pipe(
        tap((response: HttpResponse<any>) => {
          this.cacheResolver.set(
            `https://api.github.com/users/${githubUsername}`,
            response,
            TIME_TO_LIVE
          );
        })
      );
      return cachedResponse
  }

  getRepos(githubUsername: string, currentPage: number,itemsPerPage:number): Observable<any> {
    const cachedResponse=this.httpClient
      .get(`https://api.github.com/users/${githubUsername}/repos?sort=updated&page=${currentPage}&per_page=${itemsPerPage}`, {
        observe: 'response',
      })
      .pipe(
        tap((response: HttpResponse<any>) => {
          this.cacheResolver.set(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&page=${currentPage}&per_page=${itemsPerPage}`,
            response,
            TIME_TO_LIVE
          );
        })
      );
      return cachedResponse
  }
}

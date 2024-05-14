import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CacheInterceptor } from './cache.interceptor';
import { CacheResolverService } from './services/cache-resolver.service';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { of, throwError } from 'rxjs';

describe('CacheInterceptor', () => {
  let interceptor: CacheInterceptor;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let cacheResolver: CacheResolverService;
  let apiService: ApiService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CacheInterceptor,
        CacheResolverService,
        ApiService,
        Router,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CacheInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(CacheInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    cacheResolver = TestBed.inject(CacheResolverService);
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const interceptor: CacheInterceptor = TestBed.inject(CacheInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

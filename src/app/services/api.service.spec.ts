import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { mockUser } from '../mock-data/mock-user';
import { mockRepoData } from '../mock-data/mock-repo-data';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get error message', () => {
    const errorMessage = 'User not found';
    service.setError(errorMessage);
    expect(service.getError()).toEqual(errorMessage);
  });

  it('should make a GET request to fetch user data', () => {
    service.getUser('MukeshKaswan1').subscribe((response) => {
      expect(response.body).toEqual(mockUser);
    });

    const req = httpMock.expectOne('https://api.github.com/users/MukeshKaswan1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
  
  it('should make a GET request to fetch user repositories', () => {
    service.getRepos('MukeshKaswan1', 1, 10).subscribe((response) => {
      expect(response.body).toEqual(mockRepoData);
    });

    const req = httpMock.expectOne(
      'https://api.github.com/users/MukeshKaswan1/repos?sort=updated&page=1&per_page=10'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockRepoData);
  });
});

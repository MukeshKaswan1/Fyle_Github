import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryListComponent } from './repository-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { mockRepoData } from 'src/app/mock-data/mock-repo-data';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let apiService: any; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoryListComponent],
      imports: [HttpClientModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'MukeshKaswan1' }),
            snapshot: {
              paramMap: convertToParamMap({ id: 'MukeshKaswan1' })
            }
          },
        },
      ],
    });
    apiService = jasmine.createSpyObj('ApiService', ['getRepos', 'getUser']);
    TestBed.overrideProvider(ApiService, { useValue: apiService });
    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select page size', () => {
    component.selectPageSize(20);
    expect(component.itemsPerPage).toBe(20);
  });

});

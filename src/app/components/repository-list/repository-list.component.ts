import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { Repository } from 'src/app/interfaces/repository';
import { HttpResponse } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit {
  username: string = '';
  userData: User | null = null;
  repoData: Repository[] = [];
  twitterUrl!: string | null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  totalItems: number = 1;
  apiPageNumber: number = 1;
  loading: boolean = false;
  loadingRepositories: boolean = false;
  searchBar!: FormControl;
  currentUrl: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.searchBar = new FormControl('');
    let id = null;
    id = this.route.snapshot.params?.['id'];
    this.username = id;
    this.currentUrl = this.router.url;
    this.searchBar.setValue(this.currentUrl?.split('/')[2]);
  }
  selectPageSize(value: number) {
    this.itemsPerPage = value;
  }

  changePage(page: number) {
    const oldCurrentPage = this.currentPage;
    this.currentPage = page;
    if (this.currentPage !== oldCurrentPage) {
      this.getData();
    }
  }

  changeItemsPerPage(value: number) {
    console.log(value);
    this.itemsPerPage = value;
    this.currentPage = 1;
    this.getData();
  }

  getData() {
    this.loadingRepositories = true;
      this.apiService
        .getRepos(this.username, this.currentPage, this.itemsPerPage)
        .subscribe(
          (response) => {
            if (!response) {
              return;
            }
            this.repoData = [];
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

            response.body.map((repository: any, index: number) => {
              this.repoData.push({
                id: index,
                repoName: repository.name,
                description: repository.description,
                topics: repository.topics,
                url: repository.html_url,
              });

              const MAX_CHARACTERS_PER_DESCRIPTION = 150;
              let currentDescription =
                this.repoData[this.repoData.length - 1].description;
              if (
                currentDescription &&
                currentDescription.length > MAX_CHARACTERS_PER_DESCRIPTION
              ) {
                let words = currentDescription?.split(' ');
                let newDescription = '';
                if (words.length === 1) {
                  newDescription =
                    currentDescription.slice(
                      0,
                      MAX_CHARACTERS_PER_DESCRIPTION
                    ) + '...';
                  this.repoData[this.repoData.length - 1].description =
                    newDescription + '...';
                  return;
                }
                let i = 0;
                while (
                  (newDescription + words[i]).length <=
                  MAX_CHARACTERS_PER_DESCRIPTION
                ) {
                  newDescription = newDescription + words[i] + ' ';
                  i = i + 1;
                }
                this.repoData[this.repoData.length - 1].description =
                  newDescription + '...';
              }

              let topics = this.repoData[this.repoData.length - 1].topics;
              if (topics && topics.length > 5) {
                topics = topics.slice(0, 5);
                topics.push('more...');
              }
              this.repoData[this.repoData.length - 1].topics = topics;
              topics = this.repoData[this.repoData.length - 1].topics;

              for (let i = 0; i < topics.length; i++) {
                if (topics[i].length > 10) {
                  topics[i] = topics[i].slice(0, 10) + '...';
                }
              }
            });
          },
          (error) => {
            this.errorMessage = this.apiService.getError();
            this.loading = false;
            this.loadingRepositories = false;
            this.searchBar.setValue('');
            console.error(error);
          }
        );
    setTimeout(() => {
      this.loadingRepositories = false;
    }, 1000);
  }
  ngOnInit() {
    this.loading = true;
    if (!this.username || this.username === '') {
      this.loading = false;
      return;
    }
    this.apiService.getUser(this.username)?.subscribe(
      (response: any) => {
        this.userData = response.body;
        if (this.userData === null) {
          this.errorMessage = this.apiService.getError();
          console.log(this.errorMessage);
          this.loading = false;
          this.loadingRepositories = false;
          return;
        }
        this.totalItems = this.userData.public_repos;
        if (this.userData.twitter_username) {
          this.twitterUrl = `https://twitter.com/${this.userData.twitter_username}`;
        }
      },
      (error) => {
        console.error(error);
      }
    );
    this.getData();
    this.loading = false;
  }
}

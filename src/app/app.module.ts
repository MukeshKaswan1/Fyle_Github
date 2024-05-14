import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CacheInterceptor } from './cache.interceptor';
import { UserNotFoundComponent } from './components/user-not-found/user-not-found.component';

const routes: Routes = [
  { path: '', component: SearchBarComponent },
  { path: 'user/:id', component: RepositoryListComponent },
  { path: 'user-not-found', component: UserNotFoundComponent },
  { path: '**', component: PageNotFoundComponent, title: '404 Page Not Found' },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    RepositoryListComponent,
    PaginationComponent,
    UserNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

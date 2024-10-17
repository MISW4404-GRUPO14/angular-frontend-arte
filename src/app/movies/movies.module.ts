import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MoviesRoutingModule } from './movies-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SharedModule } from '../shared/shared.module';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieReviewCreateComponent } from './movie-review-create/movie-review-create.component';
import { MovieAsociatePlatformComponent } from './movie-asociate-platform/movie-asociate-platform.component';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    MovieCreateComponent,
    MovieReviewCreateComponent,
    MovieAsociatePlatformComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class MoviesModule {}

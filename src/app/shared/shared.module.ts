import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ActorCardComponent } from './actor-card/actor-card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DirectorCardComponent } from './director-card/director-card.component';
import { Actor2CardComponent } from './actor2-card/actor2-card.component';
import { Director2CardComponent } from './director2-card/director2-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    MovieCardComponent,
    ActorCardComponent,
    Actor2CardComponent,
    PaginationComponent,
    DirectorCardComponent,
    Director2CardComponent,
    Actor2CardComponent,
    Director2CardComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    BreadcrumbComponent,
    FooterComponent,
    HeaderComponent,
    MovieCardComponent,
    ActorCardComponent,
    Actor2CardComponent,
    PaginationComponent,
    DirectorCardComponent,
    Director2CardComponent,
  ],
})
export class SharedModule {}

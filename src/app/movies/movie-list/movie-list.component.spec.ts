import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from 'src/app/services/movies/movie.service';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { Movie } from 'src/app/models/movie.model';
import { faker } from '@faker-js/faker';
import { Genre } from 'src/app/models/genre.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let debug: DebugElement;
  let pagination: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule, RouterTestingModule],
      declarations: [MovieListComponent, MovieCardComponent],
      providers: [MovieService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    for (let i = 0; i < 100; i++) {
      const movie = new Movie(
        faker.string.sample(10),
        faker.lorem.sentence(),
        faker.image.url(),
        faker.number.int({ max: 250 }),
        faker.location.country(),
        faker.date.past(),
        faker.number.float({ precision: 0.1, max: 10 }),
        undefined,
        undefined,
        new Genre(faker.string.sample(10), faker.lorem.word())
      );
      component.allMovies.push(movie);
    }
    fixture.detectChanges();
    pagination = fixture.debugElement.query(By.css('app-pagination'));
    pagination.triggerEventHandler(
      'changePage',
      component.allMovies.slice(0, 24)
    );
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display breadcrumb items correctly', () => {
    const expectedBreadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Inicio',
        link: '/',
      },
      {
        label: 'Películas',
      },
    ];

    expect(component.breadcrumbItems).toEqual(expectedBreadcrumbItems);
  });

  it('should have 24 .movie elements', () => {
    // expect the correct number of movie cards to be displayed
    expect(component.movies.length).toEqual(24);
  });

  it('should have h2 tag with the movie.title', () => {
    debug.queryAll(By.css('h2.card-title')).forEach((h5, i) => {
      expect(h5.nativeElement.textContent).toContain(
        component.allMovies[i].title
      );
    });
  });

  it('should have the corresponding src to the movie poster and alt to the movie title', () => {
    debug.queryAll(By.css('.results img')).forEach((img, i) => {
      expect(img.attributes['src']).toEqual(component.allMovies[i].poster);
      expect(img.attributes['alt']).toEqual(component.allMovies[i].title);
    });
    const j = 24;
    pagination.triggerEventHandler(
      'changePage',
      component.allMovies.slice(j, 24)
    );
    fixture.detectChanges();
    debug.queryAll(By.css('.results img')).forEach((img, i) => {
      expect(img.attributes['src']).toEqual(component.allMovies[i + j].poster);
      expect(img.attributes['alt']).toEqual(component.allMovies[i + j].title);
    });
  });
});

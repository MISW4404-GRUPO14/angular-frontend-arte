import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';
import { Movie } from 'src/app/models/movie.model';
import { faker } from '@faker-js/faker';
import { Genre } from 'src/app/models/genre.model';
import { Person } from 'src/app/models/person.model';
import { MovieService } from 'src/app/services/movies/movie.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Platform } from 'src/app/models/platform.model';
import { Review } from 'src/app/models/review.model';
import { YoutubeTrailer } from 'src/app/models/youtube-trailer.model';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let debug: DebugElement;
  const allMovies: Movie[] = [];
  for (let i = 0; i < 100; i++) {
    const actors: Person[] = [];
    for (let j = 0; j < 5; j++) {
      actors.push(
        new Person(
          faker.string.sample(10),
          faker.string.sample(10),
          faker.image.url(),
          faker.string.sample(10),
          faker.date.anytime(),
          faker.lorem.sentence()
        )
      );
    }
    const movie = new Movie(
      faker.string.uuid(),
      faker.lorem.sentence(),
      faker.image.url(),
      faker.number.int({ max: 250 }),
      faker.location.country(),
      faker.date.past(),
      faker.number.float({ precision: 0.1, max: 10 }),
      new Person(
        faker.string.sample(10),
        faker.string.sample(10),
        faker.image.url(),
        faker.string.sample(10),
        faker.date.anytime(),
        faker.lorem.sentence()
      ),
      actors,
      new Genre(faker.string.sample(10), faker.lorem.word()),
      [
        new Platform(
          faker.string.uuid(),
          faker.lorem.sentence(),
          faker.image.url()
        ),
        new Platform(
          faker.string.uuid(),
          faker.lorem.sentence(),
          faker.image.url()
        ),
      ],
      [
        new Review(
          faker.string.uuid(),
          faker.lorem.sentence(),
          faker.number.int(),
          faker.lorem.sentence()
        ),
        new Review(
          faker.string.uuid(),
          faker.lorem.sentence(),
          faker.number.int(),
          faker.lorem.sentence()
        ),
      ],
      new YoutubeTrailer(
        faker.string.uuid(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.number.int(),
        faker.lorem.sentence()
      )
    );
    allMovies.push(movie);
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule, RouterTestingModule],
      declarations: [MovieDetailComponent],
      providers: [
        MovieService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: allMovies[3].id },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;

    component.allMovies = allMovies;
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
        link: '/peliculas',
      },
      {
        label: allMovies[3].title,
      },
    ];

    expect(component.breadcrumbItems).toEqual(expectedBreadcrumbItems);
  });

  it('should have 100 .list-group-item', () => {
    expect(debug.queryAll(By.css('.list-group-item')).length).toEqual(100);
  });

  it('should have h1 with movie title', () => {
    expect(debug.queryAll(By.css('h1'))[0].nativeElement.textContent).toEqual(
      allMovies[3].title
    );
  });
  it('should have 5 actors', () => {
    expect(debug.queryAll(By.css('.actor')).length).toEqual(5);
  });
  it('should have 2 review', () => {
    expect(debug.queryAll(By.css('.review')).length).toEqual(2);
  });
});

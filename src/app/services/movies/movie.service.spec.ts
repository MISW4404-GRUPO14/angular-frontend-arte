import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/models/movie.model';
import { faker } from '@faker-js/faker';
import { Genre } from 'src/app/models/genre.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of movies', () => {
    let mockMovies: Movie[] = [];
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
      mockMovies.push(movie);
    }
    mockMovies = mockMovies.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    service.getMovies().subscribe((movies: Movie[]) => {
      expect(movies).toEqual(mockMovies);
    });
    const moviesApiUrl = environment.baseUrl + 'movies';
    const req = httpMock.expectOne(`${moviesApiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });
});

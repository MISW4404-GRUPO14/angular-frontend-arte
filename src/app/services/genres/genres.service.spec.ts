import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';

import { GenresService } from './genres.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Genre } from 'src/app/models/genre.model';
import { environment } from 'src/environments/environment';

describe('GenresService', () => {
  let service: GenresService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenresService],
    });
    service = TestBed.inject(GenresService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of genres', () => {
    let mockGenres: Genre[] = [];
    for (let i = 0; i < 100; i++) {
      const genre = new Genre(faker.string.sample(10), faker.lorem.word());
      mockGenres.push(genre);
    }
    mockGenres = mockGenres.sort((a, b) => {
      return a.type.localeCompare(b.type);
    });
    service.getGenres().subscribe((trailers: Genre[]) => {
      expect(trailers).toEqual(mockGenres);
    });
    const genresApiUrl = environment.baseUrl + 'genres';
    const req = httpMock.expectOne(`${genresApiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGenres);
  });
});

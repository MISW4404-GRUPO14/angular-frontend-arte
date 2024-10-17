import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';

import { YoutubeTrailersService } from './youtube-trailers.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { YoutubeTrailer } from 'src/app/models/youtube-trailer.model';
import { environment } from 'src/environments/environment';

describe('YoutubeTrailersService', () => {
  let service: YoutubeTrailersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YoutubeTrailersService],
    });
    service = TestBed.inject(YoutubeTrailersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of trailers', () => {
    let mockTrailers: YoutubeTrailer[] = [];
    for (let i = 0; i < 100; i++) {
      const trailer = new YoutubeTrailer(
        faker.string.sample(10),
        faker.lorem.sentence(),
        faker.image.url(),
        faker.number.int({ max: 250 }),
        faker.lorem.sentence()
      );
      mockTrailers.push(trailer);
    }
    mockTrailers = mockTrailers.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    service.getYoutubeTrailers().subscribe((trailers: YoutubeTrailer[]) => {
      expect(trailers).toEqual(mockTrailers);
    });
    const trailersApiUrl = environment.baseUrl + 'youtube-trailers';
    const req = httpMock.expectOne(`${trailersApiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTrailers);
  });

  it('should add a new trailer', () => {
    const newTrailer: YoutubeTrailer = {
      name: faker.lorem.sentence(),
      url: faker.image.url(),
      duration: faker.number.int({ max: 250 }),
      channel: faker.lorem.sentence(),
    };

    service
      .addYoutubeTrailer(newTrailer)
      .subscribe((trailer: YoutubeTrailer) => {
        expect(trailer).toEqual(newTrailer);
      });

    const trailersApiUrl = environment.baseUrl + 'youtube-trailers';
    const req = httpMock.expectOne(`${trailersApiUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTrailer);
    req.flush(newTrailer);
  });
});

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { faker } from '@faker-js/faker';
import { PlatformService } from './platforms.service';
import { Platform } from 'src/app/models/platform.model';

describe('PlatformService', () => {
  let service: PlatformService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlatformService],
    });
    service = TestBed.inject(PlatformService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of platfoms', () => {
    let mockPlatform: Platform[] = [];
    for (let i = 0; i < 100; i++) {
      const platform = new Platform(
        faker.string.sample(10),
        faker.string.sample(10),
        faker.image.url()
      );
      mockPlatform.push(platform);
    }
    service.getPlatforms().subscribe((platform: Platform[]) => {
      expect(platform).toEqual(mockPlatform);
    });
    const moviesApiUrl = environment.baseUrl + 'platforms';
    const req = httpMock.expectOne(`${moviesApiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPlatform);
  });
});

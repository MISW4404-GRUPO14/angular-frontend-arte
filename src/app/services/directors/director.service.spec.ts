import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DirectorService } from './director.service';
import { environment } from 'src/environments/environment';
import { Director } from 'src/app/models/director.model';

describe('DirectorService', () => {
  let service: DirectorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DirectorService],
    });
    service = TestBed.inject(DirectorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of directors', () => {
    const mockDirectors: Director[] = [
      {
        id: '1',
        name: 'The Shawshank Redemption',
        photo: 'https://www.example.com/shawshank-redemption.jpg',
        nationality: '142',
        birthDate: new Date('1994-10-14T00:00:00Z'),
        biography: '142'
      },
      {
        id: '2',
        name: 'The Shawshank Redemption',
        photo: 'https://www.example.com/shawshank-redemption.jpg',
        nationality: '142',
        birthDate: new Date('1994-10-14T00:00:00Z'),
        biography: '142'
      }
    ];

    service.getDirectors().subscribe((directors: Director[]) => {
      expect(directors).toEqual(mockDirectors);
    });
    const directorsApiUrl = environment.baseUrl + 'directors';
    const req = httpMock.expectOne(`${directorsApiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDirectors);
  });
});

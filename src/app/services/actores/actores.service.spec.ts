/* tslint:disable:no-unused-variable */
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { ActoresService } from './actores.service';
import { environment } from 'src/environments/environment';
import { Actor } from '../../models/actor.model';

describe('Service: Actores', () => {
  let service: ActoresService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActoresService]
    });
    service = TestBed.inject(ActoresService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should ...', inject([ActoresService], (service: ActoresService) => {
    expect(service).toBeTruthy();
  }));

  it('should get list of actores', () =>{
  const mockActores: Actor[] =
    [
      {

          id:'1',
          name: 'Rusell Crowe',
          photo: 'https://picsum.photos/300/300',
          nationality: 'Neozelandés',
          biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id lacinia mi, vel eleifend sapien. Integer scelerisque facilisis volutpat. Vivamus pulvinar egestas sagittis. Integer eu massa augue. Proin tortor turpis, lobortis eu tempor vel, maximus non leo. ',
          birthDate: new Date('1972-05-02T00:00:00Z'),
      },
      {

        id:'2',
        name: 'Antonio Banderas',
        photo: 'https://picsum.photos/300/300',
        nationality: 'Español',
        biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id lacinia mi, vel eleifend sapien. Integer scelerisque facilisis volutpat. Vivamus pulvinar egestas sagittis. Integer eu massa augue. Proin tortor turpis, lobortis eu tempor vel, maximus non leo. ',
        birthDate: new Date('1985-09-23T00:00:00Z'),
      },
      {
        id:'3',
        name: 'Michael Fox',
        photo: 'https://picsum.photos/300/300',
        nationality: 'American',
        biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id lacinia mi, vel eleifend sapien. Integer scelerisque facilisis volutpat. Vivamus pulvinar egestas sagittis. Integer eu massa augue. Proin tortor turpis, lobortis eu tempor vel, maximus non leo. ',
        birthDate: new Date('1960-12-11T00:00:00Z'),
      },
    ]
    service.getActors().subscribe((actores: Actor[]) => {
      expect(actores).toEqual(mockActores);
    });
    const actorsApiUrl = environment.baseUrl + 'actors';
    const req = httpMock.expectOne(`${actorsApiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockActores);
  });
})

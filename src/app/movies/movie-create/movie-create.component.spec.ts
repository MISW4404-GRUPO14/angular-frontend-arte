import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCreateComponent } from './movie-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { GenresService } from 'src/app/services/genres/genres.service';
import { DirectorService } from 'src/app/services/directors/director.service';
import { YoutubeTrailersService } from 'src/app/services/youtube-trailers/youtube-trailers.service';
import { MovieService } from 'src/app/services/movies/movie.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { Director } from 'src/app/models/director.model';
import { faker } from '@faker-js/faker';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('MovieCreateComponent', () => {
  let component: MovieCreateComponent;
  let fixture: ComponentFixture<MovieCreateComponent>;
  let toastrService: ToastrService;
  let movieService: MovieService;
  let youtubeTrailersService: YoutubeTrailersService;
  let router: Router;

  beforeEach(async () => {
    const genresServiceMock = jasmine.createSpyObj('GenresService', [
      'getGenres',
    ]);
    genresServiceMock.getGenres.and.returnValue(of([]));

    const directorServiceMock = jasmine.createSpyObj('DirectorService', [
      'getDirectors',
    ]);
    directorServiceMock.getDirectors.and.returnValue(of([]));

    const youtubeTrailersServiceMock = jasmine.createSpyObj(
      'YoutubeTrailersService',
      ['addYoutubeTrailer']
    );
    youtubeTrailersServiceMock.addYoutubeTrailer.and.returnValue(
      of({
        id: '1',
        name: 'Test Trailer',
        url: 'https://example.com/trailer',
        duration: 120,
        channel: 'Test Channel',
      })
    );

    const movieServiceMock = jasmine.createSpyObj('MovieService', [
      'createMovie',
    ]);
    movieServiceMock.createMovie.and.returnValue(of({ id: 1 }));
    await TestBed.configureTestingModule({
      declarations: [MovieCreateComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
        RouterTestingModule,
      ],
      providers: [
        { provide: GenresService, useValue: genresServiceMock },
        { provide: DirectorService, useValue: directorServiceMock },
        {
          provide: YoutubeTrailersService,
          useValue: youtubeTrailersServiceMock,
        },
        { provide: MovieService, useValue: movieServiceMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MovieCreateComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    movieService = TestBed.inject(MovieService);
    youtubeTrailersService = TestBed.inject(YoutubeTrailersService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a movie', () => {
    const movie: Movie = {
      title: 'Test Movie',
      poster: 'https://example.com/poster.jpg',
      popularity: 5,
      duration: 120,
      country: 'Test Country',
      releaseDate: new Date(),
      genre: { id: '1', type: '' },
      director: new Director(
        faker.string.sample(10),
        faker.string.sample(10),
        faker.image.url(),
        faker.string.sample(10),
        faker.date.anytime(),
        faker.lorem.sentence(),
        undefined
      ),
      youtubeTrailer: {
        id: '1',
        name: 'Test Trailer',
        url: 'https://example.com/trailer',
        duration: 120,
        channel: 'Test Channel',
      },
    };

    component.createMovie(movie);

    expect(youtubeTrailersService.addYoutubeTrailer).toHaveBeenCalledWith(
      movie.youtubeTrailer!
    );
    expect(movieService.createMovie).toHaveBeenCalledWith(movie);
  });

  it('should cancel creation', () => {
    spyOn(component.movieForm, 'reset');

    component.cancelCreation();

    expect(component.movieForm.reset).toHaveBeenCalled();
  });
});

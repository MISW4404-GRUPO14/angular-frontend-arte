import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MovieService } from 'src/app/services/movies/movie.service';
import { MovieAsociatePlatformComponent } from './movie-asociate-platform.component';

describe('MovieAsociatePlatformComponent', () => {
  let component: MovieAsociatePlatformComponent;
  let fixture: ComponentFixture<MovieAsociatePlatformComponent>;
  let movieService: MovieService;
  let toastrService: ToastrService;

  const movieServiceMock = jasmine.createSpyObj('MovieService', [
    'asociatePlatform',
  ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieAsociatePlatformComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
      ],
      providers: [{ provide: MovieService, useValue: movieServiceMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(MovieAsociatePlatformComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

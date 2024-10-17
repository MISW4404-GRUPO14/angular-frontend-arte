import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReviewCreateComponent } from './movie-review-create.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MovieService } from 'src/app/services/movies/movie.service';
import { of } from 'rxjs';

describe('MovieReviewCreateComponent', () => {
  let component: MovieReviewCreateComponent;
  let fixture: ComponentFixture<MovieReviewCreateComponent>;
  let movieService: MovieService;
  let toastrService: ToastrService;

  const movieServiceMock = jasmine.createSpyObj('MovieService', [
    'createReview',
  ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieReviewCreateComponent],
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
    fixture = TestBed.createComponent(MovieReviewCreateComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a review', () => {
    const review = {
      creator: 'John Doe',
      text: 'This is a review',
      score: 5,
    };
    const resetSpy = spyOn(component.reviewForm, 'reset');
    movieServiceMock.createReview.and.returnValue(of({}));
    component.movieId = '1';
    component.createReview(review);

    expect(movieService.createReview).toHaveBeenCalledWith('1', review);
    expect(resetSpy).toHaveBeenCalled();
  });
});

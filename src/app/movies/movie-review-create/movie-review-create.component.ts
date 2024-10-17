import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Review } from 'src/app/models/review.model';
import { MovieService } from 'src/app/services/movies/movie.service';

@Component({
  selector: 'app-movie-review-create',
  templateUrl: './movie-review-create.component.html',
  styleUrls: ['./movie-review-create.component.css'],
})
export class MovieReviewCreateComponent implements OnInit {
  @Input() movieId?: string;
  @Output() closed = new EventEmitter<boolean>();
  reviewForm!: FormGroup;
  scores: number[] = Array.from(Array(5).keys()).map((i) => i + 1);

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      creator: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      text: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      score: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  createReview(review: Review) {
    this.movieService.createReview(this.movieId!, review).subscribe(() => {
      this.reviewForm.reset();
      this.toastr.success(
        $localize`:{created_review_message}:Reseña creada satisfactoriamente`,
        $localize`:{created_review}:Reseña creada`,
        {
          closeButton: true,
        }
      );
      this.closed.emit(true);
    });
  }
  cancelCreateReview() {
    this.closed.emit(false);
  }
}

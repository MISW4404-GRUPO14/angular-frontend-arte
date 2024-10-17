import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { Director } from 'src/app/models/director.model';
import { Genre } from 'src/app/models/genre.model';
import { Movie } from 'src/app/models/movie.model';
import { DirectorService } from 'src/app/services/directors/director.service';
import { GenresService } from 'src/app/services/genres/genres.service';
import { MovieService } from 'src/app/services/movies/movie.service';
import { YoutubeTrailersService } from 'src/app/services/youtube-trailers/youtube-trailers.service';
import * as validUrl from 'valid-url';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent implements OnInit {
  movieForm!: FormGroup;
  genres!: Genre[];
  directors!: Director[];
  moviesTitle: string = $localize`:{movies}:Películas`;
  createMovieTitle: string = $localize`:{create_movies}:Crear Película`;
  homeTitle: string = $localize`:{home}:Inicio`;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private genreService: GenresService,
    private directorService: DirectorService,
    private youtubeTrailerService: YoutubeTrailersService,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      poster: ['', [Validators.required, this.urlValidator]],
      popularity: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      duration: [
        '',
        [Validators.required, Validators.min(1), Validators.max(1000)],
      ],
      country: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(56),
        ],
      ],
      releaseDate: ['', [Validators.required]],
      genre: this.formBuilder.group({
        id: ['', [Validators.required]],
      }),
      director: this.formBuilder.group({
        id: ['', [Validators.required]],
      }),
      youtubeTrailer: this.formBuilder.group({
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
          ],
        ],
        url: ['', [Validators.required, this.urlValidator]],
        duration: [
          '',
          [Validators.required, Validators.min(1), Validators.max(1000)],
        ],
        channel: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
          ],
        ],
      }),
    });
    this.genreService.getGenres().subscribe((a) => (this.genres = a));
    this.directorService.getDirectors().subscribe((a) => (this.directors = a));
  }
  breadcrumbItems: BreadcrumbItem[] = [
    {
      label: this.homeTitle,
      link: '/',
    },
    {
      label: this.moviesTitle,
      link: '/' + $localize`:{movies_path}:peliculas`,
    },
    {
      label: this.createMovieTitle,
    },
  ];

  urlValidator(control: FormControl) {
    if (control.value && !validUrl.isWebUri(control.value)) {
      return { invalidUrl: true };
    }
    return null;
  }

  createMovie(movie: Movie) {
    this.youtubeTrailerService
      .addYoutubeTrailer(movie.youtubeTrailer!)
      .subscribe((t) => {
        movie.youtubeTrailer = t;
        this.movieService.createMovie(movie).subscribe((a) => {
          this.movieForm.reset();
          const toast = this.toastr.success(
            $localize`:{created_movie_click}:Para ver la película de click en este mensaje`,
            $localize`:{created_movie}:Película creada`,
            {
              closeButton: true,
              disableTimeOut: true,
            }
          );
          toast.onTap.subscribe(() => {
            this.router.navigate([$localize`:{movies_path}:peliculas`, a.id]);
          });
        });
      });
  }
  cancelCreation() {
    this.movieForm.reset();
  }
}

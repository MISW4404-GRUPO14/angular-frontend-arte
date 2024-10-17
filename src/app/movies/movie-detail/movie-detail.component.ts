import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movies/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  allMovies: Movie[] = [];
  viewList: boolean = false;
  isCreateReviewOpen: boolean = false;
  isPlatformOpen: boolean = false;
  breadcrumbTitle: string = $localize`:{movies}:Películas`;
  homeTitle: string = $localize`:{home}:Inicio`;
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe((m) => {
      this.allMovies = m;
    });
  }
  get breadcrumbItems(): BreadcrumbItem[] {
    return [
      {
        label: this.homeTitle,
        link: '/',
      },
      {
        label: this.breadcrumbTitle,
        link: '/' + $localize`:{movies_path}:peliculas`,
      },
      {
        label: this.selectedMovie?.title ?? '',
      },
    ];
  }

  get selectedMovie() {
    this.viewList = false;
    const movie = this.allMovies.find(
      (q) => q.id === this.activatedRoute.snapshot.params.id
    );

    this.titleService.setTitle(`${movie?.title}`);
    return movie;
  }

  toggleMenu() {
    this.viewList = !this.viewList;
  }
  openCreateReview() {
    this.isCreateReviewOpen = true;
  }
  openPlatfoms() {
    this.isPlatformOpen = true;
  }
  closeCreateReview(refresh: boolean) {
    this.isCreateReviewOpen = false;
    this.isPlatformOpen = false;
    if (refresh) {
      this.getMovies();
    }
  }
  aria(movie: Movie) {
    return $localize`Ver detalle de película ${movie.title}:nombre_pelicula:`;
  }

}

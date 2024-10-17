import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movies/movie.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: [],
})
export class MovieListComponent implements OnInit {
  allMovies: Movie[] = [];
  breadcrumbItems: BreadcrumbItem[] = [];
  movies: Movie[] = [];
  title: string = $localize`:{movie_list}:Listado películas`;
  breadcrumbTitle: string = $localize`:{movies}:Películas`;
  homeTitle: string = $localize`:{home}:Inicio`;
  createLink: string = './' + $localize`:{create_movie_path}:crear`;
  constructor(
    private movieService: MovieService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.breadcrumbItems = [
      {
        label: this.homeTitle,
        link: '/',
      },
      {
        label: this.breadcrumbTitle,
      },
    ];
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe((m) => {
      this.allMovies = m;
    });
  }

  onChangePage(movies: Movie[]) {
    // update current page of items
    this.movies = movies;
  }
}

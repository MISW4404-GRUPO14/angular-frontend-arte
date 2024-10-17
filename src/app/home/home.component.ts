import { Component, OnInit } from '@angular/core';
import { ActoresService } from '../services/actores/actores.service';
import { MovieService } from '../services/movies/movie.service';
import { DirectorService } from '../services/directors/director.service';
import { Movie } from '../models/movie.model';
import { Actor } from '../models/actor.model';
import { Director } from '../models/director.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  actors: Actor[] = [];
  directors: Director[] = [];
  movie_path:string = $localize`:{movies_path}:peliculas`;
  constructor(
    private movieService: MovieService,
    private actorsService: ActoresService,
    private directorsService: DirectorService
  ) {}

  ngOnInit(): void {
    this.getHomeInfo();
  }

  getHomeInfo() {
    this.movieService.getMovies().subscribe((m) => {
      this.movies = m.slice(0, 4);
    });
    this.actorsService.getActors().subscribe((m) => {
      this.actors = m.slice(0, 3);
    });
    this.directorsService.getDirectors().subscribe((m) => {
      this.directors = m.slice(0, 3);
    });
  }
}

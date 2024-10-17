import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;

  aria: string = '';
  movie_path: string = $localize`:{movies_path}:peliculas`;
  constructor() {}

  ngOnInit(): void {
    this.aria = $localize`Ver detalle de película ${this.movie.title}:nombre_pelicula:`;
  }
}

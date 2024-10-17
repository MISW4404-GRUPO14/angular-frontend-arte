import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { Review } from 'src/app/models/review.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesApiUrl: string = environment.baseUrl + 'movies';
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesApiUrl).pipe(
      map((movies) => {
        return [...movies].sort((a, b) => {
          return b.popularity - a.popularity;
        });
      })
    );
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesApiUrl, movie);
  }

  createReview(movieId: string, review: Review): Observable<Review> {
    return this.http.post<Review>(
      `${this.moviesApiUrl}/${movieId}/reviews`,
      review
    );
  }

  asociatePlatform(movieId: string, idPlatform: string): Observable<Movie> {
    return this.http.post<Movie>(
      this.moviesApiUrl + '/' + movieId + '/platforms/' + idPlatform,
      ''
    );
  }
}

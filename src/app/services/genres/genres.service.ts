import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Genre } from 'src/app/models/genre.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private genreApiUrl: string = environment.baseUrl + 'genres';
  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genreApiUrl).pipe(
      map((genres) => {
        return [...genres].sort((a, b) => {
          return a.type.localeCompare(b.type);
        });
      })
    );
  }
}

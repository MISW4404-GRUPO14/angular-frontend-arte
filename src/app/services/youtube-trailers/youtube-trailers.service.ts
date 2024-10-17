import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { YoutubeTrailer } from 'src/app/models/youtube-trailer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class YoutubeTrailersService {
  private youtubeTrailerApiUrl: string =
    environment.baseUrl + 'youtube-trailers';
  constructor(private http: HttpClient) {}

  getYoutubeTrailers(): Observable<YoutubeTrailer[]> {
    return this.http.get<YoutubeTrailer[]>(this.youtubeTrailerApiUrl).pipe(
      map((youtubeTrailer) => {
        return [...youtubeTrailer].sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      })
    );
  }

  addYoutubeTrailer(trailer: YoutubeTrailer): Observable<YoutubeTrailer> {
    return this.http.post<YoutubeTrailer>(this.youtubeTrailerApiUrl, trailer);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Director } from 'src/app/models/director.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class DirectorService {
  private directorsApiUrl: string = environment.baseUrl + 'directors';
  constructor(private http: HttpClient) {}

  getDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(this.directorsApiUrl);
  }

  createDirector(director: Director): Observable<Director> {
    return this.http.post<Director>(this.directorsApiUrl, director);
 }

}

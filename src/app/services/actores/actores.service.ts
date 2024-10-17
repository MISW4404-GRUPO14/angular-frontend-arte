import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from 'src/app/models/actor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {
  private actoresApiUrl: string = environment.baseUrl + 'actors';

  constructor(private http: HttpClient) { }

  getActors(): Observable<Actor[]>{
    return this.http.get<Actor[]>(this.actoresApiUrl);
  }
  getActor(id:string ): Observable<Actor> {

    return this.http.get<Actor>(this.actoresApiUrl+'/'+id);
  }

  createActor(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(this.actoresApiUrl, actor);
  }

  asociateMovie(actor: Actor, idMovie:string): Observable<Actor>{
    return this.http.post<Actor>(this.actoresApiUrl+'/'+actor.id+'/movies/'+idMovie ,'');
  }
}

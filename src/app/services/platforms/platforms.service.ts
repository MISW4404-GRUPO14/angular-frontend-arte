import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Platform } from 'src/app/models/platform.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private platformApiUrl: string = environment.baseUrl + 'platforms';
  constructor(private http: HttpClient) {}

  getPlatforms(): Observable<Platform[]> {
    return this.http.get<Platform[]>(this.platformApiUrl);
  }
}

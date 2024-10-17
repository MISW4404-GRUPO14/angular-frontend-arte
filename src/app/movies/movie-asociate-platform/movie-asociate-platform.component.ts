import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Platform } from 'src/app/models/platform.model';
import { MovieService } from 'src/app/services/movies/movie.service';
import { PlatformService } from 'src/app/services/platforms/platforms.service';

@Component({
  selector: 'app-movie-asociate-platform',
  templateUrl: './movie-asociate-platform.component.html',
  styleUrls: ['./movie-asociate-platform.component.css']
})
export class MovieAsociatePlatformComponent implements OnInit {
  @Input() movieId?: string;
  @Output() closed = new EventEmitter<boolean>();
  platforms: Platform[] = [];

  constructor(
    private platformService: PlatformService,
    private movieService: MovieService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPlatforms();

  }
  getPlatforms(): void {
    this.platformService.getPlatforms().subscribe((platforms) =>{
      this.platforms=platforms;
    })
  }
  asociatePlatform(idPlatform:string){
    this.movieService.asociatePlatform(this.movieId!, idPlatform).subscribe(movie=>{
      this.toastr.success("Confirmation", "Plataforma asociada")
      this.closed.emit(true);
    })
  }
}

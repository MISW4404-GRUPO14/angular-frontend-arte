import { Component, OnInit } from '@angular/core';
import { Actor } from '../../models/actor.model';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { ActoresService } from 'src/app/services/actores/actores.service';
import { Title } from '@angular/platform-browser';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movies/movie.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css'],
})
export class ActorDetailComponent implements OnInit {
  breadcrumbItems: BreadcrumbItem[] = [];
  actor: Actor | any;
  id: string | any;
  listado = false;
  allMovies: Movie[] = [];
  searchText:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private actoresServices: ActoresService,
    private movieService: MovieService,
    private titleService: Title,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.breadcrumbItems = [
      {
        label: 'Inicio',
        link: '/',
      },
    ];
    if (
      this.activatedRoute.snapshot.data &&
      this.activatedRoute.snapshot.data.menu
    ) {
      this.breadcrumbItems.push({
        label: this.activatedRoute.snapshot.data.menu,
      });
    }
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getActor();
    this.getMovies()
  }

  getActor(): void {
    this.actoresServices.getActor(this.id).subscribe((a) => {
      this.titleService.setTitle(`Actor: ${a.name}`);
      this.actor = a;
    });
  }
  openListado(){
    this.listado = true
    this.searchText =""
  }
  closeListado(){
    this.listado = false
  }
  getMovies(): void {
    this.movieService.getMovies().subscribe((m) => {
      this.allMovies = m;
    });
  }
  asociateMovie(idMovie:string){
    this.actoresServices.asociateMovie(this.actor,idMovie).subscribe(actor=>{
      this.toastr.success("Confirmation", "Película asociada")
      this.getActor()
    })
  }
}

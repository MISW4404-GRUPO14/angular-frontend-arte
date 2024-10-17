
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { ActoresService } from 'src/app/services/actores/actores.service';
import { Actor } from '../../models/actor.model';


@Component({
  selector: 'app-actores-list',
  templateUrl: './actores-list.component.html',
  styleUrls: ['./actores-list.component.css']
})
export class ActoresListComponent implements OnInit {

  breadcrumbItems: BreadcrumbItem[] = [];
  allActores: Actor[] = [];
  actores: Actor[] = [];

  constructor(
    private actoresServices: ActoresService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
   }

  ngOnInit(): void {
    this.titleService.setTitle('Listado Actores')
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
    this.getActores();
  }

  getActores(): void {
    this.actoresServices.getActors().subscribe((a) => {
      this.allActores = a
    });
  }
  onChangePage(actores: Actor[]) {
    // update current page of items
    this.actores = actores
  }


}

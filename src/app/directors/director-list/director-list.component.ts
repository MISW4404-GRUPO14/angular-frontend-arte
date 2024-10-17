import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { DirectorService } from 'src/app/services/directors/director.service';
import { Director } from 'src/app/models/director.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-director-list',
  templateUrl: './director-list.component.html',
  styleUrls: [],
})

export class DirectorListComponent implements OnInit {
  directors: Director[] = [];
  breadcrumbItems: BreadcrumbItem[] = [];
  pageOfItems?: Array<any>;
  crearIsOpened:boolean = false;
  constructor(
    private directorService: DirectorService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
      titleService.setTitle('Listado Directores')
  }

  ngOnInit(): void {
    this.crearIsOpened = false;

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
    this.getDirectors();
  }

  getDirectors(): void {
    this.directorService.getDirectors().subscribe((directors) =>{
      this.directors=directors;
    })
  }
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  crearDirector() {
    this.crearIsOpened = !this.crearIsOpened;
  }
}

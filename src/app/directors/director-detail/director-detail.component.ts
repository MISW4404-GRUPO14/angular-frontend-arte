import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Director } from 'src/app/models/director.model';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { DirectorDetalleService } from 'src/app/services/directors/directorDetalle.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrls: ['./director-detail.component.css'],
})
export class DirectorDetailComponent implements OnInit {
  breadcrumbItems: BreadcrumbItem[] = [];
  id: any = '';
  directors: Director = new Director('', '', '', '', new Date(), '');
  constructor(
    private directorDetalleService: DirectorDetalleService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

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
    this.getDirector();
  }

  getDirector(): void {
    this.directorDetalleService.getDirector(this.id).subscribe((directors) => {
      this.titleService.setTitle(`Director: ${directors.name}`);
      this.directors = directors;
    });
  }
}

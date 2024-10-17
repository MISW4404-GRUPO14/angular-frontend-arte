import { Component, Input, OnInit } from '@angular/core';
import { Director } from 'src/app/models/director.model';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.css'],
})
export class DirectorCardComponent implements OnInit {
  @Input() director!: Director;

  label: string = '';
  pathD: string = $localize`:{pathD}:directores`;
  constructor() {}

  ngOnInit(): void {
    this.label = `Ver detalle de director: ${this.director.name}:nombre_director:`;
  }
}

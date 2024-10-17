import { Component, Input, OnInit } from '@angular/core';
import { Director } from 'src/app/models/director.model';

@Component({
  selector: 'app-director2-card',
  templateUrl: './director2-card.component.html',
  styleUrls: [],
})
export class Director2CardComponent implements OnInit {
  @Input() director!: Director;

  constructor() {}

  ngOnInit(): void {}
}

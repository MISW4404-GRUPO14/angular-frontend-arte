import { Component, Input, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-actor2-card',
  templateUrl: './actor2-card.component.html',
  styleUrls: [],
})
export class Actor2CardComponent implements OnInit {
  @Input() actor!: Actor;

  aria: string = '';
  constructor() {}

  ngOnInit(): void {
    this.aria = $localize`Ver detalle de actor ${this.actor.name}:nombre_actor:`;
  }
}

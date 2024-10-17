import { Component, Input ,OnInit } from '@angular/core';
import { Actor } from '../../models/actor.model';


@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css']
})
export class ActorCardComponent implements OnInit {
  @Input() actor!: Actor;
  constructor() { }

  ngOnInit(): void {
  }

}

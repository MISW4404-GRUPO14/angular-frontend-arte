
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorsRoutingModule } from './actors-routing.module';
import { ActoresListComponent } from './actores-list/actores-list.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { ActorCreateComponent } from './actor-create/actor-create.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    ActoresListComponent, ActorDetailComponent, ActorCreateComponent
  ],
  imports: [
    CommonModule,
    ActorsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class ActorsModule { }

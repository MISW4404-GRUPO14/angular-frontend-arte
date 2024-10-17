import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActoresListComponent } from './actores-list/actores-list.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { ActorCreateComponent } from './actor-create/actor-create.component';

const routes: Routes = [{ path: 'create', component: ActorCreateComponent},{ path: '', component: ActoresListComponent },{ path: ':id', component: ActorDetailComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsRoutingModule { }

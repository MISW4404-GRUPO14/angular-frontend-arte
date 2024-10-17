import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorListComponent } from './director-list/director-list.component';
import { DirectorDetailComponent } from './director-detail/director-detail.component';
import { DirectorCreateComponent } from './director-create/director-create.component';

const routes: Routes = [{ path: '', component: DirectorListComponent },{ path: '', component: DirectorCreateComponent },{ path: ':id', component: DirectorDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectorsRoutingModule {}

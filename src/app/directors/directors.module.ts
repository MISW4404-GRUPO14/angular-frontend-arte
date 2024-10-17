import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorsRoutingModule } from './director-routing.module';
import { DirectorListComponent } from './director-list/director-list.component';
import { SharedModule } from '../shared/shared.module';
import { DirectorDetailComponent } from './director-detail/director-detail.component';
import { DirectorCreateComponent } from './director-create/director-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DirectorListComponent, DirectorDetailComponent, DirectorCreateComponent],
  imports: [CommonModule, DirectorsRoutingModule, SharedModule, ReactiveFormsModule],
})
export class DirectorsModule {}

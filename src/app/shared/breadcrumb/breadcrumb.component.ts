import { Component, Input } from '@angular/core';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [],
})
export class BreadcrumbComponent {
  @Input() breadcrumbItems: BreadcrumbItem[] = [];
}

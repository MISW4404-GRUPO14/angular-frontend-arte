import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { Director } from 'src/app/models/director.model';
import { faker } from '@faker-js/faker';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DirectorDetailComponent } from './director-detail.component';
import { ActivatedRoute } from '@angular/router';
import { DirectorDetalleService } from 'src/app/services/directors/directorDetalle.service';
import { DirectorListComponent } from '../director-list/director-list.component';
import { DirectorCardComponent } from 'src/app/shared/director-card/director-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

describe('DirectorDetailComponent', () => {
  let component: DirectorDetailComponent;
  let fixture: ComponentFixture<DirectorDetailComponent>;
  let debug: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule, RouterTestingModule],
      declarations: [DirectorListComponent, DirectorCardComponent],
      providers: [
        DirectorDetalleService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                has: () => false,
                get: () => null,
              },
              url: [{ path: 'directores' }],
              data: {
                menu: 'Directores',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorDetailComponent);
    component = fixture.componentInstance;
    component.directors= new Director(
      faker.string.sample(10),
      faker.string.sample(10),
      faker.image.url(),
      faker.string.sample(10),
      faker.date.anytime(),
      faker.lorem.sentence(),
      undefined,
    );

    fixture.detectChanges();
    debug = fixture.debugElement;

  });
});


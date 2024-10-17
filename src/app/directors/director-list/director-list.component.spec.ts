import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectorListComponent } from './director-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { Director } from 'src/app/models/director.model';
import { faker } from '@faker-js/faker';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { DirectorCardComponent } from '../../shared/director-card/director-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DirectorService } from 'src/app/services/directors/director.service';
import { ActivatedRoute } from '@angular/router';

describe('DirectorListComponent', () => {
  let component: DirectorListComponent;
  let fixture: ComponentFixture<DirectorListComponent>;
  let debug: DebugElement;
  let pagination: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule, RouterTestingModule],
      declarations: [DirectorListComponent, DirectorCardComponent],
      providers: [
        DirectorService,
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
    fixture = TestBed.createComponent(DirectorListComponent);
    component = fixture.componentInstance;

    for (let i = 0; i < 100; i++) {
      const director = new Director(
        faker.string.sample(10),
        faker.string.sample(10),
        faker.image.url(),
        faker.string.sample(10),
        faker.date.anytime(),
        faker.lorem.sentence(),
        undefined,
      );
      component.directors.push(director);
    }
    fixture.detectChanges();
    pagination = fixture.debugElement.query(By.css('app-pagination'));
    pagination.triggerEventHandler(
      'changePage',
      component.directors.slice(0, 24)
    );
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display breadcrumb items correctly', () => {
    fixture.detectChanges();

    const expectedBreadcrumbItems: BreadcrumbItem[] = [
      {
        label: 'Inicio',
        link: '/',
      },
      {
        label: 'Directores',
      },
    ];

    expect(component.breadcrumbItems).toEqual(expectedBreadcrumbItems);
  });

  it('should display title page', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toContain('Listado de Directores');
  });

  it('should have the corresponding src to the director poster and alt to the director name', () => {
    debug.queryAll(By.css('.container img')).forEach((img, i) => {
      expect(img.attributes['src']).toEqual(component.directors[i].photo);
      expect(img.attributes['alt']).toEqual(component.directors[i].name);
    });
  });


});

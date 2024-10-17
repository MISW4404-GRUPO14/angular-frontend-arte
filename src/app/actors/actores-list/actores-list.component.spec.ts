import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActoresListComponent } from './actores-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ActoresService } from 'src/app/services/actores/actores.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbItem } from 'src/app/models/breadcrumb-item.model';
import { Actor } from 'src/app/models/actor.model';
import { faker } from '@faker-js/faker';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ActorCardComponent } from '../../shared/actor-card/actor-card.component';




describe('ActoresListComponent', () => {
  let component: ActoresListComponent;
  let fixture: ComponentFixture<ActoresListComponent>;
  let debug: DebugElement;
  let pagination: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule, RouterTestingModule],
      declarations: [ ActoresListComponent, ActorCardComponent],
      providers: [
        ActoresService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                has: () => false,
                get: () => null,
              },
              url: [{ path: 'actores' }],
              data: {
                menu: 'Actores',
              },
            },
          },
        },
      ],


    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActoresListComponent);
    component = fixture.componentInstance;

    for (let i = 0; i < 100; i++) {
      const actor = new Actor(
        faker.string.sample(10),
        faker.string.sample(10),
        faker.image.url(),
        faker.string.sample(10),
        faker.date.anytime(),
        faker.lorem.sentence(),
        undefined,
      );
      component.actores.push(actor);
    }
    fixture.detectChanges();
    pagination = fixture.debugElement.query(By.css('app-pagination'));
    pagination.triggerEventHandler(
      'changePage',
      component.actores.slice(0, 20)
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
        label: 'Actores',
      },
    ];
    expect(component.breadcrumbItems).toEqual(expectedBreadcrumbItems);
  });

  it('should display title page', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toContain('Listado de actores');
  });


  it('should have 20 actors cards elements', () => {
    // expect the correct number of movie cards to be displayed
    expect(component.actores.length).toEqual(20);
  });


  it('should have the corresponding src to the actor poster and alt to the actor name', () => {
    debug.queryAll(By.css('.container img')).forEach((img, i) => {
      expect(img.attributes['src']).toEqual(component.actores[i].photo);
      expect(img.attributes['alt']).toEqual(component.actores[i].name);
    });
  });

});

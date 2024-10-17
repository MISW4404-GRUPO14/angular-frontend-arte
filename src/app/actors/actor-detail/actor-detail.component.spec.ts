/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { faker } from '@faker-js/faker';
import { ToastrModule } from 'ngx-toastr';

import { ActorDetailComponent } from './actor-detail.component';
import { Actor } from '../../models/actor.model';


describe('ActorDetailComponent', () => {
  let component: ActorDetailComponent;
  let fixture: ComponentFixture<ActorDetailComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientModule, SharedModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [ ActorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorDetailComponent);
    component = fixture.componentInstance;

    component.actor = new Actor(
      faker.string.sample(10),
        faker.string.sample(10),
        faker.image.url(),
        faker.string.sample(10),
        faker.date.anytime(),
        faker.lorem.sentence(),
        undefined,
    )

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a h3.name element with actorDetail.name', () => {
    const element: HTMLElement = debug.query(By.css('h3.name')).nativeElement;
    expect(element.textContent).toContain(component.actor.name);
  });
  it('should have an img element with src= actorDetail.image', () => {
    expect(debug.query(By.css('img')).attributes['src']).toEqual(
      component.actor.photo
    );
  });

  it('should have an img element with alt= actorDetail.name', () => {
    expect(debug.query(By.css('img')).attributes['alt']).toEqual(
      component.actor.name
    );
  });
  it('should have a p.biography element with actorDetail.biography', () => {
    const element: HTMLElement = debug.query(By.css('p.biography')).nativeElement;
    expect(element.textContent).toContain(component.actor.biography);
  });

});

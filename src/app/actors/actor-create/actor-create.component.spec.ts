/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActorCreateComponent } from './actor-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ActorCreateComponent', () => {
  let component: ActorCreateComponent;
  let fixture: ComponentFixture<ActorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActorCreateComponent],
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        RouterTestingModule,
        SharedModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.actorForm.valid).toBeFalsy();
  });
  it('name field validity', () => {
    let errors = {};
    let name = component.actorForm.controls['name'];
    expect(name.valid).toBeFalsy();

    errors = name.errors || {};
    expect(errors).toBeTruthy();

    name.setValue('test');
    errors = name.errors || {};
    expect(errors).toBeTruthy();
  });
  it('photo field validity', () => {
    let errors = {};
    let photo = component.actorForm.controls['photo'];
    expect(photo.valid).toBeFalsy();

    errors = photo.errors || {};
    expect(errors).toBeTruthy();

    // Set photo to something correct
    photo.setValue(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Russell_Crowe_%2833994246374%29.jpg/220px-Russell_Crowe_%2833994246374%29.jpg'
    );
    errors = photo.errors || {};
    expect(errors).toBeTruthy();
  });
  it('nationality field validity', () => {
    let errors = {};
    let nationality = component.actorForm.controls['nationality'];
    expect(nationality.valid).toBeFalsy();

    errors = nationality.errors || {};
    expect(errors).toBeTruthy();

    // Set nationality to something correct
    nationality.setValue('Colombia');
    errors = nationality.errors || {};
    expect(errors).toBeTruthy();
  });
  it('biography field validity', () => {
    let errors = {};
    let biography = component.actorForm.controls['biography'];
    expect(biography.valid).toBeFalsy();

    errors = biography.errors || {};
    expect(errors).toBeTruthy();

    // Set biography to something correct
    biography.setValue('Colombia');
    errors = biography.errors || {};
    expect(errors).toBeTruthy();
  });
});

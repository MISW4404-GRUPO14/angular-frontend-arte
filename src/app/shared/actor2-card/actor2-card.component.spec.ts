import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actor2CardComponent } from './actor2-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Actor2CardComponent', () => {
  let component: Actor2CardComponent;
  let fixture: ComponentFixture<Actor2CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Actor2CardComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Actor2CardComponent);
    component = fixture.componentInstance;
    component.actor = {
      id: '1',
      name: 'Rusell Crowe',
      photo: 'https://picsum.photos/300/300',
      nationality: 'Neozelandés',
      biography:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id lacinia mi, vel eleifend sapien. Integer scelerisque facilisis volutpat. Vivamus pulvinar egestas sagittis. Integer eu massa augue. Proin tortor turpis, lobortis eu tempor vel, maximus non leo. ',
      birthDate: new Date('1969-07-02'),
      movies: [
        {
          id: '2',
          title: 'The Godfather',
          poster: 'https://www.example.com/the-godfather.jpg',
          duration: 175,
          country: 'USA',
          releaseDate: new Date('1972-03-24T00:00:00Z'),
          popularity: 9.2,
        },
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

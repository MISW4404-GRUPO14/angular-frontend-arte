import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorCardComponent } from './actor-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActorCardComponent', () => {
  let component: ActorCardComponent;
  let fixture: ComponentFixture<ActorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActorCardComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorCardComponent);
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

  it('should display actor name', () => {
    const title = fixture.nativeElement.querySelector('.card-name');
    expect(title.textContent).toContain(component.actor.name);
  });
});

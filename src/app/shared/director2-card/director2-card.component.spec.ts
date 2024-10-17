import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Director2CardComponent } from './director2-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Director2CardComponent', () => {
  let component: Director2CardComponent;
  let fixture: ComponentFixture<Director2CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Director2CardComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Director2CardComponent);
    component = fixture.componentInstance;
    component.director = {
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

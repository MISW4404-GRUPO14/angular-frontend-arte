import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectorCardComponent } from './director-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DirectorCardComponent', () => {
  let component: DirectorCardComponent;
  let fixture: ComponentFixture<DirectorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectorCardComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorCardComponent);
    component = fixture.componentInstance;
    component.director = {
      id:'1',
      name: 'Ursula Trippitt',
      photo: 'http://dummyimage.com/161x100.png/dddddd/000000',
      nationality: 'Egypt',
      biography: 'Stand-alone user-facing process improvement. ',
      birthDate: new Date('1939-12-05'),
      movies:
          [
            {
              id: '2',
              title: 'Godzilla',
              poster: 'https://www.example.com/the-godfather.jpg',
              duration: 3,
              country: 'Indonesia',
              releaseDate: new Date('1972-03-24T00:00:00Z'),
              popularity: 3
            }
          ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

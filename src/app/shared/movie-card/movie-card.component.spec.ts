import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = {
      id: '2',
      title: 'The Godfather',
      poster: 'https://www.example.com/the-godfather.jpg',
      duration: 175,
      country: 'USA',
      releaseDate: new Date('1972-03-24T00:00:00Z'),
      popularity: 9.2,
      genre: {
        id: '1',
        type: 'Drama',
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movie title', () => {
    const title = fixture.nativeElement.querySelector('.card-title');
    expect(title.textContent).toContain(component.movie.title);
  });

  it('should display movie genre', () => {
    const genre = fixture.nativeElement.querySelector('.badge');
    expect(genre.textContent).toContain(component.movie.genre?.type);
  });

  it('should display movie release year', () => {
    const releaseYear = fixture.nativeElement.querySelector(
      '.release-date span:last-child'
    );
    expect(releaseYear.textContent).toContain(
      component.movie.releaseDate.getFullYear().toString()
    );
  });
});

import { Person } from './person.model';
import { Movie } from './movie.model';


export class Actor extends Person {
  movies?: Movie[];
  constructor(
    id: string,
    name: string,
    photo: string,
    nationality: string,
    birthDate: Date,
    biography: string,
    movies?: Movie[]
  ){
    super(id,name, photo, nationality, birthDate, biography);
    this.movies = movies;
  }


}

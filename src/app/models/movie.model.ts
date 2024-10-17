import { Actor } from './actor.model';
import { Director } from './director.model';
import { Genre } from './genre.model';
import { Person } from './person.model';
import { Platform } from './platform.model';
import { Review } from './review.model';
import { YoutubeTrailer } from './youtube-trailer.model';

export class Movie {
  id?: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: Date;
  popularity: number;
  director?: Director;
  actors?: Actor[];
  genre?: Genre;
  platforms?: Platform[];
  reviews?: Review[];
  youtubeTrailer?: YoutubeTrailer;
  constructor(
    id: string,
    title: string,
    poster: string,
    duration: number,
    country: string,
    releaseDate: Date,
    popularity: number,
    director?: Person,
    actors?: Person[],
    genre?: Genre,
    platforms?: Platform[],
    reviews?: Review[],
    youtubeTrailer?: YoutubeTrailer
  ) {
    this.id = id;
    this.title = title;
    this.poster = poster;
    this.duration = duration;
    this.country = country;
    this.releaseDate = releaseDate;
    this.popularity = popularity;
    this.director = director;
    this.actors = actors;
    this.genre = genre;
    this.platforms = platforms;
    this.reviews = reviews;
    this.youtubeTrailer = youtubeTrailer;
  }
}

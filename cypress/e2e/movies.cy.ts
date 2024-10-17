import { MovieListPage } from '../page/movie.list.page';
import { HomePage } from '../page/home.page';
import { MovieDetailPage } from '../page/movie.detail.page';
import { faker } from '@faker-js/faker';
import { MovieCreatePage } from '../page/movie.create.page';

const home = new HomePage();
const movieList = new MovieListPage();
const movieDetail = new MovieDetailPage();
const movieCreate = new MovieCreatePage();
context('Movies e2e', () => {
  it('Validate if the movie listing page is displayed correctly.', () => {
    home.visit();
    home.moviesLink.click();
    movieList.heading1.should('have.text', 'Listado películas');
    movieList.movies.should('have.length', 24);
  });

  it('Validate if the movie detail page is displayed correctly', () => {
    home.visit();
    home.moviesLink.click();
    const ridx = Math.floor(Math.random() * 24);
    movieList
      .getMovieByIdx(ridx)
      .find('h2')
      .invoke('text')
      .then((t: string) => {
        movieList.getMovieByIdx(ridx).find('a').click({ force: true });
        movieDetail.heading1.should('have.text', t);
      });
  });

  it('Validate create review', () => {
    home.visit();
    home.moviesLink.click();
    const ridx = Math.floor(Math.random() * 24);
    movieList.getMovieByIdx(ridx).find('a').click({ force: true });
    movieDetail.createReviewBtn.click({ force: true });
    const reviewData = {
      creator: faker.person.fullName(),
      text: faker.lorem.paragraph(),
      score: faker.number.int({ min: 0, max: 4 }),
    };
    movieDetail.reviewerName.type(reviewData.creator);
    movieDetail.reviewText.type(reviewData.text);
    movieDetail.reviewScore.eq(reviewData.score).click();
    movieDetail.reviewSubmit.click();
    cy.wait(3000);
    movieDetail
      .getReview(reviewData.creator)
      .eq(0)
      .find('strong')
      .should('include.text', reviewData.score + 1);
    movieDetail
      .getReview(reviewData.creator)
      .eq(1)
      .should('include.text', reviewData.creator);
    movieDetail
      .getReview(reviewData.creator)
      .eq(2)
      .should('include.text', reviewData.text);
  });

  it('Validate create a movie', () => {
    home.visit();
    home.moviesLink.click();
    movieList.createMovie.click();
    movieCreate.heading1.should('have.text', 'Crear Película');

    const movieToCreate = {
      title: faker.person.fullName(),
      poster: faker.image.urlLoremFlickr({ width: 1070, height: 1000 }),
      duration: faker.number.int(120),
      popularity: 100,
      country: faker.location.country(),
      releaseDate: faker.date.past().toISOString().split('T')[0],
      genre: 'Comedy',
      director: 'Vanessa Wadeson',
      ytName: faker.person.fullName(),
      ytUrl: faker.internet.url(),
      ytDuration: faker.number.int(10),
      ytChannel: faker.internet.displayName(),
    };

    movieCreate.title.type(movieToCreate.title);
    movieCreate.poster.type(movieToCreate.poster);
    movieCreate.duration.type(movieToCreate.duration);
    movieCreate.popularity.type(movieToCreate.popularity);
    movieCreate.country.type(movieToCreate.country);
    movieCreate.releaseDate.type(movieToCreate.releaseDate);
    movieCreate.genre.select(movieToCreate.genre);
    movieCreate.director.select(movieToCreate.director);
    movieCreate.ytName.type(movieToCreate.ytName);
    movieCreate.ytUrl.type(movieToCreate.ytUrl);
    movieCreate.ytDuration.type(movieToCreate.ytDuration);
    movieCreate.ytChannel.type(movieToCreate.ytChannel);
    movieCreate.submitBtn.click();
    cy.wait(3000);
    home.moviesLink.click();
    movieList.getMovieByTitle(movieToCreate.title).click();
    movieDetail.movieInfo.should('contain.text', movieToCreate.title);
    movieDetail.movieInfo.should('contain.text', movieToCreate.director);
    movieDetail.movieInfo.should('contain.text', movieToCreate.duration);
    movieDetail.movieInfo.should('contain.text', movieToCreate.popularity);
    movieDetail.movieInfo.should('contain.text', movieToCreate.country);
    movieDetail.movieInfo.should('contain.text', movieToCreate.genre);
  });
});

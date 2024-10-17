export class MovieListPage {
  public get heading1(): any {
    return cy.get('h1');
  }
  public get movies(): any {
    return cy.get('app-movie-card');
  }
  public get createMovie(): any {
    return cy.contains('a', 'Crear Película');
  }
  public getMovieByIdx(idx: number): any {
    return cy.get('app-movie-card').eq(idx);
  }
  public getMovieByTitle(title: string): any {
    return cy.get('app-movie-card').contains(title);
  }
}

export class MovieDetailPage {
  public get heading1(): any {
    return cy.get('h1');
  }

  public get createReviewBtn(): any {
    return cy.contains('button', 'Crear Reseña');
  }

  public get reviewerName(): any {
    return cy.contains('h3', 'Crear Reseña').parent().find('#creator');
  }
  public get reviewText(): any {
    return cy.contains('h3', 'Crear Reseña').parent().find('#text');
  }
  public get reviewScore(): any {
    return cy
      .contains('h3', 'Crear Reseña')
      .parent()
      .get('input[formcontrolname="score"]');
  }
  public get reviewSubmit(): any {
    return cy
      .contains('h3', 'Crear Reseña')
      .parent()
      .get('button[type="submit"]');
  }
  public get movieInfo(): any {
    return cy.get('.movie-info');
  }
  public getReview(reviewer: string): any {
    return cy.contains('.review div', reviewer).parent().children();
  }
}

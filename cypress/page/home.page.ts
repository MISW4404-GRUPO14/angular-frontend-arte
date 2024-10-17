export class HomePage {
  public get moviesLink(): any {
    return cy.get('.navbar-nav').contains('a', 'Películas');
  }

  public visit() {
    cy.visit('/');
  }
}

context('E2E Directores', () => {
  it('Navegar a la pagina principal y ver listado de directores', () => {
    cy.visit('/');
    cy.contains('directores');
    cy.get('[routerlink="/directores"]').click();
    cy.get('h1').should('have.text', 'Listado de Directores');
  });

  it('Ver detalle de directores', () => {
    cy.visit('/directores');
    cy.wait(1000);
    cy.get('[class="col-12 col-md-3 mb-3 d-flex"]').eq(1).click();
    cy.contains('Lulu Kerford');
  });

  it('Navegar a una pelicula de un director', () => {
    cy.visit('/directores');
    cy.wait(1000);
    cy.get('[class="col-12 col-md-3 mb-3 d-flex"]').eq(1).click();
    cy.wait(1000);
    cy.get('[class="card mb-3 flex-fill"]').click();
    cy.wait(1000);
    cy.get('[class="item"]').should('contain.text', 'Lulu Kerford');
  });

  it('Crear un Director', () => {
    cy.visit('/directores');
    cy.scrollTo(0, 0);
    cy.get('[class="btn btn-primary"]').click({ force: true });
    cy.get('#name')
      .clear({ force: true })
      .type('Director Prueba', { force: true });
    cy.get('#photo')
      .clear({ force: true })
      .type(
        'https://www.shutterstock.com/image-photo/e2e-letters-on-wooden-cubes-260nw-2134283803.jpg',
        { force: true }
      );
    cy.get('#nationality')
      .clear({ force: true })
      .type('Colombia', { force: true });
    cy.get('#birthDate')
      .clear({ force: true })
      .type('2023-05-18', { force: true });
    cy.get('#biography')
      .clear({ force: true })
      .type(
        'Director creado para mostrar el correcto funcionamiento de crear un director',
        { force: true }
      );
    cy.get('[class="btn btn-primary"]')
      .contains('Guardar')
      .click({ force: true });
    cy.get('[class="overlay-container"]').should('contain.text', 'Director');
  });

  it('Valida que el nombre sea requerido', () => {
    cy.visit('/directores');
    cy.get('[class="btn btn-primary"]').click({ force: true });
    cy.get('#name').click({ force: true });
    cy.get('#photo').click({ force: true });
    cy.get('#name').parent().should('contain.text', 'Nombre requerido');
  });

  it('Valida que el photo sea requerido', () => {
    cy.visit('/directores');
    cy.get('[class="btn btn-primary"]').click({ force: true });
    cy.get('#name')
      .clear({ force: true })
      .type('Director Prueba', { force: true });
    cy.get('#photo').click({ force: true });
    cy.get('#nationality').click({ force: true });
    cy.get('#photo').parent().should('contain.text', 'Foto requerida');
  });

  it('Valida que el photo sea requerido', () => {
    cy.visit('/directores');
    cy.get('[class="btn btn-primary"]').click({ force: true });
    cy.get('#name')
      .clear({ force: true })
      .type('Director Prueba', { force: true });
    cy.get('#photo')
      .clear({ force: true })
      .type(
        'https://www.shutterstock.com/image-photo/e2e-letters-on-wooden-cubes-260nw-2134283803.jpg',
        { force: true }
      );
    cy.get('#nationality').click({ force: true });
    cy.get('#birthDate')
      .clear({ force: true })
      .type('2023-05-18', { force: true });
    cy.get('#biography')
      .clear({ force: true })
      .type(
        'Director creado para mostrar el correcto funcionamiento de crear un director',
        { force: true }
      );
    cy.get('#nationality')
      .parent()
      .should('contain.text', 'Nacionalidad requerida');
  });

  it('Valida que el photo sea requerido', () => {
    cy.visit('/directores');
    cy.get('[class="btn btn-primary"]').click({ force: true });
    cy.get('#name')
      .clear({ force: true })
      .type('Director Prueba', { force: true });
    cy.get('#photo')
      .clear({ force: true })
      .type(
        'https://www.shutterstock.com/image-photo/e2e-letters-on-wooden-cubes-260nw-2134283803.jpg',
        { force: true }
      );
    cy.get('#nationality')
      .clear({ force: true })
      .type('Colombia', { force: true });
    cy.get('#biography').click({ force: true });
    cy.get('#birthDate')
      .clear({ force: true })
      .type('2023-05-18', { force: true });
    cy.wait(1000);
    cy.scrollTo(0, 500);
    cy.wait(2000);
    cy.get('#biography').parent().should('contain.text', 'Biografia requireda');
  });

  it('Valida el director prueba creado', () => {
    cy.viewport(1000, 700);
    cy.visit('/directores');
    cy.get(`[aria-label="End"]`).click({ force: true });
    cy.scrollTo(1000, 700);
    cy.wait(2000);
    cy.get('[class="row mt-5"]').should('contain.text', 'Director Prueba');
  });
});

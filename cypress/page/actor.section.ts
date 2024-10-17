export class ActorsList {

  public get titleList(): any {
    return cy.get('#title-list');
  }
  public get actorItems(): any {
    return cy.get('app-actor-card');
  }

  public get img(){
    return cy.get('.img-fluid');
  }
  public get row(){
    return cy.get('tr');
  }
  public asociarButton(){
    return cy.get('button').contains('Asociar película a actor').click({force: true});
  }
  public get asociarMovieButton(){
    return cy.get('.asociar');
  }
  public photoActor(){
    return cy.get('.img-fluid')
        .should(($p) => {
            expect($p).to.have.length(1);
    })
  }
  public nameActor(){
    return cy.get('h3')
        .should(($p) => {
            expect($p).to.have.length(1);
    })
  }
  public movieList(){
    return cy.get('table')
    .should(($p) => {
        expect($p).to.have.length(1);
    })
  }


  //Actor form
  public inputName(value:string){
    return cy.get('#name').type(value);
  }
  public name(){
    return cy.get('#name').click({force: true});
  }
  public requireName(){
    return cy.get('.alert')
    .contains('Nombre es requerido')
    .should(($p) => {
        expect($p).to.have.length(1);
    })
  }
  public inputPhotoUrl(value:string){
    return cy.get('#photo').type(value);
  }
  public photoUrl(){
    return cy.get('#photo').click({force: true});
  }
  public requirePhoto(){
    return cy.get('.alert')
    .contains('Ingrese la URL de la foto del actor')
    .should(($p) => {
        expect($p).to.have.length(1);
    })
  }
  public inputNationality(value:string){
    return cy.get('#nationality').type(value);
  }
  public nationality(){
    return cy.get('#nationality').click({force: true});
  }
  public requireNacionality(){
    return cy.get('.alert')
    .contains('Ingrese la nacionalidad del actor')
    .should(($p) => {
        expect($p).to.have.length(1);
    })
  }
  public inputbirthDate(value:string){
    return cy.get('#birthDate').type(value);
  }
  public inputBiography(value:string){
    return cy.get('#biography').type(value);
  }
  public biography(){
    return cy.get('#biography').click({force: true});
  }
  public requireBiography(){
    return cy.get('.alert')
    .contains('Ingrese una biografía corta del actor')
    .should(($p) => {
        expect($p).to.have.length(1);
    })
  }
  public submitButton(){
    return cy.get('button').contains('Crear actor').click({force: true});
  }

  public createSuccess(){
    return cy.get('.toast-success')
    .should(($p) => {
        expect($p).to.have.length(1);
    })
  }

}

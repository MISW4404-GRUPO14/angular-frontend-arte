import { ActorsList } from '../page/actor.section';
import { faker } from '@faker-js/faker';
import { Actor } from 'src/app/models/actor.model';



const actorsList = new ActorsList();
let actor = {}


context('Pruebas e2e actores', () => {

  it('Validar que la lista de actores se despliegue correctamente.', () => {
    cy.visit('/actores');
    actorsList.titleList.should('have.text', 'Listado de actores');
    actorsList.actorItems.should('have.length', 8);
  });

  it('Validar que la vista detalle se despliegue correctamente', () => {
    cy.visit('/actores');
    actorsList.img.then($linksActors => {
      var actorCard= $linksActors .get(Math.floor(Math.random() * $linksActors.length))
      cy.wait(1000);
      cy.wrap(actorCard).click({force: true});
    });
    cy.wait(1000);
    actorsList.photoActor();
    actorsList.nameActor();
    actorsList.movieList();
  });

  it('Validar que se pueda asociar un actor a una pelicula', () => {
    cy.visit('/actores');
    actorsList.img.then($linksActors => {
      var actorCard= $linksActors .get(Math.floor(Math.random() * $linksActors.length))
      cy.wait(1000);
      cy.wrap(actorCard).click({force: true});
    });
    cy.wait(1000);
    actorsList.asociarButton();
    actorsList.asociarMovieButton.then($buttons => {
      var button= $buttons .get(Math.floor(Math.random() * $buttons.length))
      cy.wait(1000);
      cy.wrap(button).click({force: true});
    });
    actorsList.createSuccess();
  });
  it('Validar los campos requeridos', () => {
    cy.visit('/actores/create');
    actorsList.name();
    actorsList.photoUrl();
    actorsList.nationality();
    actorsList.biography();
    actorsList.name();
    actorsList.requireName();
    actorsList.requirePhoto();
    actorsList.requireNacionality();
    actorsList.requireBiography();
  });

  it('Crear un actor', () => {
    cy.visit('/actores/create');
    actorsList.inputName(faker.person.fullName());
    actorsList.inputPhotoUrl(faker.image.url());
    actorsList.inputNationality(faker.location.county());
    actorsList.inputbirthDate('2023-05-18');
    cy.scrollTo(0, 700);
    cy.wait(3000);
    actorsList.inputBiography(faker.lorem.sentences());
    actorsList.submitButton();
    actorsList.createSuccess();
  });
});

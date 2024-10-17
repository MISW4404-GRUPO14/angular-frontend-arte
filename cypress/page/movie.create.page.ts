export class MovieCreatePage {
  public get heading1(): any {
    return cy.get('h1');
  }
  public get title(): any {
    return cy.get('#title');
  }
  public get poster(): any {
    return cy.get('#poster');
  }
  public get duration(): any {
    return cy.get('#duration');
  }
  public get popularity(): any {
    return cy.get('#popularity');
  }
  public get country(): any {
    return cy.get('#country');
  }
  public get releaseDate(): any {
    return cy.get('#releaseDate');
  }
  public get genre(): any {
    return cy.get('#genre');
  }
  public get director(): any {
    return cy.get('#director');
  }

  public get ytName(): any {
    return cy.get('[id="youtubeTrailer.name"]');
  }
  public get ytUrl(): any {
    return cy.get('[id="youtubeTrailer.url"]');
  }
  public get ytDuration(): any {
    return cy.get('[id="youtubeTrailer.duration"]');
  }
  public get ytChannel(): any {
    return cy.get('[id="youtubeTrailer.channel"]');
  }
  public get submitBtn(): any {
    return cy.get('form button[type="submit"]');
  }
  public get toastContainer(): any {
    return cy.get('#toast-container');
  }
}

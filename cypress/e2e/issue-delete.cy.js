import { beforeEachDelete } from "./connection";

describe('Issue create', () => {
  beforeEach(() => {
    beforeEachDelete();
  });

  const issueText = 'This is an issue of type: Task.';

  it('Should delete first issue and validate deletion', () => {
    cy.log("We'll delete some issue");
    cy.get('[data-testid="modal:issue-details"] textarea').should('contain.text', issueText);
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should('be.visible');
    cy.contains('button', 'Delete issue').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    
    cy.reload();
    cy.get('[data-testid="list-issue"]').first().click();
    cy.get('[data-testid="modal:issue-details"] textarea').should('not.contain.text', issueText);
  });

  it('Should cancel deleteion ot the first issue and validate issue remains', () => {
    cy.log("We'll cancel issue deletion");
    cy.get('[data-testid="modal:issue-details"] textarea').should('contain.text', issueText);
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should('be.visible');
    cy.contains('button', 'Cancel').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    
    cy.reload();
    cy.get('[data-testid="modal:issue-details"] textarea').should('have.value', issueText);   
  });  
});
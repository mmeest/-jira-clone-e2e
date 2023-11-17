import { beforeE } from "./connection";
import { faker } from '@faker-js/faker';

describe('Issue create', () => {
  beforeEach(() => {
    beforeE();
  });

  // Variable for accessing 'data-testid' elements
  const testId = (testValue) => cy.get(`[data-testid="${testValue}"]`);  
  const title = faker.lorem.word();
  const description = faker.lorem.words(12);

  it('Test Case 1: Custom Issue Creation', () => {
    cy.log('Test Case 1: Custom Issue Creation');

    //System finds modal for creating issue and does next steps inside of it
    testId(`modal:issue-create`).within(() => {
      
      //New issue Type
      testId(`select:type`).click();
      testId(`select-option:Bug`).trigger('click');      

      //Issue Priority
      testId(`select:priority`).click();
      testId(`select-option:Highest`).trigger('click');
            
      //Issue Description
      cy.get('.ql-editor').type('My bug description');

      //Issue Title
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type('Bug');
      
      //Reporter
      testId(`select:reporterId`).click();
      testId(`select-option:Pickle Rick`).click();

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    testId(`modal:issue-create`).should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    testId(`board-list:backlog`).should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      testId(`list-issue`)
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('Bug');
      //Assert that correct avatar and type icon are visible
      testId(`avatar:Lord Gaben`).should('be.visible');
      testId(`icon:bug`).should('be.visible');
    });
  });


  it('Test Case 2: Create Issue With Random Data Plugin', () => {
    cy.log('Test Case 2: Create Issue With Random Data Plugin');

    //System finds modal for creating issue and does next steps inside of it
    testId(`modal:issue-create`).within(() => {
      
      //New issue Type
      /* testId(`select:type`).click();
      testId(`icon:close`).click();        
      testId(`select-option:Task`).trigger('click');     */  

      //Issue Priority
      testId(`select:priority`).click();
      testId(`select-option:Low`).trigger('click');
            
      //Issue Description
      cy.get('.ql-editor').type(description);

      //Issue Title
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type(title);
      
      //Reporter
      testId(`select:reporterId`).click();
      testId(`select-option:Baby Yoda`).click();

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    testId(`modal:issue-create`).should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    testId(`board-list:backlog`).should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      testId(`list-issue`)
          .should('have.length', '5')
          .first()
          .find('p')
          .contains(title);
      //Assert that correct avatar and type icon are visible
      testId(`avatar:Lord Gaben`).should('be.visible');
      testId(`icon:task`).should('be.visible');
    });
  });


  it('Should validate title is required field if missing', () => {
    //System finds modal for creating issue and does next steps inside of it
    testId("modal:issue-create").within(() => {
      //Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();

      //Assert that correct error message is visible
      testId("form-field:title").should('contain', 'This field is required');
    });
  });
});
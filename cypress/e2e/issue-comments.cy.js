describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const getCommentTextArea = () => cy.get('textarea[placeholder="Add a comment..."]');
    const getCommentsArea = () => cy.get('[data-testid="issue-comment"]');
    const getModalConfirm = () => cy.get('[data-testid="modal:confirm"]');

    // Following variable for testing purpose
    const testId = input => cy.get(`[data-testid=${input}]`);   
    
    let numOfComments;

    // My combined test
    it.only('Should add, edit and delete the comment', () => {
        const commentOriginal = "This is my first comment.";
        const commentNew = "This is edited comment.";

        getCommentsArea().then(($comments) => {
        numOfComments = $comments.length;
        cy.log(numOfComments);        

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            // 1. We will add a comment
            getCommentTextArea().type(commentOriginal).then(() => {

                cy.contains('button', 'Save')
                    .click()
                    .should('not.exist');

                cy.contains('Add a comment...').should('exist');

                getCommentsArea().should('have.length', numOfComments + 1);
                getCommentsArea().should('contain', commentOriginal);       
                
                // 2. We'll edit the comment
                getCommentsArea()
                    .first()
                    .contains('Edit')
                    .click()
                    .should('not.exist');

                getCommentTextArea()
                    .should('contain', commentOriginal)
                    .clear()
                    .type(commentNew);

                cy.contains('button', 'Save')
                    .click()
                    .should('not.exist');    
                
                getCommentsArea()
                    .should('contain', 'Edit')
                    .and('contain', commentNew);

                // 3. Finally deleting our comment
                cy.get('[data-testid="issue-comment"]')
                    .contains('Delete')
                    .click();
            });

        }).then(() => {
            getModalConfirm()
                .contains('button', 'Delete comment')
                .click()
                .should('not.exist');

            getCommentsArea()
                .should('contain', 'Edit')
                .and('not.contain', commentNew)
                .should('have.length', numOfComments);
            });
        });
    });

    // ------------ORIGINAL CODE BELOW THIS LINE-----------------

    it('Should create a comment successfully', () => {
        const comment = 'TEST_COMMENT';

        getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const comment = 'TEST_COMMENT_EDITED';

        getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', previousComment)
                .clear()
                .type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', comment);
        });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .should('not.exist');
    });    
});

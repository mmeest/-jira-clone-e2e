export class KanbanBoard {
    constructor() {
        this.listOfIssues = '[data-testid="list-issue"]';
    }

    search(searchProp){
        cy.get(this.filterSectionSelector).type(searchProp);
    }

    selectFirstIssueFromList() {
        cy.get(this.listOfIssues).first().click();
    }
}

export class ModalWindow {
    constructor() {
        this.deleteButtonSelector = '[data-testid="icon:trash"]';
        this.modalDetailsSelector = '[data-testid="modal:issue-details"]';
        this.modalHeaderText = '[data-testid="modal:issue-details"] textarea';
    }

    clickDeleteButton() {
        cy.get(this.deleteButtonSelector).click();
    }

    modalHeaderTextToValidate(validation) {
        cy.get(this.modalDetailsSelector).should('be.visible');
        cy.get(this.modalDetailsSelector).should('contain.text', validation);
    }

    modalHeaderTextNotToValidate(validation) {
        cy.get(this.modalDetailsSelector).should('be.visible');
        cy.get(this.modalDetailsSelector).should('not.contain.text', validation);
    }
}

export class ModalDialog {
    constructor() {
        this.modalConfirmDialog = '[data-testid="modal:confirm"]';
        this.confirmDelete = { text: 'Delete issue' };
        this.cancelDelete = { text: 'Cancel' };
    }

    modalConfirmToBeVisible() {
        cy.get(this.modalConfirmDialog).should('be.visible');
    }

    modalConfirmNotToExist() {
        cy.get(this.modalConfirmDialog).should('not.exist');
    }

    clickCofirmDelete() {
        cy.contains('button', this.confirmDelete.text).click();
    }

    clickCancelButton() {
        cy.contains('button', this.cancelDelete.text).click();
    }
}
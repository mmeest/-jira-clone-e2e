import { beforeEachDelete } from "./connection";
import { KanbanBoard, ModalWindow, ModalDialog } from "./KanbanBoard";

const kanbanBoard = new KanbanBoard();
const modalWindow = new ModalWindow();
const modalDialog = new ModalDialog();

describe('Issue create', () => {
  beforeEach(() => {
    beforeEachDelete();
  });

  // Hard coded/deprecated variable that was used at first:
  // const issueText = 'This is an issue of type: Task.';

  it('Should delete first issue and validate deletion', () => {
    cy.log("We'll delete some issue");

    modalWindow.modalHeaderTextToVariable();
    cy.get('@issueTitle').then((title) => {
      const txt = title;

      modalWindow.clickDeleteButton();
      modalDialog.modalConfirmToBeVisible();
      modalDialog.clickCofirmDelete();
      modalDialog.modalConfirmNotToExist();
  
      cy.reload();
      kanbanBoard.selectFirstIssueFromList();
      modalWindow.modalHeaderTextNotToValidate(title);
    });
  });

  it('Should cancel deletion of the first issue and validate issue remains', () => {
    cy.log("Well cancel issue deletion");

    modalWindow.modalHeaderTextToVariable();
    cy.get('@issueTitle').then((title) => {
      const txt = title;

      modalWindow.clickDeleteButton();
      modalDialog.modalConfirmToBeVisible();
      modalDialog.clickCancelButton();
      modalDialog.modalConfirmNotToExist();
  
      cy.reload();
      modalWindow.modalHeaderTextToValidate(title);
    });
  });    
});
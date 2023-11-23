import { beforeEachDelete } from "./connection";
import { KanbanBoard, ModalWindow, ModalDialog } from "./KanbanBoard";

const kanbanBoard = new KanbanBoard();
const modalWindow = new ModalWindow();
const modalDialog = new ModalDialog();

describe('Issue create', () => {
  beforeEach(() => {
    beforeEachDelete();
  });

  const issueText = 'This is an issue of type: Task.';

  it('Should call search', () => {
    KanbanBoard.search('Search for issue for me');
  });

  it('Should delete first issue and validate deletion', () => {
    cy.log("We'll delete some issue");
    modalWindow.modalHeaderTextToValidate(issueText);
    modalWindow.clickDeleteButton();
    modalDialog.modalConfirmToBeVisible();
    modalDialog.clickCofirmDelete();
    modalDialog.modalConfirmNotToExist();

    cy.reload();
    kanbanBoard.selectFirstIssueFromList();
    modalWindow.modalHeaderTextNotToValidate(issueText);
  });

  it.only('Should cancel deletion of the first issue and validate issue remains', () => {
    cy.log("Well cancel issue deletion");
    modalWindow.modalHeaderTextToValidate(issueText);
    modalWindow.clickDeleteButton();
    modalDialog.modalConfirmToBeVisible();
    modalDialog.clickCancelButton();
    modalDialog.modalConfirmNotToExist();

    cy.reload();
    modalWindow.modalHeaderTextToValidate(issueText);
  });    
});
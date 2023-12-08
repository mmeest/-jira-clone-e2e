describe('Issue time tracking, editing and removing', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task').click();                    
        });
    });


    // Modal Detail Page
    const openIssueDetailPage = () => cy.contains('This is an issue of type: Task').click();
    const closeIssueDetailPage = () => cy.get('[data-testid="icon:close"]').first().click();

    // Time Estimation
    const getEstimatedTimeInput = () => cy.contains('div', 'Original Estimate (hours)').next('div').find('input');
    const addValueToEstimatedTime = timeValue => getEstimatedTimeInput().clear().type(`${timeValue}`);
    const clearValueOnEstimatedTime = () => getEstimatedTimeInput().clear();
    
    // Time Logging
    const getTimeTrackingModal = () => cy.get('[data-testid="icon:stopwatch"').click();
    const getTimeSpentInput = () => cy.contains('div', 'Time spent (hours)').next('div').find('input');
    const getTimeRemainingInput = () => cy.contains('div', 'Time remaining (hours)').next('div').find('input');
    const changeValueOnTimeSpent = spentHours => getTimeSpentInput().should('exist').clear().type(spentHours);
    const changeValueOnTimeRemaining = remainingHours => getTimeRemainingInput().should('exist').clear().type(remainingHours);
    const clearValueOnTimeSpent = () => getTimeSpentInput().clear();
    const clearValueOnTimeRemaining = () => getTimeRemainingInput().clear();
    const clickDoneButton = () => cy.contains('button', 'Done').click();
    
    // Assertions
    const assertRightValueOnEstimatedTime = timeValue => getEstimatedTimeInput().should('exist').should('have.value', timeValue);
    const assertEstimatedTimeToBeEmpty = () => getEstimatedTimeInput().should('exist').should('have.value', '');
    const assertRightValueOnTimeSpent = spentHours => getTimeSpentInput().should('exist').should('have.value', spentHours);
    const assertEmptyTimeSpent = () => getTimeSpentInput().should('exist').should('have.value', '');
    const assertTimeTrackingModalIsVisible = () => cy.contains('div', 'Time tracking').should('be.visible');
    const assertNoTimeLogged = () => cy.contains('div', 'No time logged').should('be.visible');
    const assertTimeLogged = () => cy.contains('div', 'No time logged').should('not.exist');
    const assertHoursLogged = loggedHours => cy.get('[data-testid="modal:issue-details"]')
        .find('div', `${loggedHours} logged`).should('exist').should('be.visible');
    const assertHoursRemaining = remainingHours => cy.get('[data-testid="modal:issue-details"]')
        .find('div', `${remainingHours} remaining`).should('exist').should('be.visible');


    it('Should add estimation', () => {
        const myEstimation = 10;

        assertTimeLogged();
        addValueToEstimatedTime(myEstimation);

        cy.wait(2000).then(() => {
            closeIssueDetailPage();
            openIssueDetailPage();
            assertRightValueOnEstimatedTime(myEstimation);
        });
    });

    it('Should update estimation', () => {
        const newEstimatedHours = 20;

        addValueToEstimatedTime(newEstimatedHours);

        cy.wait(2000).then(() => {
            closeIssueDetailPage().then(() => {
                openIssueDetailPage();
                assertRightValueOnEstimatedTime(newEstimatedHours);
            });
        });
    });

    it('Should remove time estimation', () => {

        clearValueOnEstimatedTime();

        cy.wait(2000).then(() => {
            closeIssueDetailPage().then(() => {
                openIssueDetailPage();
                assertEstimatedTimeToBeEmpty();
            })
        });
    });

    it('Should log time', () => {
        const timeSpent = 2;
        const timeRemaining = 5;

        getTimeTrackingModal();
        assertTimeTrackingModalIsVisible();
        changeValueOnTimeSpent(timeSpent);
        changeValueOnTimeRemaining(timeRemaining);
        assertTimeLogged();
        clickDoneButton();
        assertHoursLogged(timeSpent);
        assertHoursRemaining(timeRemaining);
    });

    it('Should remove logged time', () => {
        getTimeTrackingModal();
        assertTimeTrackingModalIsVisible();
        clearValueOnTimeSpent();
        clearValueOnTimeRemaining();
        clickDoneButton();
        assertNoTimeLogged();
    });

    // ------------------B-O-N-U-S-----------------

    /* it('Should add, edit and clear time estimation', () => {
        const originalValue = 8;
        const estimationFirst = 12;
        const estimationSecond = 0;

        assertRightValueOnEstimatedTime(originalValue);

        addValueToEstimatedTime(estimationFirst);
        assertRightValueOnEstimatedTime(estimationFirst);

        addValueToEstimatedTime(estimationSecond);
        assertRightValueOnEstimatedTime(estimationSecond);

        clearValueOnEstimatedTime();
        assertEstimatedTimeToBeEmpty();
    });

    it('Should test time-logging, change, clear', () => {
        const originalValue = 4;
        const firstChange = 5;
        const secondChange = 0;
        
        getTimeTrackingModal();
        assertRightValueOnTimeSpent(originalValue);

        changeValueOnTimeSpent(firstChange);
        assertRightValueOnTimeSpent(firstChange);

        changeValueOnTimeSpent(secondChange);
        assertRightValueOnTimeSpent(secondChange);

        clearValueOnTimeSpent();
        assertEmptyTimeSpent();
    }); */
});
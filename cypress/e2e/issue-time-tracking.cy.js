describe('Issue time tracking, editing and removing', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task').click();
        });
    });

    const getEstimatedTimeInput = () => cy.contains('div', 'Original Estimate (hours)').next('div').find('input');
    const getTimeTrackingModal = () => cy.get('[data-testid="icon:stopwatch"').click();
    const getTimeSpentInput = () => cy.contains('div', 'Time spent (hours)').next('div').find('input');

    const addValueToEstimatedTime = timeValue => getEstimatedTimeInput().clear().type(`${timeValue}`);
    const clearValueOnEstimatedTime = () => getEstimatedTimeInput().clear();
    const assertRightValueOnEstimatedTime = timeValue => getEstimatedTimeInput().should('exist').should('have.value', timeValue);
    const assertEstimatedTimeToBeEmpty = () => getEstimatedTimeInput().should('exist').should('have.value', '');

    const changeValueOnTimeSpent = spentHours => getTimeSpentInput().should('exist').clear().type(spentHours);
    const clearValueOnTimeSpent = () => getTimeSpentInput().clear();
    const assertRightValueOnTimeSpent = spentHours => getTimeSpentInput().should('exist').should('have.value', spentHours);
    const assertEmptyTimeSpent = () => getTimeSpentInput().should('exist').should('have.value', '');

    it('Should add, edit and clear time estimation', () => {
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
    });
});
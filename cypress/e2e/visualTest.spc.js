
describe('Integration test with visual testing', function () {
    beforeEach(() => {
        cy.visit('/')

    })
    it('Loads the homepage', function () {
        cy.wait(1000);
        cy.percySnapshot('Homepage', { widths: [1200] });

    });
})
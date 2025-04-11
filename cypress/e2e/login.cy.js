describe('template script', () => {
    it('successfylly loads', () => {
        cy.visit('http://localhost:5173/login')
    })

    it('Credenciales correctas', () => {
        cy.visit('http://localhost:5173/login')
        cy.get('[data-cy="email"]').type('123');
        cy.get('[data-cy="password"]').type('123');
        cy.get('[data-cy="sign-in"]').click();
        cy.url().should('include', 'http://localhost:5173/Room');
    });
});

describe('las credenciales son incorrectas', () =>{
    it('email incorrecto', () => {
        cy.visit('http://localhost:5173/login')
        cy.get('[data-cy="email"]').type('incorrecto');
        cy.get('[data-cy="password"]').type('123');
        cy.get('[data-cy="sign-in"]').click();
        cy.url().should('not.include', 'http://localhost:5173/Room');
    });

    it('contraseña incorrecta', () => {
        cy.visit('http://localhost:5173/login')
        cy.get('[data-cy="email"]').type('123');
        cy.get('[data-cy="password"]').type('incorrecto');
        cy.get('[data-cy="sign-in"]').click();
        cy.url().should('not.include', 'http://localhost:5173/Room');
    });

    it('contraseña y email incorrectos', () => {
        cy.visit('http://localhost:5173/login')
        cy.get('[data-cy="email"]').type('incorrecto');
        cy.get('[data-cy="password"]').type('incorrecto');
        cy.get('[data-cy="sign-in"]').click();
        cy.url().should('not.include', 'http://localhost:5173/Room');
    });
})
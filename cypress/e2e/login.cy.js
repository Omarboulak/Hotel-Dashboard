

describe('template script', () => {
    it('successfylly loads', () => {
        cy.visit('http://localhost:5173/login')
    })

    it('Credenciales correctas', () => {
        cy.get('input[data-cy="email"]').type('123');
        cy.get('input[data-cy="password"]').type('123');
        cy.contains('[data-cy="sig-in"]').click();
        cy.url().should('include', '/room');
    });
});

describe('las credenciales son incorrectas', () =>{
    it('email incorrecto', () => {
        cy.get('input[data-cy="email"]').type('incorrecto');
        cy.get('input[data-cy="password"]').type('123');
        cy.contains('[data-cy="sig-in"]').click();
    });

    it('contraseña incorrecta', () => {
        cy.get('input[data-cy="email"]').type('123');
        cy.get('input[data-cy="password"]').type('incorrecto');
        cy.contains('[data-cy="sig-in"]').click();
    });

    it('contraseña y email incorrectos', () => {
        cy.get('input[data-cy="email"]').type('incorrecto');
        cy.get('input[data-cy="password"]').type('incorrecto');
        cy.contains('[data-cy="sig-in"]').click();
    });
})
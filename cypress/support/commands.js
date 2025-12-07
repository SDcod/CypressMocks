// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

Cypress.Commands.add("hasuraGraphQL", ({ body }) => {
  cy.window()
    .its("localStorage")
    .invoke("getItem", "auth0:access_token")
    .then((token) => {
      cy.wrap(token, { log: false }).should("not.be.undefined");
      Cypress.env("graphQL_token", token);
    });

  return cy
    .request({
      method: "POST",
      url: "https://hasura.io/learn/graphql",
      headers: {
        Authorization: `Bearer ${Cypress.env("graphQL_token")}`,
        "Content-Type": "application/json",
      },
      body: body,
    })
    .then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body.data).not.to.be.null;

      return res.body.data;
    });
});

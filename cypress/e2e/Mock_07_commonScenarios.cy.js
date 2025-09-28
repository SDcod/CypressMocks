// ✅ How to launch Browser in Incognito Mode// ->using launch options in config.

// ✅ How to avoid delay while entering text // {delay:0} in ms

// ✅ How to Ignore Case Sensitivity //{matchCase:false}

// ✅ How to disable Default Logging in Cypress //{log:false}

// ✅ How to handle error status code in Cypress API testing//{failOnStatusCode: false}

// ✅ How to verify the tooltip in Cypress // cy.get('#hoverTarget').trigger('mouseover');

// ✅ How to perform Multi-Country/Language testing in Cypress

// ✅ How to handle basic auth headers //cy.visit('https://the-internet.herokuapp.com/basic_auth', {
//   auth: {
//     username: 'admin',
//     password: 'admin'
//   }
// });
// OR using cy.request headers:{Authorization : `Basic ${token...}`}

// ✅ How to generate Dynamic Data with Faker Library in Cypress

// Handle waits in cypress.

describe("common scenarios", () => {
  it("avoid delay in test", () => {
    cy.visit("https://charcount.com/");
    cy.get("#js-text").type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      { delay: 0 }
    );
  });

  it("Ignore Case Sensitivity", () => {
    cy.visit("https://charcount.com/");
    cy.contains("INPUT", { matchCase: false });
  });

  //   it("handle errors", () => {
  //     cy.visit("https://charcount.com/");
  //   });
  //   it("handle waits", () => {
  //     cy.visit("https://charcount.com/");
  //   });
  //   it("How to generate Dynamic Data with Faker Library in Cypress", () => {
  //     cy.visit("https://charcount.com/");
  //   });
});

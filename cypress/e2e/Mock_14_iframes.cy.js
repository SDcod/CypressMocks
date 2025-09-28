// You need to automate interaction inside an iframe on the page.

// 🔹 Task:

// Visit: https://the-internet.herokuapp.com/iframe

// Switch to the iframe.

// Clear the existing text inside the editor.

// Type new text: "Hello from Cypress inside iframe!"

// Assert that the new text is correctly entered.

describe("iframe tests", () => {
  it("handles iframe - locates and validate content inside iframe", () => {
    cy.visit("https://the-internet.herokuapp.com/iframe");

    cy.get("button.tox-notification__dismiss").should("be.visible").click();

    cy.get("iframe#mce_0_ifr", { timeout: 10000 })
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
      .within(() => {
        cy.get("p").should("have.text", "Your content goes here.");
      });
  });
});

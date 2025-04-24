// You're testing a modal popup. Your task is to:

// Visit the site.https://www.w3schools.com/howto/howto_css_modals.asp

// Click the "Open Modal" button.

// Validate that the modal appears and contains the correct heading text.

// Close the modal using the “×” (close) icon.

// Ensure the modal is no longer visible.

describe("Modal test", () => {
  beforeEach(() => {
    cy.visit("https://www.w3schools.com/howto/howto_css_modals.asp");

    cy.title().should("eq", "How To Make a Modal Box With CSS and JavaScript");
  });
  it("Validates modal content and visibility", () => {
    //clicks the modal button
    cy.contains("button", "Open Modal").click({ force: true });

    //validates the popup visibility and it content
    cy.get("#id01.w3-modal")
      .should("be.visible")
      .and("have.css", "display", "block");

    cy.get("#id01.w3-modal .w3-container:nth-child(2) > p")
      .eq(1)
      .then(($ele) => {
        let modalText = $ele.text();
        expect(modalText).to.match(/Modals are awesome!/gi);

        cy.get(".w3-button.w3-xlarge").click();

        //after closing validate the modal is not visible
        cy.get("#id01.w3-modal")
          .should("not.be.visible")
          .and("have.css", "display", "none");
      });
  });
});

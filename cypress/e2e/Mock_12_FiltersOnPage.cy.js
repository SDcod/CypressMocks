// Challenge: Validate Category Filter Functionality
// 🔗 Demo Website: https://automationexercise.com/products

// ✅ Scenario
// Visit the Products page.

// On the left sidebar, click on a category under "Women" → "Dress".

// Verify:

// The heading updates to show filtered products (e.g., "Women - Dress Products").

// At least one product is displayed.

// Assert that each visible product has an image and a name.

describe("Product page test suite", () => {
  it("validates the category filter on product page", () => {
    cy.visit("https://automationexercise.com/products");

    cy.contains("Category");

    cy.get('[href="#Women"]').should("be.visible").click();
    cy.get("#Women ul li a").contains("Dress").click();

    cy.contains("Dress Products", { matchCase: false });

    cy.get(".features_items .single-products")
      .should("have.length.gte", 1)
      .each(($product) => {
        cy.wrap($product).within(() => {
          cy.get(".productinfo>img").should("be.visible");
          cy.get(".productinfo>p").should("be.visible");
        });
      });
  });
});

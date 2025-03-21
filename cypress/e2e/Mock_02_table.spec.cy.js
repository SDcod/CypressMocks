// Scenario:
// You are testing an e-commerce product table where each row contains an Item Name and its Price. Your goal is to:

// 1️⃣ Verify the table is visible after visiting the page.
// 2️⃣ Assert that a specific item (e.g., "Laptop") exists with the correct price ($1200.00).
// 3️⃣ Check that all items have prices formatted correctly (i.e., a dollar sign $ followed by a valid number).

// Test Data:
// Item	Price
// Oranges	$3.99
// Laptop	$1200.00
// Marbles	$1.25
// Acceptance Criteria:
// ✅ The table should be visible.
// ✅ The item "Laptop" should have a price of "$1200.00".
// ✅ Each price should match the format: $X.XX or $X,XXX.XX.

// 💡 Bonus: Use .each() to dynamically iterate through rows instead of hardcoding indices.

describe("validate table content", () => {
  it("validates the item price against the item", () => {
    cy.visit("https://practice-automation.com/tables/");
    cy.get(".wp-block-table > table").as("simpleTable");

    cy.get("@simpleTable").should("be.visible");

    cy.get("@simpleTable").within(($table) => {
      cy.contains("td", "Laptop")
        .next("td")
        .then(($price) => {
          expect($price).to.have.text("$1200.00");
          //   let text = $price.text();
          //   expect(text).to.match(/^\$\d{1,3}(,\d{3})*(\.\d{2})?$/);
        });
    });
  });
});

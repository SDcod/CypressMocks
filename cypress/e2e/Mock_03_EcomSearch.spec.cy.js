// Scenario: Validate Search Functionality on an E-Commerce Website
// 🔹 Steps:
// 1️⃣ Visit the homepage of an e-commerce website (use any demo site or a real one).
// 2️⃣ Locate the search bar and enter a product name, e.g., "Laptop".
// 3️⃣ Click the search button or trigger the search using the Enter key.
// 4️⃣ Validate that the results page displays products matching the searched term (e.g., ensure at least one product title contains "Laptop").

// 🔹 Bonus Points:
// ✅ Assert that the search results section is visible.
// ✅ If no results are found, verify that a "No results found" message appears.

// 📌 Expected Output
// The test should pass if relevant products are shown after searching.
// The test should fail if the search function is broken or no relevant results appear.

describe("Ecom - test suite", () => {
  it("Ecom - Search function", () => {
    cy.visit("https://www.flipkart.com/");

    cy.get('input[title="Search for Products, Brands and More"]')
      .should("be.visible")
      .type("Asus tuf a15{enter}");

    // cy.get(
    //   "#container>div>div:nth-of-type(3)>div>div:nth-of-type(2) >div div[data-tkid]>a"
    // )
    //   .first()
    //   .within(() => {
    //     cy.contains(/ASUS TUF/gi);
    //   });

    cy.get(
      "#container>div>div:nth-of-type(3)>div>div:nth-of-type(2) >div div[data-tkid]>a"
    )
      .first()
      .invoke("removeAttr", "target")
      .click();

    cy.contains("Add to cart").click();
  });
});

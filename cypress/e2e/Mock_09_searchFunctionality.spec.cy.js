// 1.Visit the homepage.

// 2.Click on the "Products" link in the top nav.

// 3.Verify that you are on the All Products page.

// 4.Enter "dress" in the search input and click the search button.

// 5.Validate that:

// The results section is visible.

// All listed products have “dress” in the name (case-insensitive).

// ✅ Bonus (Optional):
// Count how many products matched the search.

// Ensure each product name includes the search term using .each() and to.include.

// 💡 Hints:
// Use cy.contains() to find links/buttons.

// Use cy.get('input[name="search"]') for the input box.

// Product results will be within .features_items.

describe("search functionality", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com/");
  });
  it("validates product search", () => {
    cy.get("h2").contains("Features Items");

    cy.get("ul.nav>li>a[href='/products']").should("be.visible").click();
    cy.get("h2").contains("All Products");
    cy.get("#search_product").focus().type("dress");
    cy.get("#submit_search").click();
    cy.get("h2").contains("Searched Products");

    cy.get(".features_items").within(($itemContainer) => {
      //   cy.contains("dress", { matchCase: false });

      let matchedProducts = 0;
      let totalProducts = 0;
      cy.get(".single-products>.productinfo>p")
        .each(($productTitle) => {
          let productTitleText = $productTitle.text();
          totalProducts++;
          // cy.log(productTitleText);
          let pattern = /dress/gi;
          if (pattern.test(productTitleText)) {
            matchedProducts += 1;
          }
        })
        .then(() => {
          cy.log(`matched products :  ${matchedProducts}
                  total products : ${totalProducts}`);
        });
    });
  });
});

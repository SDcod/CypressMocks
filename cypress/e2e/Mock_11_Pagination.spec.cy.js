//  Test Site: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25_28

// ✅ Test Scenario
// You're testing the pagination behavior on the All Products page. Your tasks:

// Visit the Products page.

// Scroll to the pagination controls at the bottom.

// Click on the page number '2'.

// Verify that the page URL reflects the second page (you should see page=2 in URL).

// Check that the product list is visible after pagination.

// 💡 Bonus (if time permits):
// Extract and log the names of all visible products on page 2.

// Assert that at least one product is displayed.

describe("pagination suite", () => {
  beforeEach(() => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25_28"
    );
  });
  it("validate second page in pagination", () => {
    //scroll to pagination section
    cy.get("ul.pagination").scrollIntoView();

    let pageNumber = 2;
    cy.get("ul.pagination>li.page-item>.page-link")
      .contains(pageNumber)
      .click();

    cy.get("ul.pagination>li.page-item>.page-link")
      .contains(pageNumber)
      .parent()
      .should("have.class", "active");

    cy.url().should(
      "eq",
      "https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25_28&page=2"
    );

    //validate the product list is visible
    cy.get(
      ".entry-content.content-products>[data-list^='product-layout']"
    ).should("be.visible");

    //validate atleast one item is displayed on page and display all items

    cy.get(
      ".entry-content.content-products>[data-list^='product-layout']>div .text-ellipsis-2"
    )
      .should("have.length.gte", 1)
      .then(($items) => {
        const productNames = [...$items].map((el) => el.innerText);
        cy.log("Visible products: " + productNames.join(", "));
      });
  });
});

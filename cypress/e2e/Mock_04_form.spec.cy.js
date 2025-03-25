describe("form test", () => {
  it("form 01", () => {
    cy.visit("https://qavalidation.com/demo-form/");

    cy.get("#g4072-fullname")
      .should("be.visible")
      .type("John Doe")
      .should("have.value", "John Doe");

    cy.get("#g4072-email")
      .should("be.visible")
      .type("test@jn.com")
      .should("have.value", "test@jn.com");

    cy.get("#g4072-phonenumber")
      .should("be.visible")
      .type(1232345)
      .should("have.value", 1232345);

    cy.get("#g4072-gender")
      .should("be.visible")
      .select("Male")
      .should("have.value", "Male");

    function selectExp(n) {
      if (n <= 5) {
        cy.get(`#g4072-yearsofexperience-${n}`)
          .should("be.visible")
          .check()
          .and("be.checked");
      } else {
        cy.get(`#g4072-yearsofexperience-Above 5`)
          .should("be.visible")
          .check()
          .and("be.checked");
      }
    }

    selectExp(4);

    //check all even index values
    cy.get('[id^="g4072-skills-"]').each(($ele, index) => {
      if ((index + 1) % 2 == 0) {
        cy.wrap($ele).check();
      }
    });

    cy.contains("button", "Submit!").click();

    cy.get("#contact-form-success-header", { timeout: 10000 }).should(
      "include.text",
      "Your message has been sent"
    );
  });
});

import { faker } from "@faker-js/faker";

describe("generate and use random data", () => {
  it("enter random data generated using FakerJS into login form", () => {
    const randomEmail = faker.internet.email();
    const randomPass = faker.internet.password({ length: 12 });

    cy.visit("https://practice.expandtesting.com/login");
    cy.get('input[id="username"]').type(randomEmail);
    cy.get('input[id="password"]').type(randomPass);
  });
});

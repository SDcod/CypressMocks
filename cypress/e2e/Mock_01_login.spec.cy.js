// Challenge: Automate a Login Form with Error Handling
// You need to automate the login functionality for the following scenario on the demo site:
// 🔗 URL: https://practicetestautomation.com/practice-test-login/

// 📌 Task Requirements:
// 1️⃣ Visit the login page.
// 2️⃣ Attempt to log in with incorrect credentials:

// Username: incorrectUser
// Password: wrongPass123
// 3️⃣ Validate the error message:
// The error message should be "Your username is invalid!"
// 4️⃣ Attempt to log in with correct credentials:
// Username: student
// Password: Password123
// 5️⃣ Verify successful login by checking the presence of the logout button.

class LoginPage {
  elements = {
    username: () => cy.get("#username"),
    password: () => cy.get("#password"),
    submitBtn: () => cy.get("#submit"),
    errorMessage: () => cy.get("#error"),
    logoutBtn: () => cy.contains("a", "Log out"),
  };

  login(username, password) {
    this.elements.username().clear().type(username);
    this.elements.password().clear().type(password);
    this.elements.submitBtn().click();
  }
}

Cypress.Commands.add("login", (username, password) => {
  const loginPage = new LoginPage();
  loginPage.login(username, password);
});

describe("Login Test Suite", () => {
  const loginPage = new LoginPage();
  const users = [
    { Username: "incorrectUser", Password: "wrongPass123", isValid: false },
    { Username: "student", Password: "Password123", isValid: true },
  ];

  beforeEach(() => {
    cy.visit("https://practicetestautomation.com/practice-test-login/");
  });

  users.forEach(({ Username, Password, isValid }) => {
    it(`Login with user: ${Username}`, () => {
      cy.login(Username, Password);

      if (isValid) {
        cy.url().should(
          "eq",
          "https://practicetestautomation.com/logged-in-successfully/"
        );
        loginPage.elements.logoutBtn().should("be.visible").click();
      } else {
        loginPage.elements
          .errorMessage()
          .should("have.text", "Your username is invalid!");
      }
    });
  });
});

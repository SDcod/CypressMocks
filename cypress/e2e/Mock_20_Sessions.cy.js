// 🔹 What is cy.session()?

// cy.session() is a Cypress command introduced in Cypress v9.6.0+.
// It helps you cache and restore browser sessions (like cookies, localStorage, sessionStorage) between tests.

// This is useful for login workflows – instead of logging in fresh for every test, Cypress can "remember" the session and reuse it. This makes tests faster and more reliable.

// 🔹 Syntax
// cy.session(id, setupFn, options?)

// id → A unique name for the session (string, array, or object).

// setupFn → A function where you define how to establish the session (e.g., login).

// options → Extra configs like validate (to check if session is still valid).
// updated by sd
// 🔹 Example 1: Reusing Login Session
describe("Using cy.session()", () => {
  let username;
  let password;
  before(() => {
    cy.env(["validUser", "validPassword"]).then(
      ({ validUser, validPassword }) => {
        username = validUser;
        password = validPassword;
      },
    );
  });

  beforeEach(() => {
    cy.session("user-session", () => {
      // setupFn → how to create session
      cy.visit("/login");
      cy.get("#email").type(username);
      cy.get("#password").type(password);
      cy.get("button[type='submit']").click();

      // confirm user is logged in
      cy.url().should("include", "/dashboard");
    });
  });

  it("should access dashboard without re-login", () => {
    cy.visit("/dashboard");
    cy.contains("Welcome back").should("be.visible");
  });

  it("should navigate to profile without re-login", () => {
    cy.visit("/profile");
    cy.contains("User Profile").should("be.visible");
  });
});

// 👉 Here, Cypress only runs the login flow once.
// For subsequent tests, it restores the session from cache (cookies + localStorage).

// 🔹 Example 2: Validating Session

// Sometimes a session might expire. We can add a validate check.

cy.session(
  "user-session",
  () => {
    cy.visit("/login");
    cy.get("#email").type(Cypress.env("validUser"));
    cy.get("#password").type(Cypress.env("validPassword"));
    cy.get("button[type='submit']").click();
  },
  {
    validate: () => {
      cy.visit("/dashboard");
      cy.contains("Welcome back"); // ensures session is still valid
    },
  },
);

// If validation fails, Cypress will re-run the setupFn (login again).

// 🔹 Example 3: Multiple Sessions (Different Users)
describe("Multiple sessions", () => {
  beforeEach(() => {
    cy.session("admin", () => {
      cy.loginAsAdmin(); // custom command
    });
    cy.session("customer", () => {
      cy.loginAsCustomer(); // custom command
    });
  });

  it("Admin should access admin panel", () => {
    cy.visit("/admin");
    cy.contains("Admin Dashboard").should("be.visible");
  });

  it("Customer should access store", () => {
    cy.visit("/store");
    cy.contains("Shop Now").should("be.visible");
  });
});

// 👉 Useful when you test role-based apps.

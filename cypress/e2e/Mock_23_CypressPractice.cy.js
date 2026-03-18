/**
 * ============================================================
 * CYPRESS SDET INTERVIEW REVISION GUIDE
 * ============================================================
 * This file contains comprehensive Cypress concepts for SDET interview preparation.
 * Topics covered:
 * - Basic Commands & Selectors
 * - Assertions (Implicit & Explicit)
 * - Handling Different UI Elements
 * - API Testing (REST & GraphQL)
 * - Intercepts, Mocks & Stubs
 * - Fixtures & Data Driven Testing
 * - Page Object Model
 * - Custom Commands
 * - Environment Variables
 * - File Upload/Download
 * - Iframes & Shadow DOM
 * - Drag and Drop
 * - Alerts & Popups
 * - Pagination & Filters
 * - Session Management
 * - Retries & Timeouts
 * - Viewport & Responsive Testing
 * - Cypress Architecture
 * ============================================================
 */

// ============================================================
// SECTION 1: BASIC COMMANDS & SELECTORS
// ============================================================
describe("1. Basic Commands & Selectors", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/");
  });

  it("CSS Selectors - various methods", () => {
    // By ID
    cy.get("#content");

    // By Class
    cy.get(".heading");

    // By Attribute
    cy.get("[href='/login']");

    // By Tag
    cy.get("h1");

    // By combination
    cy.get("div#content h1");

    // Contains - text based selector
    cy.contains("Form Authentication");

    // Contains with selector
    cy.contains("a", "Form Authentication");

    // Find - search within element
    cy.get("#content").find("li");

    // First/Last/Eq
    cy.get("li a").first();
    cy.get("li a").last();
    cy.get("li a").eq(5); // 6th element (0-indexed)

    // Filter
    cy.get("li").filter(":contains('Form')");

    // Not
    cy.get("li").not(":contains('Form')");

    // Parent
    cy.get("a").parent();

    // Children
    cy.get("ul").children();

    // Siblings
    cy.get("li:first").siblings();

    // Next/Prev
    cy.get("li:first").next();
    cy.get("li:last").prev();
  });

  it("Traversal Commands", () => {
    // each - iterate over elements
    cy.get("li a").each(($el, index, $list) => {
      cy.log(`Element ${index}: ${$el.text()}`);
    });

    // then - work with yielded subject
    cy.get("h1").then(($el) => {
      const text = $el.text();
      expect(text).to.include("Welcome");
    });

    // wrap - wrap an element to use Cypress commands
    cy.get("h1").then(($el) => {
      cy.wrap($el).should("be.visible");
    });

    // invoke - call jQuery method
    cy.get("h1").invoke("text").should("contain", "Welcome");

    // its - get property of object
    cy.get("li").its("length").should("be.gt", 10);
  });

  it("Action Commands", () => {
    cy.visit("https://the-internet.herokuapp.com/login");

    // Type with options
    cy.get("#username").type("tomsmith", { delay: 50 });

    // Clear
    cy.get("#username").clear();

    // Type with special keys
    cy.get("#username").type("tomsmith{enter}");

    // Click variations
    cy.get("#username").clear().type("tomsmith");
    cy.get("#password").type("SuperSecretPassword!");
    cy.get("button[type='submit']").click();
    cy.get("button[type='submit']").dblclick(); // double click
    cy.get("button[type='submit']").rightclick(); // right click

    // Focus/Blur
    cy.get("#username").focus();
    cy.get("#username").blur();

    // Scroll
    cy.scrollTo("bottom");
    cy.scrollTo("top");
    cy.scrollTo(0, 500);

    // Scroll to element
    cy.get("footer").scrollIntoView();

    // Hover
    cy.visit("https://the-internet.herokuapp.com/hovers");
    cy.get(".figure").first().trigger("mouseover");
    cy.get(".figure").first().invoke("show"); // Alternative for hover
  });
});

// ============================================================
// SECTION 2: ASSERTIONS
// ============================================================
describe("2. Assertions - Implicit & Explicit", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/login");
  });

  it("Implicit Assertions (should/and)", () => {
    // Visibility
    cy.get("#username").should("be.visible");
    cy.get("#username").should("exist");

    // Chaining with and
    cy.get("#username")
      .should("be.visible")
      .and("be.enabled")
      .and("have.attr", "name", "username");

    // Text assertions
    cy.get("h2").should("have.text", "Login Page");
    cy.get("h2").should("contain", "Login");
    cy.get("h2").should("include.text", "Page");

    // Value assertions
    cy.get("#username").type("test");
    cy.get("#username").should("have.value", "test");

    // Attribute assertions
    cy.get("#username").should("have.attr", "type", "text");
    cy.get("#username").should("have.class", "");
    cy.get("#username").should("have.id", "username");

    // CSS assertions
    cy.get("#username").should("have.css", "display", "block");

    // Length assertions
    cy.get("input").should("have.length", 3);

    // State assertions
    cy.get("#username").should("be.empty");
    cy.get("#username").type("test");
    cy.get("#username").should("not.be.empty");

    // Checked/Selected
    cy.visit("https://the-internet.herokuapp.com/checkboxes");
    cy.get("input[type='checkbox']").first().should("not.be.checked");
    cy.get("input[type='checkbox']").first().check().should("be.checked");
  });

  it("Explicit Assertions (expect)", () => {
    // BDD style
    expect(true).to.be.true;
    expect("hello").to.equal("hello");
    expect("hello").to.not.equal("world");
    expect([1, 2, 3]).to.have.lengthOf(3);
    expect({ name: "test" }).to.have.property("name");
    expect("hello world").to.contain("world");
    expect(5).to.be.greaterThan(3);
    expect(5).to.be.gt(3);
    expect(3).to.be.lessThan(5);
    expect(3).to.be.lt(5);

    // Using then for explicit assertions
    cy.get("h2").then(($el) => {
      expect($el.text()).to.equal("Login Page");
      expect($el).to.have.class("example");
      expect($el).to.be.visible;
    });

    // TDD style
    assert.equal(4, 4);
    assert.strictEqual("4", "4");
    assert.isTrue(true);
    assert.isObject({});
    assert.isArray([]);
    assert.exists("test");
    assert.include("hello world", "world");
  });

  it("Negative Assertions", () => {
    cy.get("#username").should("not.be.disabled");
    cy.get("#username").should("not.have.class", "error");
    cy.get("#username").should("not.contain", "error");
  });

  it("Soft Assertions (multiple assertions)", () => {
    // Cypress stops on first failure by default
    // To continue, use should with callback
    cy.get("h2").should(($el) => {
      expect($el).to.be.visible;
      expect($el.text()).to.include("Login");
      expect($el).to.have.class("example");
    });
  });
});

// ============================================================
// SECTION 3: HANDLING WAITS & ASYNC BEHAVIOR
// ============================================================
describe("3. Waits & Async Behavior", () => {
  it("Implicit Waiting (Cypress automatic)", () => {
    cy.visit("https://the-internet.herokuapp.com/dynamic_loading/1");
    cy.get("button").click();
    // Cypress automatically waits for element
    cy.get("#loading").should("not.exist");
    cy.get("#finish h4").should("be.visible").and("contain", "Hello World");
  });

  it("Explicit Wait (cy.wait)", () => {
    cy.visit("https://the-internet.herokuapp.com/dynamic_loading/1");
    cy.get("button").click();
    // Wait for specific time (not recommended)
    cy.wait(5000);
    cy.get("#finish h4").should("be.visible");
  });

  it("Wait for Alias/Intercept", () => {
    cy.intercept("GET", "**/posts/**").as("getPosts");
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.wait("@getPosts");
  });

  it("Custom Timeout", () => {
    // Override default command timeout (4000ms)
    cy.get("#slow-element", { timeout: 10000 }).should("be.visible");

    // Type with no delay
    cy.get("#username").type("fast typing", { delay: 0 });
  });

  it("Retry Logic", () => {
    // Cypress retries assertions until they pass or timeout
    cy.get("#dynamic-element").should("have.text", "Loaded");

    // Should with callback for complex retry logic
    cy.get("#list").should(($list) => {
      expect($list.children()).to.have.length.greaterThan(2);
    });
  });
});

// ============================================================
// SECTION 4: FIXTURES & DATA DRIVEN TESTING
// ============================================================
describe("4. Fixtures & Data Driven Testing", () => {
  let testData;

  before(() => {
    // Load fixture once
    cy.fixture("example").then((data) => {
      testData = data;
    });
  });

  it("Using Fixture Data", () => {
    cy.fixture("example").then((data) => {
      cy.log("Email from fixture:", data.email);
      cy.log("Body:", data.body);
    });
  });

  it("Data Driven Testing with forEach", () => {
    const users = [
      { username: "tomsmith", password: "SuperSecretPassword!", valid: true },
      { username: "invalid", password: "invalid", valid: false },
    ];

    users.forEach((user) => {
      cy.visit("https://the-internet.herokuapp.com/login");
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("button[type='submit']").click();

      if (user.valid) {
        cy.get(".flash.success").should("contain", "You logged into");
        cy.contains("a", "Logout").click();
      } else {
        cy.get(".flash.error").should("contain", "Your username is invalid");
      }
    });
  });

  it("Dynamic Test Generation", () => {
    const testCases = [
      { desc: "valid login", expected: "success" },
      { desc: "invalid login", expected: "error" },
    ];

    testCases.forEach((testCase) => {
      it(`Test case: ${testCase.desc}`, () => {
        cy.log(`Running test for ${testCase.desc}`);
        expect(testCase.expected).to.be.oneOf(["success", "error"]);
      });
    });
  });
});

// ============================================================
// SECTION 5: API TESTING
// ============================================================
describe("5. API Testing", () => {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  it("GET Request", () => {
    cy.request("GET", `${baseUrl}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", 1);
      expect(response.body).to.have.property("title");
      expect(response.body).to.have.property("userId");
    });
  });

  it("POST Request", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/posts`,
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id", 101);
    });
  });

  it("PUT Request", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/posts/1`,
      body: {
        id: 1,
        title: "updated title",
        body: "updated body",
        userId: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq("updated title");
    });
  });

  it("DELETE Request", () => {
    cy.request("DELETE", `${baseUrl}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Query Parameters", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/posts`,
      qs: {
        userId: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      response.body.forEach((post) => {
        expect(post.userId).to.eq(1);
      });
    });
  });

  it("Request with Auth", () => {
    cy.request({
      method: "GET",
      url: "https://api.example.com/protected",
      auth: {
        bearer: "your-token-here",
      },
      headers: {
        Authorization: "Bearer token123",
      },
      failOnStatusCode: false, // Don't fail on non-2xx status
    });
  });

  it("Validate Response Schema", () => {
    cy.request("GET", `${baseUrl}/posts/1`).then((response) => {
      expect(response.body).to.have.all.keys("userId", "id", "title", "body");
      expect(response.body.userId).to.be.a("number");
      expect(response.body.title).to.be.a("string");
    });
  });

  it("API Chaining", () => {
    // Get user then get their posts
    cy.request("GET", `${baseUrl}/users/1`).then((userResponse) => {
      const userId = userResponse.body.id;
      cy.request("GET", `${baseUrl}/posts?userId=${userId}`).then(
        (postsResponse) => {
          expect(postsResponse.body).to.be.an("array");
          expect(postsResponse.body.length).to.be.greaterThan(0);
        },
      );
    });
  });
});

// ============================================================
// SECTION 6: INTERCEPTS, MOCKS & STUBS
// ============================================================
describe("6. Intercepts, Mocks & Stubs", () => {
  it("Basic Intercept", () => {
    cy.intercept("GET", "**/posts/*").as("getPost");
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.wait("@getPost");
  });

  it("Mock API Response", () => {
    cy.intercept("GET", "**/posts/1", {
      statusCode: 200,
      body: {
        userId: 999,
        id: 1,
        title: "Mocked Title",
        body: "This is mocked content",
      },
    }).as("getMockedPost");

    cy.visit("https://jsonplaceholder.typicode.com/posts/1");
    cy.wait("@getMockedPost");
  });

  it("Modify Request", () => {
    cy.intercept("POST", "**/posts", (req) => {
      req.reply({
        statusCode: 201,
        body: {
          id: 999,
          title: "Modified Title",
        },
      });
    }).as("createPost");
  });

  it("Network Throttling", () => {
    // Slow down network
    cy.intercept("GET", "**/posts/*", (req) => {
      req.on("response", (res) => {
        res.setDelay(2000);
      });
    }).as("slowRequest");
  });

  it("Force Network Error", () => {
    cy.intercept("GET", "**/posts/*", {
      forceNetworkError: true,
    }).as("networkError");
  });

  it("Stub Function with cy.stub", () => {
    const obj = {
      foo() {},
    };

    const stub = cy.stub(obj, "foo").as("fooStub");
    obj.foo("bar");
    expect(stub).to.be.called;
    expect(stub).to.be.calledWith("bar");
  });

  it("Spy on Function with cy.spy", () => {
    const obj = {
      foo() {
        return 42;
      },
    };

    const spy = cy.spy(obj, "foo").as("fooSpy");
    obj.foo();
    expect(spy).to.have.returned(42);
  });

  it("Clock - Control Time", () => {
    const now = new Date(Date.UTC(2024, 0, 1)).getTime();
    cy.clock(now);
    cy.visit("https://example.com");
    // Time is now frozen at Jan 1, 2024
  });

  it("Tick - Advance Time", () => {
    cy.clock();
    cy.visit("https://example.com");
    cy.tick(5000); // Advance 5 seconds
  });
});

// ============================================================
// SECTION 7: PAGE OBJECT MODEL
// ============================================================
class LoginPage {
  // Elements
  get usernameInput() {
    return cy.get("#username");
  }
  get passwordInput() {
    return cy.get("#password");
  }
  get submitButton() {
    return cy.get("button[type='submit']");
  }
  get errorMessage() {
    return cy.get(".flash.error");
  }
  get successMessage() {
    return cy.get(".flash.success");
  }
  get logoutButton() {
    return cy.contains("a", "Logout");
  }

  // Actions
  visit() {
    cy.visit("https://the-internet.herokuapp.com/login");
  }

  enterUsername(username) {
    this.usernameInput.clear().type(username);
  }

  enterPassword(password) {
    this.passwordInput.clear().type(password);
  }

  clickSubmit() {
    this.submitButton.click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickSubmit();
  }

  logout() {
    this.logoutButton.click();
  }

  // Assertions
  verifyErrorMessage(expectedText) {
    this.errorMessage.should("contain", expectedText);
  }

  verifySuccessMessage() {
    this.successMessage.should("be.visible");
  }
}

describe("7. Page Object Model", () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it("Login with valid credentials", () => {
    loginPage.login("tomsmith", "SuperSecretPassword!");
    loginPage.verifySuccessMessage();
    loginPage.logout();
  });

  it("Login with invalid credentials", () => {
    loginPage.login("invalid", "invalid");
    loginPage.verifyErrorMessage("Your username is invalid");
  });
});

// ============================================================
// SECTION 8: CUSTOM COMMANDS
// ============================================================
// Register custom commands (typically in commands.js)
Cypress.Commands.add("login", (username, password) => {
  cy.session([username, password], () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("button[type='submit']").click();
    cy.url().should("contain", "/secure");
  });
});

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-testid=${selector}]`);
});

Cypress.Commands.add("getBySel", (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add("loginViaAPI", (email, password) => {
  cy.request({
    method: "POST",
    url: "/api/login",
    body: {
      email,
      password,
    },
  }).then((response) => {
    window.localStorage.setItem("token", response.body.token);
  });
});

Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  // Add default options to all visits
  options = options || {};
  options.failOnStatusCode = false;
  return originalFn(url, options);
});

describe("8. Custom Commands", () => {
  it("Using custom login command", () => {
    cy.login("tomsmith", "SuperSecretPassword!");
    cy.url().should("include", "/secure");
  });

  it("Using custom selector command", () => {
    // cy.getByData('submit-button').click();
    // cy.getBySel('login-form');
  });
});

// ============================================================
// SECTION 9: IFRAMES & SHADOW DOM
// ============================================================
describe("9. Iframes & Shadow DOM", () => {
  it("Handle Iframe", () => {
    cy.visit("https://the-internet.herokuapp.com/iframe");

    // Get iframe body
    cy.get("#mce_0_ifr")
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
      .clear()
      .type("Hello from Cypress");
  });

  it("Handle Shadow DOM", () => {
    cy.visit("https://the-internet.herokuapp.com/shadowdom");

    // Access shadow root
    cy.get("my-paragraph")
      .shadow()
      .find("p")
      .should("contain", "My default text");
  });

  it("Shadow DOM with {includeShadowDom}", () => {
    cy.get("my-paragraph", { includeShadowDom: true })
      .find("p")
      .should("be.visible");
  });
});

// ============================================================
// SECTION 10: FILE OPERATIONS
// ============================================================
describe("10. File Operations", () => {
  it("File Upload", () => {
    cy.visit("https://the-internet.herokuapp.com/upload");

    // Upload single file
    cy.get("input[type='file']").selectFile("cypress/fixtures/example.json");

    // Upload with drag-drop simulation
    cy.get("input[type='file']").selectFile("cypress/fixtures/example.json", {
      action: "drag-drop",
    });

    // Upload multiple files
    cy.get("input[type='file']").selectFile([
      "cypress/fixtures/example.json",
      "cypress/fixtures/profile.png",
    ]);
  });

  it("File Download", () => {
    cy.downloadFile(
      "https://example.com/file.pdf",
      "cypress/downloads",
      "file.pdf",
    );

    // Verify downloaded file
    cy.readFile("cypress/downloads/file.pdf").should("exist");
  });

  it("Read/Write Files", () => {
    // Read file
    cy.readFile("cypress/fixtures/example.json").then((content) => {
      cy.log(content);
    });

    // Write file
    cy.writeFile("cypress/fixtures/test-data.txt", "Hello World");

    // Append to file
    cy.writeFile("cypress/fixtures/test-data.txt", "\nNew line", {
      flag: "a+",
    });
  });
});

// ============================================================
// SECTION 11: ALERTS, CONFIRMS & PROMPTS
// ============================================================
describe("11. Alerts, Confirms & Prompts", () => {
  it("Handle Alert", () => {
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");

    // Alert - automatically handled
    cy.contains("button", "Click for JS Alert").click();
    cy.on("window:alert", (text) => {
      expect(text).to.equal("I am a JS Alert");
    });
  });

  it("Handle Confirm - Click OK", () => {
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");

    cy.contains("button", "Click for JS Confirm").click();
    cy.on("window:confirm", () => true); // Click OK
    cy.get("#result").should("have.text", "You clicked: Ok");
  });

  it("Handle Confirm - Click Cancel", () => {
    cy.visit("https://-internet.herokuapp.com/javascript_alerts");

    cy.contains("button", "Click for JS Confirm").click();
    cy.on("window:confirm", () => false); // Click Cancel
    cy.get("#result").should("have.text", "You clicked: Cancel");
  });

  it("Handle Prompt", () => {
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("Cypress Test");
    });

    cy.contains("button", "Click for JS Prompt").click();
    cy.get("#result").should("have.text", "You entered: Cypress Test");
  });

  it("Stub Alert", () => {
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts", {
      onBeforeLoad(win) {
        cy.stub(win, "alert").as("windowAlert");
      },
    });

    cy.contains("button", "Click for JS Alert").click();
    cy.get("@windowAlert").should("have.been.calledOnce");
  });
});

// ============================================================
// SECTION 12: DRAG AND DROP
// ============================================================
describe("12. Drag and Drop", () => {
  it("Drag and Drop with trigger", () => {
    cy.get(".source-element")
      .trigger("mousedown", { which: 1 })
      .trigger("mousemove", { clientX: 500, clientY: 500 })
      .trigger("mouseup", { force: true });
  });

  it("Drag and Drop with Plugin (@4tw/cypress-drag-drop)", () => {
    // cy.get('.source').drag('.target')
    // cy.get('.source').drag('.target', { force: true })
  });

  it("HTML5 Drag and Drop", () => {
    const dataTransfer = new DataTransfer();

    cy.get(".draggable").trigger("dragstart", { dataTransfer });
    cy.get(".dropzone").trigger("drop", { dataTransfer });
  });
});

// ============================================================
// SECTION 13: PAGINATION & FILTERS
// ============================================================
describe("13. Pagination & Filters", () => {
  it("Handle Pagination", () => {
    // Click next page
    cy.get(".pagination .next").click();

    // Click specific page number
    cy.get(".pagination").contains("3").click();

    // Verify current page
    cy.get(".pagination .active").should("contain", "3");

    // Navigate through all pages
    cy.get(".pagination a").each(($page) => {
      cy.wrap($page).click();
      cy.wait(500);
    });
  });

  it("Handle Filters", () => {
    // Select from dropdown
    cy.get("#category-filter").select("Electronics");

    // Checkbox filters
    cy.get("input[type='checkbox'][value='in-stock']").check();

    // Price range slider
    cy.get(".price-slider").invoke("val", 100).trigger("change");

    // Search filter
    cy.get("#search").type("laptop{enter}");

    // Verify filtered results
    cy.get(".product-item").each(($item) => {
      cy.wrap($item).should("contain", "Laptop");
    });
  });

  it("Sort Table Data", () => {
    // Click column header to sort
    cy.get("th").contains("Price").click();
    cy.get("th").contains("Price").should("have.class", "sorted-asc");

    // Click again to reverse
    cy.get("th").contains("Price").click();
    cy.get("th").contains("Price").should("have.class", "sorted-desc");
  });
});

// ============================================================
// SECTION 14: SESSION & AUTHENTICATION
// ============================================================
describe("14. Session & Authentication", () => {
  it("cy.session() - Cache Login", () => {
    cy.session("user-session", () => {
      cy.visit("https://the-internet.herokuapp.com/login");
      cy.get("#username").type("tomsmith");
      cy.get("#password").type("SuperSecretPassword!");
      cy.get("button[type='submit']").click();
      cy.url().should("include", "/secure");
    });

    // Session is restored, already logged in
    cy.visit("https://the-internet.herokuapp.com/secure");
    cy.contains("a", "Logout").should("be.visible");
  });

  it("Set/Get Local Storage", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", "abc123");
    });

    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.equal("abc123");
    });
  });

  it("Set/Get Cookies", () => {
    cy.setCookie("session_id", "123456");
    cy.getCookie("session_id").should("have.property", "value", "123456");

    // Get all cookies
    cy.getCookies();

    // Clear specific cookie
    cy.clearCookie("session_id");

    // Clear all cookies
    cy.clearCookies();
  });

  it("Preserve Cookies Across Tests", () => {
    // In beforeEach or test
    Cypress.Cookies.preserveOnce("session_id");
  });
});

// ============================================================
// SECTION 15: VIEWPORT & RESPONSIVE TESTING
// ============================================================
describe("15. Viewport & Responsive Testing", () => {
  const viewports = [
    { device: "Mobile", width: 375, height: 667 },
    { device: "Tablet", width: 768, height: 1024 },
    { device: "Desktop", width: 1920, height: 1080 },
  ];

  viewports.forEach((viewport) => {
    it(`Test on ${viewport.device} (${viewport.width}x${viewport.height})`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit("https://example.com");

      if (viewport.device === "Mobile") {
        cy.get(".mobile-menu").should("be.visible");
        cy.get(".desktop-nav").should("not.be.visible");
      } else {
        cy.get(".desktop-nav").should("be.visible");
      }
    });
  });

  it("Test with Preset Viewports", () => {
    cy.viewport("iphone-x");
    cy.viewport("ipad-2");
    cy.viewport("macbook-15");
    cy.viewport("samsung-s10");
  });

  it("Test Orientation", () => {
    cy.viewport("iphone-x", "portrait");
    cy.viewport("ipad-2", "landscape");
  });
});

// ============================================================
// SECTION 16: ENVIRONMENT VARIABLES & CONFIG
// ============================================================
describe("16. Environment Variables & Config", () => {
  it("Access Environment Variables", () => {
    // Access env vars
    const username = Cypress.env("USERNAME");
    const password = Cypress.env("PASSWORD");
    const apiUrl = Cypress.env("apiUrl");

    cy.log("API URL:", apiUrl);

    // Set env var
    Cypress.env("NEW_VAR", "value");
  });

  it("Access Config Values", () => {
    // Access cypress config
    cy.log("Base URL:", Cypress.config("baseUrl"));
    cy.log("Default Command Timeout:", Cypress.config("defaultCommandTimeout"));
    cy.log("Viewport Width:", Cypress.config("viewportWidth"));
  });

  it("Different Configs per Environment", () => {
    // cypress.config.js can have env-specific configs
    // Use Cypress.env() to get current environment
    const env = Cypress.env("ENV") || "dev";

    if (env === "prod") {
      // Production specific tests
    } else {
      // Development tests
    }
  });
});

// ============================================================
// SECTION 17: HOOKS & TEST LIFECYCLE
// ============================================================
describe("17. Hooks & Test Lifecycle", () => {
  before(() => {
    // Runs once before all tests in this describe block
    cy.log("Before all tests - Setup");
  });

  beforeEach(() => {
    // Runs before each test
    cy.log("Before each test");
  });

  afterEach(() => {
    // Runs after each test
    cy.log("After each test - Cleanup");
  });

  after(() => {
    // Runs once after all tests
    cy.log("After all tests - Final cleanup");
  });

  it("Test 1", () => {
    cy.log("Running Test 1");
  });

  it("Test 2", () => {
    cy.log("Running Test 2");
  });

  describe("Nested Describe", () => {
    before(() => {
      cy.log("Before all in nested describe");
    });

    it("Nested Test", () => {
      cy.log("Running nested test");
    });
  });
});

// ============================================================
// SECTION 18: RETRIES & TEST CONFIGURATION
// ============================================================
describe(
  "18. Retries & Test Configuration",
  {
    retries: {
      runMode: 2, // Retries in CI
      openMode: 1, // Retries in interactive mode
    },
  },
  () => {
    it("Test with specific timeout", { timeout: 10000 }, () => {
      cy.get("#slow-element").should("be.visible");
    });

    it("Test with specific retries", { retries: 3 }, () => {
      // This test will retry up to 3 times
    });

    it("Skip test conditionally", () => {
      if (Cypress.env("SKIP_TEST")) {
        cy.log("Skipping test");
        return;
      }
      // Test code
    });
  },
);

// ============================================================
// SECTION 19: DEBUGGING & LOGGING
// ============================================================
describe("19. Debugging & Logging", () => {
  it("Debug Commands", () => {
    cy.visit("https://the-internet.herokuapp.com/login");

    // Pause execution
    // cy.pause()

    // Debug - inspect current subject
    cy.get("#username").debug();

    // Log custom messages
    cy.log("Starting test");
    cy.log("Current URL:", cy.url());

    // Console log
    cy.get("#username").then(($el) => {
      console.log("Element:", $el);
    });

    // Document and window
    cy.document().then((doc) => {
      console.log("Document:", doc);
    });

    cy.window().then((win) => {
      console.log("Window:", win);
    });

    // Screenshot
    cy.screenshot("login-page");
    cy.get("#username").screenshot("username-field");

    // Screenshot on failure (automatic)
    // Configured in cypress.config.js
  });

  it("Using cy.log with variables", () => {
    const user = { name: "John", role: "admin" };
    cy.log("User:", JSON.stringify(user));
  });
});

// ============================================================
// SECTION 20: ADVANCED SCENARIOS
// ============================================================
describe("20. Advanced Scenarios", () => {
  it("Handle Multiple Windows/Tabs", () => {
    // Cypress doesn't support multiple tabs
    // Workaround: remove target attribute
    cy.get("a[target='_blank']").invoke("removeAttr", "target").click();
  });

  it("Handle Browser Events", () => {
    cy.window().then((win) => {
      // Listen to events
      win.addEventListener("error", (err) => {
        cy.log("Error caught:", err.message);
      });
    });
  });

  it("Execute JavaScript in Browser", () => {
    cy.window().then((win) => {
      // Access global variables
      const myVar = win.myGlobalVariable;

      // Execute functions
      win.myFunction();

      // Modify DOM
      win.document.title = "Modified Title";
    });

    // Using cy.document
    cy.document().then((doc) => {
      doc.querySelector("#element").style.color = "red";
    });
  });

  it("Handle Dynamic Content", () => {
    // Wait for element to appear
    cy.get("#dynamic-content", { timeout: 10000 }).should("be.visible");

    // Retry until condition met
    cy.get("#status").should(($el) => {
      expect($el.text()).to.match(/Ready|Complete/);
    });
  });

  it("Handle Stale Elements", () => {
    // Use { force: true } when element might be detached
    cy.get("#button").click({ force: true });

    // Or retry finding element
    cy.get("#container").should("exist");
    cy.get("#container").find("button").click();
  });

  it("Conditional Testing (Anti-pattern but sometimes needed)", () => {
    cy.get("body").then(($body) => {
      // Check if element exists
      if ($body.find("#optional-element").length > 0) {
        cy.get("#optional-element").click();
      }
    });
  });

  it("Scroll and Lazy Loading", () => {
    // Scroll to bottom to trigger lazy load
    cy.scrollTo("bottom");
    cy.wait(500);

    // Check new elements loaded
    cy.get(".lazy-loaded-item").should("have.length.greaterThan", 10);
  });

  it("Infinite Scroll", () => {
    // Scroll multiple times
    for (let i = 0; i < 5; i++) {
      cy.scrollTo("bottom");
      cy.wait(1000);
    }

    // Verify more items loaded
    cy.get(".item").its("length").should("be.gt", 50);
  });
});

// ============================================================
// SECTION 21: CYPRESS ARCHITECTURE & BEST PRACTICES
// ============================================================
/**
 * INTERVIEW QUESTIONS & ANSWERS:
 *
 * Q: How does Cypress handle async operations?
 * A: Cypress commands are automatically queued and executed sequentially.
 *    It uses retry-and-timeout logic for assertions.
 *
 * Q: What is the difference between cy.get() and cy.find()?
 * A: cy.get() searches the entire DOM, cy.find() searches within the
 *    previously yielded subject.
 *
 * Q: How do you handle flakiness in Cypress?
 * A: 1. Use proper waits (not arbitrary cy.wait())
 *    2. Use data-* attributes for selectors
 * *    3. Avoid conditional testing
 *    4. Use retries configuration
 *    5. Ensure test isolation
 *
 * Q: What is the Cypress Test Runner architecture?
 * A: Cypress runs inside the browser, giving it native access to:
 *    - DOM
 *    - Window
 *    - Document
 *    - Network layer (for stubbing)
 *
 * Q: How do you share data between tests?
 * A: Use aliases (cy.as()), closures, or fixtures. Avoid global variables.
 *
 * Q: What are the anti-patterns in Cypress?
 * A: 1. Using cy.wait() with arbitrary time
 *    2. Conditional testing (if/else in tests)
 *    3. Testing through UI when API is available
 *    4. Not using beforeEach for setup
 *    5. Using class names or IDs prone to change
 *
 * Q: How do you optimize Cypress test suite?
 * A: 1. Use cy.session() for login
 *    2. Use cy.intercept() for API mocking
 *    3. Run tests in parallel
 *    4. Use proper selectors
 *    5. Avoid unnecessary visits
 *
 * Q: What is the difference between stub and spy?
 * A: Stub replaces the function, spy wraps and observes it.
 *
 * Q: How does cy.intercept() work?
 * A: It intercepts HTTP requests at the network layer, allowing
 *    modification of requests and responses.
 */

// ============================================================
// SECTION 22: COMPONENT TESTING (Cypress 10+)
// ============================================================
/**
 * Component Testing Example:
 *
 * import { mount } from 'cypress/react'
 * import Button from './Button'
 *
 * describe('Button Component', () => {
 *   it('renders correctly', () => {
 *     mount(<Button>Click me</Button>)
 *     cy.get('button').should('contain', 'Click me')
 *   })
 *
 *   it('handles click', () => {
 *     const onClick = cy.spy().as('onClick')
 *     mount(<Button onClick={onClick}>Click me</Button>)
 *     cy.get('button').click()
 *     cy.get('@onClick').should('have.been.calledOnce')
 *   })
 * })
 */

// ============================================================
// SECTION 23: CI/CD INTEGRATION
// ============================================================
/**
 * CI/CD Configuration Tips:
 *
 * 1. Docker Image: cypress/included:latest
 * 2. Record to Dashboard: cypress run --record --key <key>
 * 3. Parallelization: cypress run --record --parallel
 * 4. Group tests: cypress run --record --group "e2e"
 * 5. Screenshots/Videos: Store as artifacts
 * 6. Environment: Set CYPRESS_* env vars
 * 7. Retry: Configure in cypress.config.js
 *
 * GitHub Actions Example:
 * - uses: cypress-io/github-action@v5
 *   with:
 *     browser: chrome
 *     record: true
 *     parallel: true
 */

// ============================================================
// SECTION 24: COMMON INTERVIEW CODING CHALLENGES
// ============================================================
describe("24. Common Interview Coding Challenges", () => {
  it("Challenge: Verify Table Data", () => {
    // Verify table has expected data
    const expectedData = [
      { name: "John", age: 30, city: "New York" },
      { name: "Jane", age: 25, city: "London" },
    ];

    cy.get("table tbody tr").each(($row, index) => {
      cy.wrap($row)
        .find("td")
        .each(($cell, cellIndex) => {
          const keys = Object.keys(expectedData[index]);
          expect($cell.text()).to.equal(
            String(expectedData[index][keys[cellIndex]]),
          );
        });
    });
  });

  it("Challenge: Verify Sorted Data", () => {
    cy.get(".price").then(($prices) => {
      const prices = $prices
        .map((i, el) => parseFloat(el.innerText.replace("$", "")))
        .get();

      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it("Challenge: Dynamic Element Handling", () => {
    // Element appears after delay
    cy.get("#loading").should("be.visible");
    cy.get("#loading", { timeout: 10000 }).should("not.exist");
    cy.get("#content").should("be.visible");
  });

  it("Challenge: Multi-step Form", () => {
    // Step 1
    cy.get("#step1-input").type("value");
    cy.get("#next-btn").click();

    // Step 2
    cy.get("#step2").should("be.visible");
    cy.get("#step2-input").type("value");
    cy.get("#submit-btn").click();

    // Verify completion
    cy.get(".success-message").should("be.visible");
  });

  it("Challenge: API + UI Integration", () => {
    // Intercept API call
    cy.intercept("POST", "/api/users").as("createUser");

    // Fill form
    cy.get("#name").type("John Doe");
    cy.get("#email").type("john@example.com");
    cy.get("#submit").click();

    // Verify API call
    cy.wait("@createUser").then((interception) => {
      expect(interception.request.body).to.have.property("name", "John Doe");
      expect(interception.response.statusCode).to.eq(201);
    });

    // Verify UI updated
    cy.get(".user-list").should("contain", "John Doe");
  });

  it("Challenge: File Upload Validation", () => {
    // Upload file
    cy.get("input[type='file']").selectFile("cypress/fixtures/valid.pdf");

    // Verify upload success
    cy.get(".upload-success").should("be.visible");

    // Verify file appears in list
    cy.get(".file-list").should("contain", "valid.pdf");
  });

  it("Challenge: Cross-browser Testing Prep", () => {
    // Check browser
    cy.log("Browser:", Cypress.browser.name);
    cy.log("Version:", Cypress.browser.version);

    // Browser-specific logic
    if (Cypress.browser.name === "firefox") {
      // Firefox specific handling
    }
  });
});

// ============================================================
// QUICK REFERENCE: COMMON CYPRESS COMMANDS
// ============================================================
/**
 * NAVIGATION:
 * - cy.visit(url) - Visit a page
 * - cy.go('back') - Go back
 * - cy.go('forward') - Go forward
 * - cy.reload() - Reload page
 *
 * QUERYING:
 * - cy.get(selector) - Get element(s)
 * - cy.contains(text) - Find by text
 * - cy.find(selector) - Find within element
 * - cy.root() - Get root element
 *
 * ACTIONS:
 * - cy.click() - Click element
 * - cy.type(text) - Type text
 * - cy.clear() - Clear input
 * - cy.select(value) - Select dropdown option
 * - cy.check() - Check checkbox/radio
 * - cy.uncheck() - Uncheck checkbox
 *
 * ASSERTIONS:
 * - .should('be.visible')
 * - .should('exist')
 * - .should('have.class', 'class-name')
 * - .should('have.text', 'text')
 * - .should('contain', 'text')
 * - .should('have.length', n)
 * - .should('be.checked')
 * - .should('be.disabled')
 *
 * NETWORK:
 * - cy.intercept() - Intercept HTTP requests
 * - cy.wait(alias) - Wait for alias
 * - cy.request() - Make HTTP request
 *
 * UTILITIES:
 * - cy.log() - Log message
 * - cy.debug() - Debug
 * - cy.pause() - Pause execution
 * - cy.screenshot() - Take screenshot
 * - cy.fixture() - Load fixture
 * - cy.readFile() - Read file
 * - cy.writeFile() - Write file
 */

// 1️⃣ Cypress cy.spy()

// 👉 A spy tracks whether a function was called, how many times, and with what arguments.
// It doesn’t replace the real function — it just observes.

// Example: Spy on console.log
describe("cy.spy example", () => {
  it("spies on console.log", () => {
    cy.spy(console, "log").as("logSpy"); // spy on console.log

    console.log("Hello Cypress!");
    console.log("Second call");

    cy.get("@logSpy").should("have.been.calledTwice");
    cy.get("@logSpy").should("have.been.calledWith", "Hello Cypress!");
  });
});

// ✅ Here, cy.spy() just monitors console.log without changing its behavior.

// 2️⃣ Cypress cy.stub()

// 👉 A stub replaces the real function with a fake one.
// You can control its behavior, like forcing a response or preventing side effects.

// Example: Stub window.alert
describe("cy.stub example", () => {
  it("stubs window.alert", () => {
    cy.visit("https://example.cypress.io/commands/actions");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });

    cy.get(".action-btn").click(); // triggers alert

    cy.get("@alertStub").should("have.been.calledOnce");
    cy.get("@alertStub").should("have.been.calledWith", "This is an alert!");
  });
});

// ✅ Instead of showing a real alert popup, the stub intercepts it and lets us assert against it.

// Another common usage: stubbing network requests with cy.intercept() (modern replacement for stubs on XHR).

// 3️⃣ Cypress cy.clock()

// 👉 A clock freezes time in the browser. Useful for testing things like setTimeout, setInterval, or date-related behavior.

// Example: Control setTimeout
describe("cy.clock example", () => {
  it("controls setTimeout with clock", () => {
    const callback = cy.spy().as("timerSpy");

    cy.clock(); // freeze the clock

    setTimeout(() => {
      callback();
    }, 3000);

    // Time hasn't moved yet, so no call
    cy.get("@timerSpy").should("not.have.been.called");

    // Move time forward by 3 seconds
    cy.tick(3000);

    cy.get("@timerSpy").should("have.been.calledOnce");
  });
});

// ✅ Without cy.clock(), we’d wait 3 real seconds. With it, we can fast-forward instantly with cy.tick().

// 🔑 Difference in a Nutshell
// Feature	                What it Does	                                    Use Case Example
// Spy	       Watches real function calls (doesn’t replace).	               Verify if console.log or a custom function is called with correct args.
// Stub	       Replaces function with fake one (you control behavior).         Prevent real alert(), force fake responses, simulate errors.
// Clock	   Freezes & controls time (setTimeout, setInterval, Date).	       Skip waiting in timer-based logic, test expiry countdowns.
// 👉 Quick analogy:

// Spy = CCTV camera 📹 (just observes)

// Stub = Actor’s body double 🎭 (replaces original)

// Clock = Time machine ⏱ (freeze/skip time)

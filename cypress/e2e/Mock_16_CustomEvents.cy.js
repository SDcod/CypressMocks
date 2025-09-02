// 🔹 What is dispatchEvent?

// dispatchEvent is a method available on DOM elements (or document, window).

// It’s used to trigger an event manually in JavaScript.

// Think of it as “pretend this event just happened”.

// So instead of waiting for a real user click, input, or a custom event, you can simulate it.

// 🔹 Syntax
// element.dispatchEvent(event);

// element: The DOM node (like document, window, button, input).

// event: An event object (e.g., new Event("click") or new CustomEvent("myEvent", { detail: ... })).

// 🔹 Example 1: Triggering a Built-in Event
// const btn = document.querySelector("#btn");

// btn.addEventListener("click", () => {
//   console.log("Button clicked!");
// });

// // Dispatch event manually
// btn.dispatchEvent(new Event("click"));

// 👉 Even though nobody physically clicked, the click event handler runs.

// 🔹 Example 2: Triggering an Input Event
// const input = document.querySelector("#username");

// input.addEventListener("input", (e) => {
//   console.log("Value changed:", e.target.value);
// });

// // Set a value and trigger input event
// input.value = "JohnDoe";
// input.dispatchEvent(new Event("input", { bubbles: true }));

// 👉 Notice { bubbles: true } — it makes the event bubble up through the DOM (important if parent elements are also listening).

// 🔹 Example 3: Custom Events with Data
// document.addEventListener("user:login", (e) => {
//   console.log("Logged in user ID:", e.detail.userId);
// });

// document.dispatchEvent(
//   new CustomEvent("user:login", { detail: { userId: 101 } })
// );

// 👉 CustomEvent lets you attach extra data via the detail property.

// 🔹 Why is dispatchEvent Important in Testing?

// Simulates real user actions (click, input, change).

// Triggers component logic without requiring UI interaction.

// Tests inter-component communication (via custom events).

// In Cypress, you often pair it with cy.window() or cy.document() to dispatch events directly on the app’s DOM.

// Example in Cypress:

// cy.window().then((win) => {
//   win.document.dispatchEvent(
//     new CustomEvent("user:logout", { detail: { reason: "timeout" } })
//   );
// });

// ✅ In short:
// dispatchEvent = Fire an event programmatically.
// It can be native (click, input, change) or custom (CustomEvent).

// Example of custom events
// HTML under test

// <p id="status"></p>

// <script>
//   document.addEventListener('user:login', (e) => {
//     document.querySelector('#status').textContent = `User logged in: ${e.detail.username}`;
//   });
// </script>

// Cypress test

it("should handle custom login event", () => {
  cy.window().then((win) => {
    win.document.dispatchEvent(
      new CustomEvent("user:login", { detail: { username: "john_doe" } })
    );
  });

  cy.get("#status").should("have.text", "User logged in: john_doe");
});

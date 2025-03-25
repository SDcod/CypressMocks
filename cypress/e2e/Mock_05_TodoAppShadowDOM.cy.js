describe("TODO test", () => {
  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/web-components/dist/");
  });

  it("Performs operations on the TODO list", () => {
    const tasks = ["Task one", "Task two", "Task three"];

    // Function to access shadow elements
    const getShadow = (element) =>
      cy.get(".todo-app").shadow().find(element).shadow();

    // Add multiple tasks dynamically
    tasks.forEach((task) => {
      getShadow("todo-topbar")
        .find("#new-todo")
        .should("be.visible")
        .type(`${task}{enter}`);
    });

    // Validate the length of the list
    getShadow("todo-list")
      .find("ul > todo-item")
      .should("have.length", tasks.length);

    // Mark first item as complete and validate CSS property
    getShadow("todo-list")
      .find("ul > todo-item")
      .first()
      .shadow()
      .within(() => {
        cy.get("li #toggle-todo").click();
        cy.get("li .todo-item-text").should(
          "have.css",
          "text-decoration",
          "line-through solid rgb(148, 148, 148)"
        );
      });

    // Delete a specific task
    const taskToDelete = "Task three";
    getShadow("todo-list")
      .find(`ul > todo-item[item-title='${taskToDelete}']`)
      .shadow()
      .find("li .remove-todo-button")
      .click({ force: true });

    // Validate the task is removed
    getShadow("todo-list")
      .find(`ul > todo-item[item-title='${taskToDelete}']`)
      .should("not.exist");
  });
});

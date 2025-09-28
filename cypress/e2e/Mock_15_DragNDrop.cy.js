describe("drag and drop", () => {
  //   it("drags src image to target", () => {
  //     cy.visit("https://www.globalsqa.com/demo-site/draganddrop/");

  //     //iframe
  //     cy.get(".demo-frame.lazyloaded")
  //       .its("0.contentDocument.body")
  //       .should("not.be.empty")
  //       .then(cy.wrap)
  //       .within(() => {
  //         cy.get("[alt='The chalet at the Green mountain lake']", {
  //           timeout: 10000,
  //         }).trigger("mousedown");
  //         cy.get("#trash").trigger("mousemove", { force: true });
  //         cy.get("#trash").trigger("mouseup");
  //       });
  //   });

  it("simple drag and drop", () => {
    cy.visit("https://practice.expandtesting.com/drag-and-drop");

    //use plugins
    cy.get("#column-a").drag("#column-b");
  });
});

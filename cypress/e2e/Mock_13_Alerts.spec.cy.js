// You are testing an app that triggers browser alerts.

// 🔹 Your Goals:

// Visit this demo page: https://the-internet.herokuapp.com/javascript_alerts

// Click on "Click for JS Alert" → Accept the alert → Validate success message.

// Click on "Click for JS Confirm" → Dismiss (Cancel) the alert → Validate the result text shows "You clicked: Cancel".

describe("Alerts suite", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
  });

  it("validates browser alert and text", () => {
    cy.contains("h3", "JavaScript Alerts");

    //handle alert using cy.on
    // let stub = cy.stub();
    // cy.on("window:alert", stub);
    // cy.contains("button", "Click for JS Alert")
    //   .click()
    //   .then(() => {
    //     expect(stub).to.have.be.calledOnceWith("I am a JS Alert");
    //   });

    //handle alert using cy.window
    cy.window().then((win) => {
      cy.stub(win, "alert").as("windowAlert"); //spy the alert event on window
      cy.contains("button", "Click for JS Alert").click(); //do an action that triggers the alert
      cy.get("@windowAlert").should(
        "have.been.calledOnceWith",
        "I am a JS Alert"
      ); //validate alert triggered with desired output
    });
    //   validate the result text
    cy.get("#result").should("have.text", "You successfully clicked an alert");
  });

  it("validates browser confirm with OK and text", () => {
    cy.contains("h3", "JavaScript Alerts");

    //handle confirm (use 'returns' on stub to accept confirm)
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true).as("windowConfirm");
      cy.contains("button", "Click for JS Confirm").click();
      cy.get("@windowConfirm").should(
        "have.been.calledOnceWith",
        "I am a JS Confirm"
      );

      //   validate the result text
      cy.get("#result").should("have.text", "You clicked: Ok");
    });
  });

  it("validates browser confirm with 'Cancel' ", () => {
    cy.contains("h3", "JavaScript Alerts");

    //handle confirm (use 'returns' on stub to accept confirm)
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(false).as("windowConfirm");
      cy.contains("button", "Click for JS Confirm").click();
      cy.get("@windowConfirm").should(
        "have.been.calledOnceWith",
        "I am a JS Confirm"
      );

      //   validate the result text
      cy.get("#result").should("have.text", "You clicked: Cancel");
    });
  });

  it("validates browser prompt with OK ", () => {
    cy.contains("h3", "JavaScript Alerts");

    let promptText = "This is prompt text entered by user";
    //handle confirm (use 'returns' on stub to accept confirm)
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns(promptText).as("windowPrompt");
      cy.contains("button", "Click for JS Prompt").click();
      cy.get("@windowPrompt").should(
        "have.been.calledOnceWith",
        "I am a JS prompt"
      );

      //   validate the result text
      cy.get("#result").should("have.text", `You entered: ${promptText}`);
    });
  });
});

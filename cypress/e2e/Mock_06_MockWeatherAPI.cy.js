describe("mock weather api", () => {
  it("mocks weather api", () => {
    cy.visit("https://openweathermap.org/find");

    cy.intercept("https://openweathermap.org/data/2.5/find?*", {
      message: "accurate",
      cod: "200",
      count: 1,
      body: {
        list: [
          {
            id: 1234,
            name: "Delhi",
            main: { temp: 25 },
            weather: [{ description: "Clear Sky" }],
          },
        ],
      },
    }).as("getWeather");

    cy.get("#search_str").should("be.visible").type("Delhi{enter}");

    cy.wait("@getWeather");

    cy.get(
      "#forecast_list_ul > table tbody tr:nth-of-type(1) > td >b>a[href^='/city/']"
    ).should("contain.text", "Delhi");
  });
});

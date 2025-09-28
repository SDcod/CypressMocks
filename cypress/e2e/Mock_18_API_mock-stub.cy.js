describe("Mock and Stubbing", () => {
  it("Mock a Get request", () => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts", {
      statusCode: 200,
      body: [
        {
          userId: 1,
          id: 1,
          title: "Mocked Post One",
          body: "Some content here",
        },
        {
          userId: 1,
          id: 2,
          title: "Mocked Post Two",
          body: "Another content here",
        },
      ],
    });

    cy.request("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log(res.body);
    });
  });
});

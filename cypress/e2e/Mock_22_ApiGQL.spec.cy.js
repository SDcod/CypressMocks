describe("GraphQL Hasura Suite", function () {
  let username;
  let password;

  before(() => {
    cy.env(["CYPRESS_GQL_USERNAME", "CYPRESS_GQL_PASSWORD"]).then(
      ({ CYPRESS_GQL_USERNAME, CYPRESS_GQL_PASSWORD }) => {
        ((username = CYPRESS_GQL_USERNAME), (password = CYPRESS_GQL_PASSWORD));
      },
    );
  });

  const getUserTodosQuery = `query getTodosByUser($userId: String!){
  users(where: {id: {_eq: $userId }}) {
    id
    name
    todos {
      id
      title
    }
  }
}`;
  const queryVariables = {
    userId: "auth0|5cc0c791918b6b11a675f9f5",
  };
  const queryBody = {
    query: getUserTodosQuery,
    variables: queryVariables,
  };
  beforeEach(function () {
    console.log(username + " is the username");
    cy.visit("https://hasura.io/learn/graphql/graphiql");
    cy.get("#qsLoginBtn").should("be.visible").click();
    cy.get('[id="1-email"]').should("be.visible").type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('[name="submit"]').click();
    cy.contains("div", "Explore GraphQL APIs with headers");
  });
  it("Get Users and todos call", function () {
    cy.hasuraGraphQL({ body: queryBody }).then((data) => {
      console.log("response data: ", data);
    });
  });
});

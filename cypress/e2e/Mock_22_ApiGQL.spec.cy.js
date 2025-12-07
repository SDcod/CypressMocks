const GQL_TOKEN = "";
const GQL_END_POINT = "";
const username = "swaroopmdongare@gmail.com";
const password = "Password@1234";
describe("GraphQL Hasura Suite", function () {
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

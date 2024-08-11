const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Defining the GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

// Mock data
let users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

// Defining the resolvers
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    createUser: (parent, args) => {
      const newUser = { id: String(users.length + 1), ...args };
      users.push(newUser);
      return newUser;
    },
  },
};

// Configuring Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.start().then(res => {
  server.applyMiddleware({ app });

  // Starting the server
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});

[← Index](./README.md)

---

# GraphQL Schema Template

## Purpose

Template for documenting GraphQL schemas.

## Schema Template

```graphql
# === Types ===

type User {
  id: ID!
  email: String!
  name: String
  status: UserStatus!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum UserStatus {
  PENDING
  ACTIVE
  SUSPENDED
}

# === Input Types ===

input CreateUserInput {
  email: String!
  password: String!
  name: String
}

input UpdateUserInput {
  name: String
  status: UserStatus
}

# === Queries ===

type Query {
  # List users with pagination
  users(
    first: Int = 10
    after: ID
    filter: UserFilterInput
  ): UserConnection!
  
  # Get single user
  user(id: ID!): User
  
  # Current authenticated user
  me: User
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type UserEdge {
  node: User!
  cursor: ID!
}

input UserFilterInput {
  status: UserStatus
  search: String
}

# === Mutations ===

type Mutation {
  # Create user
  createUser(input: CreateUserInput!): CreateUserPayload!
  
  # Update user
  updateUser(id: ID!, input: UpdateUserInput!): UpdateUserPayload!
  
  # Delete user
  deleteUser(id: ID!): DeleteUserPayload!
}

union CreateUserPayload = User | UserError
union UpdateUserPayload = User | UserError
union DeleteUserPayload = Success | UserError

type UserError {
  message: String!
  field: String
}

type Success {
  success: Boolean!
}

# === Subscriptions ===

type Subscription {
  userCreated: User!
  userUpdated(id: ID!): User!
}
```

## Operation Examples

### Query

```graphql
query GetUsers {
  users(first: 20, filter: { status: ACTIVE }) {
    edges {
      node {
        id
        email
        name
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Mutation

```graphql
mutation CreateUser {
  createUser(input: {
    email: "user@example.com"
    password: "securePass123"
    name: "John Doe"
  }) {
    ... on User {
      id
      email
    }
    ... on UserError {
      message
      field
    }
  }
}
```

### Subscription

```graphql
subscription OnUserCreated {
  userCreated {
    id
    email
  }
}
```

---

[← Index](./README.md)
export default `
type Book {
  id: ID!
  title: String
  author: String
}
input InputBook {
  title: String! @constraint(minLength: 5)
  author: String!
}
type Query {
  books: [Book!]
}
type Mutation {
  addBook(newBook: InputBook!):Book!
}
`;

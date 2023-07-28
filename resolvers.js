import fs from "fs";
import path from "path";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();

const allBooks = () => JSON.parse(fs.readFileSync(path.resolve("db/book.json")).toString());

export default {
    Query: {
        books: allBooks,
    },
    Mutation: {
        addBook: (_, { newBook }) => {
            const allbooks = allBooks();
            const resp = { ...newBook, id: (allbooks.length + 1).toString() };
            allbooks.push(resp);
            fs.writeFileSync("./db/book.json", JSON.stringify(allbooks));
            pubsub.publish("ADD_BOOK", {
                bookAdded: { ...resp },
            });
            return resp;
        },
        deleteBook: (_, { id }) => {
            const allbooks = allBooks();
            fs.writeFileSync(
                "./db/book.json",
                JSON.stringify(allbooks.filter((item) => item.id !== id))
            );
            return true;
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('ADD_BOOK')
        }
    },
};

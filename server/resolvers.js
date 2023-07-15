import fs from "fs";

const allBooks = () => JSON.parse(fs.readFileSync("./db/book.json").toString());

export default {
    Query: {
        books: allBooks,
    },
    Mutation: {
        addBook: (_, { newBook }) => {
            const allbooks = allBooks();
            allbooks.push(newBook);
            fs.writeFileSync("./db/book.json", JSON.stringify(allbooks));
            return newBook;
        },
    },
};

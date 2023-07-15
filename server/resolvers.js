import fs from "fs";

const allBooks = () => JSON.parse(fs.readFileSync("./db/book.json").toString());

export default {
    Query: {
        books: allBooks,
    },
    Mutation: {
        addBook: (_, { newBook }) => {
            console.log(newBook, "newbook");
            const allbooks = allBooks();
            const resp = { ...newBook, id: (allbooks.length + 1).toString() };
            allbooks.push(resp);
            fs.writeFileSync("./db/book.json", JSON.stringify(allbooks));
            return resp;
        },
    },
};

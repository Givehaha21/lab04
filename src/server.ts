import express from 'express'
import type { Request, Response } from 'express'
import { addBook, getAllBooks, getBookByGroup, getBookById } from './services/BookService'

const app = express()
const port = 3000
app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
// app.get('/test', (req: Request, res: Response) => {
//     const id = req.query.id;
//     const output = `id: ${id}`;
//     res.send(output);
// })


// app.get('/test', (req, res) => {
//     let returnObj = {
//         name: 'test',
//         age: 20,
//         address: 'Thai'
//     }
//     res.send(returnObj);
// })
app.get("/books/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const books = await getBookById(id);
    if (books) {
        res.json(books);
    } else {
        res.status(404).send("books not found");
    }
});

app.get("/books", async (req, res) => {
    if (req.query.group) {
        const group = req.query.group as string;
        const filteredbookss = await getBookByGroup(group);
        res.json(filteredbookss);
    } else {
        res.json(await getAllBooks());
    }
});

app.post("/books", async (req, res) => {
    const newbooks = req.body;
    res.json(await addBook(newbooks));
});







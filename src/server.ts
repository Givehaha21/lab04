import express, {Request, Response} from 'express'
import { getAllEvents, getEventByCategory, getEventById, addEvent } from "./services/EventService";
import type Event from "./models/Event";

const app = express()
const port = 3000
app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
app.get('/test', (req: Request, res: Response) => {
    const id = req.query.id;
    const output = `id: ${id}`;
    res.send(output);
})


app.get('/test', (req, res) => {
    let returnObj = {
        name: 'test',
        age: 20,
        address: 'Thai'
    }
    res.send(returnObj);
})
app.get("/events/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const event = await getEventById(id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).send("Event not found");
    }
});

app.get("/events", async (req, res) => {
    if (req.query.category) {
        const category = req.query.category as string;
        const filteredEvents = await getEventByCategory(category);
        res.json(filteredEvents);
    } else {
        res.json(await getAllEvents());
    }
});

app.post("/events", async (req, res) => {
    const newEvent: Event = req.body;

    res.json(await addEvent(newEvent));
});







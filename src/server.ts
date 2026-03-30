import express from 'express'
import type { Request, Response } from 'express'
import bookRoute from './routes/BookRoute'
import authorRoute from './routes/AuthorRoute'
import memberRoute from './routes/MemberRoute'
import borrowRecordRoute from './routes/BorrowRecordRoute'

const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Library API')
})

app.use('/books', bookRoute)
app.use('/authors', authorRoute)
app.use('/members', memberRoute)
app.use('/borrow-records', borrowRecordRoute)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})







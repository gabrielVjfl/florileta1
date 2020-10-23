const port = 7777

import express from 'express'

import cors from 'cors'

import route from './routes/route'

const app = express()

app.use(cors())

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use('/api', route)


app.listen(port, () => {
    console.log('listening on port', port)
})
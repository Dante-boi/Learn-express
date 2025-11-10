import express from 'express'

const app = express()

//Middleware för att hantera JSON
app.use(express.json())

//Enkel route för att testa servern
app.get('/', (req, res) => {
    res.json({ message: 'Välkommen till vår API!' })
})

export default app
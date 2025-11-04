import express from 'express'

const app = express()

//Middleware för att hantera JSON
app.use(express.json())

//Enkel route för att testa servern
app.get('/', (req, res) => {
    res.json({ message: 'Välkommen till vår API!' })
})

export default app
//Simulerad databas
let users = [
    { id: 1, name: 'Anna', email: 'anna@example.com' },
    { id: 2, name: 'Erik', email: 'erik@example.com' },
    { id: 3, name: 'Maria', email: 'maria@example.com' }
]

//GET alla användare
app.get('/users', (req, res) => {
    res.json(users)
})

//GET en specifik användare med id
app.get('/users/:id', (req, res) => {
    const id = parseInt (req.params.id)
    const user = users.find(u => u.id === id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ error: 'Användare hittades inte' })
    }
})

//GET med query parameters
app.get('/search', (req, res) => {
    const { name } = req.query

    if (!name)  {
        return res.status(400).json({ error: 'Name parameter krävs' })
    }

    res.json(filteredUsers)
})